import asyncio
import json
import os
import subprocess
import edge_tts

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_AUDIO = os.path.join(ROOT, "public", "audio_369", "vo")
os.makedirs(OUT_AUDIO, exist_ok=True)

with open(os.path.join(ROOT, "scripts", "narration_369app.json"), "r", encoding="utf-8") as f:
    lines = json.load(f)

VOICE = "pt-BR-AntonioNeural"

async def gen_vo():
    timings = {}
    for key, text in lines.items():
        mp3_path = os.path.join(OUT_AUDIO, f"{key}.mp3")
        wav_path = os.path.join(OUT_AUDIO, f"{key}.wav")
        print(f"Gerando voz para {key}...")
        
        communicate = edge_tts.Communicate(text, VOICE, rate="+12%")
        await communicate.save(mp3_path)

        # Normalizar para WAV a -17.0 dB RMS e aparar silêncio
        subprocess.run(
            ["ffmpeg", "-y", "-i", mp3_path, "-af", "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,loudnorm=I=-17:TP=-1.5:LRA=9", "-ar", "48000", "-ac", "1", wav_path],
            capture_output=True, check=True
        )

        probe_wav = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", wav_path],
            capture_output=True, text=True, check=True
        )
        duration_wav = float(probe_wav.stdout.strip())

        # Gerar words com base na duração e caracteres
        raw_words = text.split()
        total_chars = sum(len(w) for w in raw_words)
        cur_t = 0.05
        words = []
        for w in raw_words:
            w_dur = max(0.12, (len(w) / total_chars) * (duration_wav - 0.2))
            words.append({
                "text": w,
                "start": round(cur_t, 3),
                "end": round(cur_t + w_dur, 3)
            })
            cur_t += w_dur

        timings[key] = {
            "text": text,
            "seconds": duration_wav,
            "words": words
        }
        print(f"  ✓ {key}: {duration_wav:.2f}s ({len(words)} palavras)")

    total = sum(v["seconds"] for v in timings.values())
    print(f"\nDuração total de falas: {total:.2f}s")
    out_vo_json = os.path.join(ROOT, "src", "data", "vo_369.json")
    with open(out_vo_json, "w", encoding="utf-8") as f:
        json.dump(timings, f, indent=2, ensure_ascii=False)
    print(f"🎉 Sucesso! Gravado em {out_vo_json}")

asyncio.run(gen_vo())
