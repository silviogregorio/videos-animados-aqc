import os
import wave
import struct
import numpy as np

SAMPLE_RATE = 48000
BPM = 108
BEAT_DUR = 60.0 / BPM  # ~0.555 s
TOTAL_DUR = 76.0       # 76 segundos
TOTAL_SAMPLES = int(SAMPLE_RATE * TOTAL_DUR)

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "audio_369")
os.makedirs(out_dir, exist_ok=True)
out_wav = os.path.join(out_dir, "eye_of_the_tiger_soft.wav")

print("🎹 Sintetizando versão suave ambiente de 'Eye of the Tiger'...")

# Frequências fundamentais das notas
NOTE_FREQ = {
    "C2": 65.41, "Eb2": 77.78, "F2": 87.31, "G2": 98.00, "Ab2": 103.83, "Bb2": 116.54,
    "C3": 130.81, "Eb3": 155.56, "F3": 174.61, "G3": 196.00, "Ab3": 207.65, "Bb3": 233.08,
    "C4": 261.63, "D4": 293.66, "Eb4": 311.13, "F4": 349.23, "G4": 392.00, "Ab4": 415.30, "Bb4": 466.16,
    "C5": 523.25, "D5": 587.33, "Eb5": 622.25, "G5": 783.99
}

def synth_piano_chord(notes, duration, velocity=0.4):
    num_samples = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    sig = np.zeros(num_samples)
    
    # Envelope ADSR suave (ataque macio de 25ms, decaimento longo)
    att = int(SAMPLE_RATE * 0.025)
    env = np.ones(num_samples)
    if num_samples > att:
        env[:att] = np.linspace(0, 1, att)
        env[att:] = np.exp(-3.0 * (t[att:] - t[att]))
    else:
        env = np.linspace(0, 1, num_samples)

    for note in notes:
        freq = NOTE_FREQ.get(note, 261.63)
        # Harmônicos ricos mas quentes (passa-baixa natural)
        h1 = np.sin(2 * np.pi * freq * t)
        h2 = 0.45 * np.sin(2 * np.pi * (freq * 2) * t)
        h3 = 0.18 * np.sin(2 * np.pi * (freq * 3) * t)
        h4 = 0.06 * np.sin(2 * np.pi * (freq * 4) * t)
        sig += (h1 + h2 + h3 + h4) * (velocity / len(notes))

    return sig * env

def synth_pad_chord(notes, duration, volume=0.25):
    num_samples = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    sig = np.zeros(num_samples)
    
    # Envelope de Pad super suave (fade-in 0.4s, fade-out 0.4s)
    fade_len = min(int(SAMPLE_RATE * 0.35), num_samples // 2)
    env = np.ones(num_samples)
    if fade_len > 0:
        env[:fade_len] = np.linspace(0, 1, fade_len)
        env[-fade_len:] = np.linspace(1, 0, fade_len)

    for note in notes:
        freq = NOTE_FREQ.get(note, 261.63)
        # Detune para efeito chorus / pad flutuante
        p1 = np.sin(2 * np.pi * (freq * 0.998) * t)
        p2 = np.sin(2 * np.pi * (freq * 1.002) * t)
        sig += (p1 + p2) * 0.5 * (volume / len(notes))

    return sig * env

def synth_soft_pulse(duration, volume=0.15):
    num_samples = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    # Pulso acústico sutil no grave
    env = np.exp(-18.0 * t)
    pulse = np.sin(2 * np.pi * 55.0 * t) * env * volume
    return pulse

# Buffer master
left = np.zeros(TOTAL_SAMPLES)
right = np.zeros(TOTAL_SAMPLES)

# Padrão rítmico do riff Eye of the Tiger (em semicolcheias / colcheias)
# Compasso de 4 tempos (4 * BEAT_DUR)
# O riff clássico:
# Bar 1: C (batida 1) ... C C (batida 3.5 e 4)
# Bar 2: Bb C (batida 1) ... C C (batida 3.5 e 4)
# Bar 3: Bb C (batida 1) ... C C (batida 3.5 e 4)
# Bar 4: Bb Ab Bb (resolução)

chords = {
    "Cm": ["C3", "Eb3", "G3", "C4", "Eb4"],
    "Bb": ["Bb2", "D3", "F3", "Bb3", "D4"],
    "Ab": ["Ab2", "C3", "Eb3", "Ab3", "C4"],
    "Cm_bass": ["C2", "G2"],
    "Bb_bass": ["Bb2", "F2"],
    "Ab_bass": ["Ab2", "Eb2"],
}

bar_dur = BEAT_DUR * 4
current_time = 0.0

while current_time < TOTAL_DUR - 2.0:
    # 4 Compassos do tema icônico
    # Compasso 1:
    bar_start = int(current_time * SAMPLE_RATE)
    # Acorde Pad de sustentação
    pad = synth_pad_chord(chords["Cm"], bar_dur * 2, volume=0.22)
    end_s = min(TOTAL_SAMPLES, bar_start + len(pad))
    left[bar_start:end_s] += pad[:end_s - bar_start] * 0.95
    right[bar_start:end_s] += pad[:end_s - bar_start] * 1.05

    # Riff rítmico suave de piano (batidas pontuais clássicas)
    # 1. Batida Forte no tempo 1
    hit1 = synth_piano_chord(chords["Cm"], BEAT_DUR * 1.5, velocity=0.38)
    h_end = min(TOTAL_SAMPLES, bar_start + len(hit1))
    left[bar_start:h_end] += hit1[:h_end - bar_start]
    right[bar_start:h_end] += hit1[:h_end - bar_start]

    # Batidas de suspense (tempo 3.5 e 4)
    t_h2 = bar_start + int(BEAT_DUR * 2.5 * SAMPLE_RATE)
    hit2 = synth_piano_chord(chords["Cm"], BEAT_DUR * 0.45, velocity=0.32)
    if t_h2 + len(hit2) < TOTAL_SAMPLES:
        left[t_h2:t_h2 + len(hit2)] += hit2
        right[t_h2:t_h2 + len(hit2)] += hit2

    t_h3 = bar_start + int(BEAT_DUR * 3.0 * SAMPLE_RATE)
    hit3 = synth_piano_chord(chords["Bb"], BEAT_DUR * 0.45, velocity=0.32)
    if t_h3 + len(hit3) < TOTAL_SAMPLES:
        left[t_h3:t_h3 + len(hit3)] += hit3
        right[t_h3:t_h3 + len(hit3)] += hit3

    t_h4 = bar_start + int(BEAT_DUR * 3.5 * SAMPLE_RATE)
    hit4 = synth_piano_chord(chords["Cm"], BEAT_DUR * 1.2, velocity=0.36)
    if t_h4 + len(hit4) < TOTAL_SAMPLES:
        left[t_h4:t_h4 + len(hit4)] += hit4
        right[t_h4:t_h4 + len(hit4)] += hit4

    # Compasso seguinte com resolução Ab -> Bb
    t_bar2 = bar_start + int(bar_dur * SAMPLE_RATE)
    if t_bar2 < TOTAL_SAMPLES:
        t_ab = t_bar2 + int(BEAT_DUR * 2.0 * SAMPLE_RATE)
        hit_ab = synth_piano_chord(chords["Ab"], BEAT_DUR * 0.8, velocity=0.34)
        if t_ab + len(hit_ab) < TOTAL_SAMPLES:
            left[t_ab:t_ab + len(hit_ab)] += hit_ab
            right[t_ab:t_ab + len(hit_ab)] += hit_ab

        t_bb = t_bar2 + int(BEAT_DUR * 3.0 * SAMPLE_RATE)
        hit_bb = synth_piano_chord(chords["Bb"], BEAT_DUR * 1.0, velocity=0.35)
        if t_bb + len(hit_bb) < TOTAL_SAMPLES:
            left[t_bb:t_bb + len(hit_bb)] += hit_bb
            right[t_bb:t_bb + len(hit_bb)] += hit_bb

    current_time += bar_dur * 2

# Fade out nos últimos 4 segundos
fade_out_samples = int(4.0 * SAMPLE_RATE)
fade = np.linspace(1.0, 0.0, fade_out_samples)
left[-fade_out_samples:] *= fade
right[-fade_out_samples:] *= fade

# Normalização de volume suave para fundo (-22 dB RMS para ficar bem suave como pedido)
max_val = max(np.max(np.abs(left)), np.max(np.abs(right)), 1e-4)
left = (left / max_val) * 0.42
right = (right / max_val) * 0.42

# Salvar WAV 16-bit estéreo 48kHz
with wave.open(out_wav, "w") as wav_file:
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    
    interleaved = np.empty((TOTAL_SAMPLES * 2,), dtype=np.int16)
    interleaved[0::2] = np.clip(left * 32767, -32767, 32767).astype(np.int16)
    interleaved[1::2] = np.clip(right * 32767, -32767, 32767).astype(np.int16)
    wav_file.writeframes(interleaved.tobytes())

print(f"✓ Trilha 'Eye of the Tiger' suave gerada com sucesso em {out_wav}!")

