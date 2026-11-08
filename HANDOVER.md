# Handover de Produção - Quiz Palavra da Verdade

**Versão da Documentação:** 1.0  
**Data:** Novembro de 2026  
**Repositório / Aplicação:** Quiz Palavra da Verdade (Desafio Bíblico da Palavra de Deus)  
**Ambiente de Execução:** Web (Vite + React 19 + TypeScript + Tailwind CSS v4) / Mobile PWA (iOS & Android)  
**Banco de Dados & Autenticação:** Google Cloud Firestore & Firebase Auth

---

## 1. Visão Geral do Projeto

O **Quiz Palavra da Verdade** é um aplicativo mobile e web gamificado focado no ensino, memorização e estudo das Sagradas Escrituras. A dinâmica combina uma escala progressiva de 10 perguntas até **1 Milhão de Bênçãos** com um acervo de estudos bíblicos 100% offline, ranking global em tempo real, sistema de conquistas e autenticação flexível (e-mail/senha, Google e convidado).

### Objetivos Principais:
- Estimular o hábito diário de leitura e meditação na Palavra de Deus.
- Atender a todas as idades com 4 faixas etárias e níveis de dificuldade bem delineados.
- Garantir partidas dinâmicas e sem perguntas repetidas através de rotação inteligente.
- Oferecer suporte offline para consulta bíblica completa em qualquer lugar.

---

## 2. Arquitetura Técnica & Stack

- **Framework Web/Mobile:** React 19 com TypeScript.
- **Bundler & Dev Server:** Vite 8 (porta 3000).
- **Estilização:** Tailwind CSS v4 (`@import "tailwindcss";` no `index.css`).
- **Motor de Áudio:** Sintetizador autônomo baseado na **Web Audio API** (`src/utils/soundEffects.ts`), sem dependência de assets de áudio externos que poderiam falhar no mobile.
- **Efeitos Visuais:** Animações CSS nativas e chuva de partículas com `canvas-confetti`.
- **Nuvem & Persistência:**
  - **Firebase Firestore:** Armazenamento em tempo real de perfis e pontuações do ranking mundial.
  - **Firebase Auth:** Login com E-mail/Senha, Popup Google e modo Convidado local.
  - **LocalStorage / Cache:** Suporte offline transparente para histórico de partidas, anotações de estudo e controle de perguntas vistas.
- **PWA (Progressive Web App):** Manifesto configurado em `public/manifest.json` com ícones vetoriais SVG e metatags para instalação em Android e iOS.

---

## 3. Estrutura de Arquivos do Projeto

```text
/
├── firebase-applet-config.json    # Credenciais geradas do Firebase na nuvem
├── firebase-blueprint.json        # Schema e entidades intermediárias do Firestore
├── firestore.rules                # Regras de segurança implantadas no Firestore
├── security_spec.md               # Especificação de testes e matriz de segurança
├── index.html                     # Entrypoint com metatags PWA e tipografia
├── metadata.json                  # Metadados e capacidades do applet
├── package.json                   # Dependências e scripts de execução
├── tsconfig.json                  # Configurações do compilador TypeScript
├── vite.config.ts                 # Configuração do Vite e plugins
├── public/
│   ├── icon.svg                   # Ícone sagrado vetorial (cruz dourada + bíblia)
│   └── manifest.json              # Manifesto PWA para instalação no celular
└── src/
    ├── App.tsx                    # Componente principal, arena do quiz e navegação
    ├── firebase.ts                # Inicialização, helpers de auth, CRUD e error handling
    ├── index.css                  # Tailwind CSS e animações personalizadas (fadeIn, pulseGold)
    ├── main.tsx                   # Ponto de entrada React 19
    ├── types/
    │   └── index.ts               # Interfaces TypeScript (Question, UserProfile, ScoreEntry, etc.)
    ├── components/
    │   ├── AuthModal.tsx          # Modal de cadastro (e-mail/senha, Google e convidado)
    │   ├── BibleStudyView.tsx     # Biblioteca offline dos 66 livros, glossário e caderno
    │   ├── LeaderboardView.tsx    # Mural de honra, ranking global e exclusão de histórico
    │   └── LifelineModals.tsx     # Modais das ajudas (Cartas, Estudiosos, Placas e Explicação)
    ├── data/
    │   ├── achievements.ts        # Regras de desbloqueio de troféus e títulos espirituais
    │   ├── bibleQuestions.ts      # Banco de perguntas categorizado e lógica anti-repetição
    │   └── offlineBibleStudy.ts   # 66 livros da Bíblia, glossário teológico e devocionais
    └── utils/
        └── soundEffects.ts        # Síntese sonora de estúdio via Web Audio API
```

---

## 4. Banco de Dados & Segurança (Firebase Firestore)

### Entidades do Schema (`firebase-blueprint.json`):

#### 1. Coleção `/users/{userId}`:
- **`id`** (`string`): UID do usuário autenticado no Firebase Auth.
- **`displayName`** (`string`, 2 a 50 chars): Nome ou apelido do discípulo.
- **`email`** (`string`, opcional): E-mail do usuário.
- **`ageGroup`** (`enum`: `'kids' | 'teens' | 'adults' | 'masters'`): Categoria preferida.
- **`avatarId`** (`string`): Ícone de avatar bíblico escolhido (🕊️, 👑, 🛡️, 📖, etc.).
- **`totalScore`** (`number`): Pontuação cumulativa de todas as partidas.
- **`gamesPlayed`** (`number`): Total de partidas jogadas.
- **`millionWins`** (`number`): Número de vezes em que alcançou o prêmio máximo.
- **`highestScore`** (`number`): Maior pontuação em uma única partida.
- **`level`** (`string`): Título espiritual atribuído (ex: *Buscador da Verdade*, *Mestre das Escrituras*).
- **`unlockedAchievements`** (`list` de `string`): IDs dos troféus conquistados.
- **`createdAt` / `updatedAt`** (`string`): Timestamps ISO.

#### 2. Coleção `/scores/{scoreId}`:
- **`userId`** (`string`): UID do jogador.
- **`displayName`** (`string`): Nome no momento da partida.
- **`avatarId`** (`string`): Avatar do jogador.
- **`score`** (`number`): Pontos conquistados na partida.
- **`category`** (`string`): Faixa etária jogada.
- **`questionsAnswered`** (`number`): Número de acertos na partida.
- **`wonMillion`** (`boolean`): Se conquistou o milhão de bênçãos.
- **`createdAt`** (`string`): Data e hora do envio.

### Regras de Segurança (`firestore.rules`):
- **Isolamento de Leitura de Usuários:** `allow list: if false;` na coleção `/users` para evitar raspagem de dados pessoais (PII). Leitura restrita ao próprio dono: `allow get: if isOwner(userId)`.
- **Ranking Global Transparente:** `allow read: if isSignedIn();` na coleção `/scores`.
- **Exclusão Segura:** `allow delete: if isSignedIn() && existing().userId == request.auth.uid;` permitindo que o usuário remova suas próprias pontuações do ranking.

---

## 5. Mecânica de Jogo & Regras de Negócio

### A Escala de Bênçãos (10 Níveis):
| Nível | Acertar (Bênçãos) | Parar (Garantido) | Errar (Penalidade) |
| :---: | :---: | :---: | :---: |
| **1** | 1.000 | 0 | 0 |
| **2** | 2.000 | 1.000 | 500 |
| **3** | 5.000 | 2.000 | 1.000 |
| **4** | 10.000 | 5.000 | 2.500 |
| **5** | 20.000 | 10.000 | 5.000 |
| **6** | 50.000 | 20.000 | 10.000 |
| **7** | 100.000 | 50.000 | 25.000 |
| **8** | 200.000 | 100.000 | 50.000 |
| **9** | 500.000 | 200.000 | 100.000 |
| **10**| **1.000.000** | 500.000 | 0 |

### Ajudas Disponíveis por Partida:
1. **Cartas do Mestre (1x por partida):** Sorteio de 4 cartas com eliminação de 0, 1, 2 ou 3 alternativas incorretas.
2. **Estudiosos da Bíblia (1x por partida):** Exibe gráfico estatístico com percentuais de votos de uma banca teológica.
3. **Placas dos Anciãos (1x por partida):** Três anciãos conselheiros levantam suas placas com suas opções recomendadas.
4. **Pulos (até 3x por partida):** Troca a pergunta atual por outra do mesmo nível sem custo.
5. **Parar:** O jogador desiste a qualquer momento e garante a pontuação do nível anterior.

---

## 6. Sistema Anti-Repetição de Perguntas

Localizado em `src/data/bibleQuestions.ts`:
- Cada pergunta possui um identificador único (ex: `k1_a`, `t5_b`, `m10_a`).
- As perguntas já respondidas em partidas anteriores são salvas no `localStorage` sob a chave `quiz_seen_questions_v2_${category}`.
- Ao gerar uma nova partida via `getQuestionsForMatch(category)`:
  1. Filtra as perguntas de cada nível excluindo as já vistas.
  2. Sorteia aleatoriamente entre as inéditas.
  3. Caso todas as perguntas de um nível tenham sido vistas, o sistema reinicia o ciclo desse nível automaticamente.
- No menu inicial há o botão manual **"Reiniciar Ciclo de Perguntas"**, que permite limpar a lista de vistas e recomeçar a rotação completa.

---

## 7. Biblioteca de Estudos Bíblicos (Offline)

Localizado em `src/data/offlineBibleStudy.ts`:
1. **Panorama dos 66 Livros da Bíblia:**
   - 39 livros do Antigo Testamento (Pentateuco, Históricos, Poéticos, Profetas Maiores e Menores).
   - 27 livros do Novo Testamento (Evangelhos, História, Epístolas e Profecia).
   - Metadados completos: total de capítulos, autor tradicional, tema central, versículo-chave e síntese explicativa.
   - Navegação por filtros rápidos de testamento, seções canônicas e campo de busca.
2. **Dicionário Teológico:** Termos explicados com etimologia hebraica, grega e aramaica (*Shekinah*, *Graça*, *Propiciação*, *Maranata*, *Maná*, etc.).
3. **Temas & Orações:** Guias devocionais para ansiedade, fé, coragem e sabedoria.
4. **Versículo do Dia:** Reflexão diária dinâmica com botão de cópia e compartilhamento.
5. **Caderno de Anotações:** Persistência local no dispositivo para versículos favoritos e anotações devocionais.

---

## 8. Motor de Efeitos Sonoros (Web Audio API)

Localizado em `src/utils/soundEffects.ts`:
- **`playClick()`:** Toque suave de kalimba/madeira nobre (frequências 587Hz -> 880Hz).
- **`playTick()`:** Percussão suave de estúdio com decaimento exponencial rápido.
- **`playLockIn()`:** Swell de sub-graves cinematográfico (110Hz -> 82Hz) + acorde metálico em tríade.
- **`playCorrect()`:** Fanfarra triunfal com harmônicos ricos (G4, C5, E5, G5, C6) e sinos dourados.
- **`playWrong()`:** Acorde melódico sutil em tom menor descendente com ressonância aveludada.
- **`playLifeline()`:** Cascata de harpa celestial em escala pentatônica.
- **`playMillionWin()`:** Progressão orquestral completa em 5 acordes culminando no C Maior agudo triunfal.
- **Botão com Equalizador:** No topo da tela, com barras animadas em verde esmeralda e som de demonstração ao desmutar.

---

## 9. Comandos de Manutenção & Desenvolvimento

```bash
# Instalação de dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Verificação de tipos TypeScript e integridade
npm run lint

# Build de produção (gera a pasta /dist)
npm run build
```

---

## 10. Checklist de Próximos Passos Sugeridos

1. **Notificações Diárias (Web Push / Mobile):**
   - Agendar lembrete diário para o *"Versículo do Dia"* e desafio diário de perguntas bíblicas.
2. **Modo Duelo Bíblico (Multiplayer em Tempo Real):**
   - Utilizar Firestore Listeners (`onSnapshot`) para partidas síncronas entre dois discípulos ou gincanas de jovens na igreja.
3. **Exportação de Estudos e Caderno:**
   - Adicionar botão de exportar notas do caderno em formato PDF ou texto formatado para compartilhamento no WhatsApp.
4. **Leitura em Áudio / Acessibilidade (TTS):**
   - Implementar leitor de voz nas perguntas para crianças que ainda estão em fase de alfabetização.
5. **Publicação em Lojas de Aplicativos:**
   - Empacotamento via PWABuilder ou Capacitor para disponibilização direta na Google Play Store e Apple App Store.

---
*Documento preparado para assegurar total continuidade de desenvolvimento, manutenção e evolução do aplicativo Quiz Palavra da Verdade.*
