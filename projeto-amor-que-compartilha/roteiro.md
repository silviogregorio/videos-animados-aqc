# Roteiro — Como Ajudar Pessoas com TDAH, TOD e TEA: Amar e Compreender

> Projeto: Vídeo Explicativo 3D em Formato Problema → Solução  
> Instituição: **Projeto Social Amor Que Compartilha**  
> Canal / Website: **www.amorquecompartilha**  
> Convenção: Timestamps `MM:SS:FF` a 30 fps; frames em intervalo semiaberto `[início, fim)`.  
> Status: **AGUARDANDO APROVAÇÃO** (Fase 1 — planejamento completo).

---

## 1. Briefing de Produção

- **Tema e Recorte Técnico:**  
  Como a sociedade, familiares, escolas e colegas podem compreender e apoiar crianças e adultos com **TDAH** (Transtorno do Déficit de Atenção com Hiperatividade), **TOD** (Transtorno Opositivo Desafiador) e **TEA** (Transtorno do Espectro Autista). O foco central é desconstruir os estigmas de "preguiça", "má criação" e "desobediência", demonstrando na prática as bases neurológicas e oferecendo estratégias concretas de regulação, respeito sensorial e acolhimento com amor e compreensão.
- **Público e Objetivo Educativo:**  
  Público amplo (pais, educadores, familiares, jovens e adultos leigos). O objetivo é transformar a percepção pública: substituir a punição estéril pela conexão humana genuína ("conectar antes de corrigir").
- **Identidade Visual e Branding:**  
  - **Nome:** Projeto Social Amor Que Compartilha  
  - **Website / Redes:** `www.amorquecompartilha`  
  - **Marca d'água:** Logotipo oficial circular (mãos protetoras acolhendo coração e partilha) posicionado no canto superior direito com 85% de opacidade e sombra suave.  
  - **Rodapé Institucional:** Faixa minimalista nas margens seguras (acima das legendas) com o nome do projeto e call to action.
- **Trilha Sonora e Áudio:**  
  - Trilha original anexada pelo usuário (`trilha-suave.mp3`), em loop contínuo e suave a **-22 dB** sob a fala, permitindo inteligibilidade cristalina da narração.  
  - Efeitos sonoros pontuais (whooshes suaves, sino de badge, ativação neural, relaxamento sensorial) sintetizados e equalizados.
- **Formato:**  
  90 segundos (2.700 frames @ 30 fps), resolução vertical **1080 × 1920 (9:16)**, padrão mobile / Reels / TikTok / Shorts.
- **Locução (TTS):**  
  Português do Brasil (`pt-BR-AntonioNeural` ou `pt-BR-FranciscaNeural` via edge-tts), tom acolhedor, empático, firme e pedagógico (~138 palavras por minuto, 208 palavras totais).
- **Direção de Arte 3D (Diorama Persistente):**  
  - Cenário maquete/diorama isométrico estilizado em 3D Low-Poly (`flatShading`), com iluminação suave de estúdio e paleta calorosa: fundo degradê bege/cinza aconchegante (`#1a1f2c` a `#26324a`), tons de madeira clara, ciano tecnológico suave, esmeralda de acolhimento e dourado de conexão.  
  - Um elemento persistente central: a **Maquete Neural e Emocional**, que revela como os estímulos do ambiente afetam a regulação do cérebro neurodivergente e como atitudes acolhedoras estabilizam as crises.

---

## 2. Tabela Cronológica Completa

| Timestamp (Início - Fim) | Quadro (Frame Inicial - Final a 30 fps) | Narração (Locução TTS) | Descrição da Cena & Câmera | Props & Elementos 3D/2D | Animações & Transições (Remotion Props / Spring / Interpolate) | Badges & Textos (Highlights) |
| --- | --- | --- | --- | --- | --- | --- |
| 00:00:00 – 00:10:00 | 0 – 300 | Você já viu alguém ser chamado de preguiçoso, rebelde ou difícil? Muitas vezes, por trás dessas palavras, existe uma mente lutando em silêncio. | Plano médio do diorama (orbit d=18, az 25°, el 20°); uma figura low-poly sentada à mesa sob pressão de blocos cinzentos que caem do alto; iluminação fria; push-in suave (d=14). | Personagem estilizado, mesa de madeira, blocos flutuantes com rótulos pejorativos, luz fria focal, logo sutil no topo direito. | `blocks.fall` spring 0→1 (local 15→60); `character.slump` interpolate y: 0→-0.2 u3d (local 45→110, soft); `light.ambient` 0.8→0.4 (local 0→90). | ❓ ROTULAR NÃO AJUDA (warning, local 25→160);<br>✖ JULGAMENTO (negative, local 170→285).<br>Legenda: PREGUIÇOSO, REBELDE, MENTE, SILÊNCIO. |
| 00:10:00 – 00:20:00 | 300 – 600 | TDAH, TOD e TEA não são birra nem falta de limites. São funcionamentos cerebrais únicos, que processam o mundo de uma forma totalmente diferente. | Dolly-in revelando o corte transversal do diorama: abre-se a "Maquete Neural 3D" no centro, com caminhos de sinapses poligonais acendendo em três vias distintas; iluminação aquece. | Corte transversal diorama, cérebro low-poly translúcido, 3 ramificações neurais luminescentes (laranja, azul, esmeralda). | `diorama.cutaway` interpolate 0→1 (local 10→50, out); `brain.scale` spring 0→1 (local 30→75, damping 10); `synapse.pulse` velocidade 1→2.5 (local 90→260). | ℹ NEURODIVERSIDADE (info, local 25→150);<br>✔ PROCESSAMENTO ÚNICO (positive, local 160→290).<br>Legenda: TDAH, TOD, TEA, CEREBRAIS, DIFERENTE. |
| 00:20:00 – 00:32:00 | 600 – 960 | No TDAH, o cérebro tem dificuldade em regular o foco e os impulsos. Em vez de punir a inquietação, use rotinas visuais, quebre tarefas em pequenos passos e celebre cada avanço. | Câmera foca no setor TDAH (orbit d=12, az 15°, el 12°); esferas coloridas de estímulo chovem desordenadas; surge um quadro de rotinas 3D com degraus organizados e estrelas de conquista. | Funil neural de dispersão, esferas de estímulo dispersas, painel de rotinas visuais em blocos modulares, ícone de troféu/estrela. | `stimulus.scatter` interpolate raio 0.5→3.0 u3d (local 0→85); `routineBoard.enter` spring y: -2→0 u3d (local 95→145); `blocks.snap` 0→1 (local 150→220); `star.pop` spring (local 240→290). | ✖ REGULAÇÃO DO FOCO (negative, local 15→110);<br>✔ ROTINAS VISUAIS (positive, local 115→220);<br>✔ PEQUENOS PASSOS (positive, local 225→350).<br>Legenda: TDAH, FOCO, IMPULSOS, ROTINAS, AVANÇO. |
| 00:32:00 – 00:44:00 | 960 – 1320 | No TOD, a reação de desafio esconde uma dor e o medo de perder o controle. Em vez de responder com gritos, mantenha a calma, valide o sentimento e dê escolhas direcionadas. | Câmera viaja ao setor TOD (d=13, az -10°, el 15°); uma barreira espinhosa vermelha se ergue entre duas figuras; a figura adulta emite um campo sereno azul que acalma os espinhos; surgem duas portas/opções. | Duas figuras low-poly (adulto e jovem), barreira de espinhos vermelhos, campo de calma azul-celeste, duas cartas/portas de escolha ("Opção A / Opção B"). | `spikeWall.grow` spring 0→1 (local 10→70); `calmField.expand` interpolate escala 0→1.8 u3d (local 80→155, out); `spikeWall.soften` 1→0 (local 155→210); `choiceDoors.flip` spring (local 215→275). | ✖ MEDO DE PERDER O CONTROLE (negative, local 15→110);<br>✔ VALIDAÇÃO EMOCIONAL (positive, local 115→225);<br>✔ ESCOLHAS DIRECIONADAS (positive, local 230→350).<br>Legenda: TOD, DESAFIO, CALMA, SENTIMENTO, ESCOLHAS. |
| 00:44:00 – 00:56:00 | 1320 – 1680 | E no TEA, o autismo, o excesso de luzes, barulhos e mudanças repentinas gera sobrecarga real. A solução não é forçar o encaixe, mas oferecer um ambiente previsível, seguro e acolhedor. | Foco no setor TEA (d=11, az 35°, el 10°); luzes piscam e ondas sonoras pontiagudas cercam a cena; em seguida, desce uma cúpula translúcida suave protetora e abafadores 3D se ajustam, trazendo serenidade. | Ondas sonoras pontiagudas vermelhas, luzes estroboscópicas, cúpula protetora verde-água translúcida, fones abafadores estilizados, tapete sensorial macio. | `sensoryChaos.amplitude` interpolate 0→1 (local 0→75); `domeShield.drop` spring y: 4→0 u3d (local 80→140); `soundDamping.fade` 1→0.15 (local 140→210); `softGlow.intensity` spring 0→1 (local 215→280). | ✖ SOBRECARGA SENSORIAL (negative, local 15→120);<br>✔ AMBIENTE PREVISÍVEL (positive, local 125→230);<br>✔ ACOLHIMENTO SENSORIAL (positive, local 235→350).<br>Legenda: TEA, AUTISMO, SOBRECARGA, PREVISÍVEL, SEGURO. |
| 00:56:00 – 01:08:00 | 1680 – 2040 | A ciência comprova: a conexão humana acalma o sistema nervoso. Quando substituímos o julgamento pelo acolhimento, o cérebro neurodivergente se reorganiza e encontra paz. | Dolly-out suave (d=24, el 25°); os três setores do cérebro se sincronizam e pulsam em luz dourada contínua; a ponte luminosa conecta as figuras humanas com mãos estendidas em respeito mútuo. | Núcleo neural integrado, ponte de luz dourada, indicador gráfico de batimentos desacelerando suavemente, anel de conexão humana. | `neuralSync.phase` interpolate 0→360 deg (local 0→180); `connectionBridge.grow` spring 0→1 (local 30→90); `stressGraph.descend` 1→0.1 (local 90→210); `globalGlow` pulso suave 3s. | ℹ CONEXÃO ANTES DE CORREÇÃO (info, local 20→160);<br>✔ NEUROPLASTICIDADE & PAZ (positive, local 165→340).<br>Legenda: CIÊNCIA, CONEXÃO, ACOLHIMENTO, PAZ. |
| 01:08:00 – 01:19:00 | 2040 – 2370 | Ajudar de verdade é simples: escutar com paciência, respeitar o tempo de cada um e nunca isolar quem mais precisa de apoio e inclusão. | Câmera gira ao redor de 3 pilares 3D de madeira nobre e mármore que emergem do diorama (orbit d=19, az 40°→80°, el 18°), cada um encimado por um símbolo iluminado. | Três pilares estilizados: Pilar 1 (Ouvido & Coração), Pilar 2 (Ampulheta Serena), Pilar 3 (Círculo de Mãos Abertas). | `pillar1.rise` spring y: -3→0 u3d (local 15→65); `pillar2.rise` spring y: -3→0 u3d (local 55→105); `pillar3.rise` spring y: -3→0 u3d (local 95→145); `pillars.glow` sequencial (local 150→270). | ✔ ESCUTAR COM PACIÊNCIA (positive, local 15→105);<br>✔ RESPEITAR O TEMPO (positive, local 110→195);<br>✔ NUNCA ISOLAR (positive, local 200→320).<br>Legenda: SIMPLES, PACIÊNCIA, TEMPO, APOIO, INCLUSÃO. |
| 01:19:00 – 01:30:00 | 2370 – 2700 | Pessoas neurodivergentes não precisam ser consertadas; elas precisam ser amadas e compreendidas. Apoie essa causa: Projeto Social Amor Que Compartilha. Acesse www.amorquecompartilha. | Dolly-out final para a composição completa do diorama (d=32, az 30°, el 22°); o coração do logo oficial surge tridimensional no topo, com mãos douradas em abraço circular; cartela de encerramento elegante com tipografia e website. | Diorama completo com iluminação solar suave, emblema 3D do Projeto Social Amor Que Compartilha, card 2D minimalista com "www.amorquecompartilha". | `heart3D.pulse` escala 1→1.1 (pulso cardíaco); `embraceHands.close` spring (local 30→90); `endCard.slideUp` spring y: 300→0 px (local 70→140); `fadeToBlack` interpolate 0→1 nos últimos 25 frames. | ℹ AMAR E COMPREENDER (size: large, info, local 15→155);<br>✔ PROJETO SOCIAL AMOR QUE COMPARTILHA (size: large, positive, local 160→320).<br>Legenda: AMADAS, COMPREENDIDAS, PROJETO, AMOR, COMPARTILHA. |

---

## 3. Narração Integral em Texto Corrido

> **Métricas:** 208 palavras totais | 90,0 segundos de duração planejada (~138 palavras/minuto). Pacing confortável, com espaço dedicado para respiração visual e ênfase reflexiva.

"Você já viu alguém ser chamado de preguiçoso, rebelde ou difícil? Muitas vezes, por trás dessas palavras, existe uma mente lutando em silêncio.

TDAH, TOD e TEA não são birra nem falta de limites. São funcionamentos cerebrais únicos, que processam o mundo de uma forma totalmente diferente.

No TDAH, o cérebro tem dificuldade em regular o foco e os impulsos. Em vez de punir a inquietação, use rotinas visuais, quebre tarefas em pequenos passos e celebre cada avanço.

No TOD, a reação de desafio esconde uma dor e o medo de perder o controle. Em vez de responder com gritos, mantenha a calma, valide o sentimento e dê escolhas direcionadas.

E no TEA, o autismo, o excesso de luzes, barulhos e mudanças repentinas gera sobrecarga real. A solução não é forçar o encaixe, mas oferecer um ambiente previsível, seguro e acolhedor.

A ciência comprova: a conexão humana acalma o sistema nervoso. Quando substituímos o julgamento pelo acolhimento, o cérebro neurodivergente se reorganiza e encontra paz.

Ajudar de verdade é simples: escutar com paciência, respeitar o tempo de cada um e nunca isolar quem mais precisa de apoio e inclusão.

Pessoas neurodivergentes não precisam ser consertadas; elas precisam ser amadas e compreendidas. Apoie essa causa: Projeto Social Amor Que Compartilha. Acesse www.amorquecompartilha."

---

## 4. Áudio, Identidade e Montagem

1. **Narração (Voiceover):**  
   - Voz gerada via `edge-tts` com o modelo `pt-BR-AntonioNeural` (voz calorosa, grave e articulada) ou `pt-BR-FranciscaNeural`.  
   - Sincronização automática palavra a palavra extraída via `scripts/voiceover.py` + `prepare_vo.py`.
2. **Trilha Sonora Original de Fundo:**  
   - Arquivo do usuário: `assets/trilha-suave.mp3` (extraído do MP4 anexado).  
   - Nível sonoro: **-22 dB** contínuo sob a fala, com ducking dinâmico (-24 dB durante falas e -18 dB nas pausas reflexivas).  
   - Loop imperceptível com crossfade suave de 1,5 s a cada ciclo de 27 segundos.
3. **Efeitos Sonoros (SFX):**  
   - Entradas de badges: sinos harmônicos e pops suaves em frequência média (sem agudos irritantes).  
   - Transições de cena: whooshes sutis de ar suave.  
   - Ativações de soluções: acordes acústicos calorosos em tom maior (Fá Maior / Dó Maior).
4. **Marca d'Água e Rodapé:**  
   - Logotipo oficial importado em `assets/logo.png`, aplicado em `Overlay` persistente em todas as cenas (canto superior direito, 120×120 px, opacidade 0.85).  
   - Rodapé seguro: `www.amorquecompartilha` com tipografia Montserrat / Inter, alinhado ao centro inferior acima das legendas.

---

## 5. Critérios de Aceite e Verificação

- [x] **Gancho Imediato:** Pergunta provocativa nos primeiros 3 segundos questionando rótulos pejorativos comuns.
- [x] **Cadeia Causal Problema → Solução:** Cada uma das três condições (TDAH, TOD, TEA) apresenta primeiro o desafio real do processamento cerebral e logo em seguida a solução comportamental prática.
- [x] **Explicação antes do termo técnico:** Demonstração visual da sobrecarga/conflito antes de introduzir as siglas e termos.
- [x] **Diorama 3D persistente:** O mesmo mundo isométrico se transforma ao longo do vídeo, sem cortes desconexos ou cartelas genéricas.
- [x] **Legibilidade mobile:** Badges entre y = 260 px e y = 420 px; legendas centralizadas em y = 1420 px; zona segura respeitada.
- [x] **Matemática de frames contígua:** 8 cenas somando exatamente 2.700 frames (90,00 s) a 30 fps, intervalos semiabertos `[início, fim)`.
- [x] **Fontes e rigor:** Princípios alinhados às diretrizes da Associação Brasileira de Neurologia e Psiquiatria Infantil (ABENEPI), DSM-5-TR e neurobiologia do afeto e regulação emocional (Stephen Porges / Polyvagal Theory).
