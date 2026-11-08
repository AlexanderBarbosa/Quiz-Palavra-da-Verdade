# 📖 Quiz Palavra da Verdade

> **Desafio Bíblico da Palavra de Deus — Conhecimento, Discipulado e Fé para Toda a Família**

O **Quiz Palavra da Verdade** é uma aplicação web e mobile (PWA) interativa, gamificada e responsiva, desenvolvida para promover o estudo aprofundado e a memorização das Sagradas Escrituras através de uma experiência envolvente, inspiradora e saudável.

---

## 🌟 Descrição do Projeto

Inspirado na clássica dinâmica de perguntas progressivas com níveis de premiação, o quiz guia o participante por uma jornada de **10 níveis de conhecimento** até alcançar o prêmio máximo simbólico de **1 Milhão de Bênçãos**. 

O projeto vai muito além de um jogo de perguntas e respostas: cada questão é acompanhada de uma **explicação teológica enriquecida**, referências exatas de livro, capítulo e versículo, e curiosidades históricas para fundamentar a fé e estimular a leitura direta da Bíblia.

Além disso, o aplicativo conta com uma **Biblioteca Bíblica 100% Offline** contendo o panorama completo de todos os 66 livros da Bíblia, dicionário de termos originais (hebraico, grego e aramaico), estudos temáticos e caderno pessoal de anotações.

---

## 🎯 Aplicações Práticas do Projeto

O **Quiz Palavra da Verdade** foi projetado para múltiplos contextos práticos de uso ministerial, educativo e familiar:

### 1. Culto Doméstico e Momentos em Família
- **União e Comunhão:** Pais e filhos podem jogar juntos, escolhendo entre as categorias Infantil, Jovem ou Adulto.
- **Aprendizado Intergeracional:** Estimula o diálogo sobre temas bíblicos após cada resposta com a leitura das referências bíblicas.

### 2. Escola Bíblica Dominical (EBD) e Ministério Infantil
- **Fixação Lúdica:** Professores podem utilizar o modo *Pequenos Discípulos* como ferramenta pedagógica para fixar histórias de grandes personagens (Noé, Davi, Daniel, Jesus).
- **Gamificação na Sala de Aula:** Dinâmica visual atraente com ajudas interativas (*Cartas do Mestre*, *Placas dos Anciãos* e *Estudiosos*).

### 3. Grupos de Jovens, Células e Retiros
- **Gincanas Bíblicas:** Ideal para dinâmicas em encontros de jovens, células, congressos e acampamentos.
- **Competição Saudável:** O sistema de ranking global e conquistas desbloqueáveis motiva os jovens a se dedicarem ao estudo das Escrituras.

### 4. Estudo Pessoal e Devoção Diária
- **Suporte 100% Offline:** Permite meditar e estudar em locais sem conexão de internet (viagens, retiros rurais, transporte público).
- **Versículo do Dia & Caderno de Estudos:** Mensagem diária com reflexão prática e espaço para registrar orações e anotações pessoais.

### 5. Seminários, Cursos Teológicos e Liderança
- **Nível Avançado (*Mestres das Escrituras*):** Perguntas aprofundadas com exegese bíblica, significados em hebraico/grego (*Kenosis*, *Logos*, *Shekinah*, *Kapporeth*), profecias cronológicas de Daniel e escatologia.
- **Treinamento e Reciclagem:** Excelente recurso para líderes, diáconos, presbíteros e pastores testarem seus conhecimentos gerais.

### 6. Torneios Bíblicos Regionais e Interdenominacionais
- **Ranking Global em Tempo Real:** Conectado ao Firebase Firestore para organizar competições em tempo real entre congregações, departamentos e cidades.
- **Gestão Segura:** Permite visualizar a classificação geral e oferece opção de exclusão e controle do histórico de pontuações.

---

## ⚡ Principais Funcionalidades

### 🎮 Mecânica da Escala de Bênçãos
- **10 Níveis Progressivos:** De 1.000 até 1.000.000 de Bênçãos.
- **Decisão Estratégica em Cada Pergunta:**
  - **Acertar:** Avança na escala e acumula bênçãos.
  - **Parar:** O jogador desiste no momento oportuno e garante a pontuação acumulada segura.
  - **Errar:** Encerra a partida com pontuação de consolo.

### 🃏 Ajudas Bíblicas Clássicas
- **Cartas do Mestre:** Escolha uma de 4 cartas misteriosas para eliminar de 1 a 3 opções incorretas.
- **Estudiosos da Bíblia:** Gráfico estatístico com percentual de votos da comunidade teológica.
- **Placas dos Anciãos:** Três líderes experientes erguem suas placas recomendando as respostas.
- **Pular Pergunta:** Troca a pergunta atual por outra do mesmo nível (até 3 pulos por partida).

### 🔄 Algoritmo Inteligente Anti-Repetição
- Rastreia as perguntas já vistas pelo usuário no dispositivo (`localStorage`).
- Garante perguntas inéditas a cada nova partida, renovando o ciclo apenas após o esgotamento do banco.
- Botão manual de **"Reiniciar Ciclo de Perguntas"** disponível no menu inicial.

### 📚 Biblioteca Bíblica 100% Offline
- **Panorama Completo dos 66 Livros:** 39 do Antigo Testamento e 27 do Novo Testamento com autor, número de capítulos, tema principal, versículo-chave e síntese explicativa.
- **Filtros Canônicos:** Pentateuco, Históricos, Poéticos, Profetas Maiores, Profetas Menores, Evangelhos, História da Igreja, Epístolas e Profecia.
- **Dicionário Teológico:** Termos explicados com etimologia hebraica, grega e aramaica (*Graça*, *Justificação*, *Redenção*, *Maranata*, *Propiciação*, *Maná*).
- **Temas & Orações:** Guias devocionais para ansiedade, fé, coragem e sabedoria na vida diária.
- **Caderno de Anotações:** Salva versículos favoritos e anotações pessoais diretamente no dispositivo.

### 🎵 Efeitos Sonoros Autônomos (Web Audio API)
- Síntese acústica em tempo real, sem dependência de arquivos MP3 externos.
- Sons de toque em madeira (kalimba), tique-taque suave de estúdio, suspense cinematográfico de sub-graves, fanfarra triunfal com sinos dourados e sinfonia celestial para o prêmio máximo.
- Botão de controle de áudio com equalizador animado e demonstração sonora ao desmutar.

### 🏆 Gamificação, Ranking & Conquistas
- 9 Troféus desbloqueáveis (*Primeiro Passo na Fé*, *Davi contra Golias*, *Sabedoria de Salomão*, *Milionário da Palavra*, etc.).
- Sistema de **Títulos Espirituais** (*Buscador da Verdade* até *Apóstolo da Fé*) baseado na pontuação acumulada.
- Ranking mundial em tempo real sincronizado no Firebase Firestore com filtros por categoria e botão para **Excluir Ranking**.

### 📱 Instalação Mobile PWA (Android e iOS)
- Pronto para instalar diretamente no smartphone sem necessidade obrigatória de loja de aplicativos.
- Ícone vetorial em alta resolução (`/icon.svg`) e manifesto PWA (`/manifest.json`).

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React 19** | Interface de usuário moderna com componentes funcionais e hooks |
| **TypeScript** | Tipagem estática rigorosa para segurança e manutenção |
| **Vite 8** | Servidor de desenvolvimento rápido e bundler otimizado |
| **Tailwind CSS v4** | Estilização ágil com design responsivo mobile-first |
| **Google Cloud Firestore** | Banco de dados NoSQL em nuvem para pontuações e perfis |
| **Firebase Authentication** | Autenticação com E-mail/Senha, Google Popup e Convidado |
| **Web Audio API** | Sintetizador de áudio de estúdio para trilhas e efeitos |
| **Canvas Confetti** | Efeito visual comemorativo na conquista de 1 Milhão |
| **Lucide React** | Conjunto completo de ícones modernos e leves |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **NPM** ou gerenciador de pacotes equivalente

### Passo a Passo

1. **Clonar o Repositório ou abrir a pasta do projeto:**
   ```bash
   cd /app/applet
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará acessível em `http://localhost:3000`.

4. **Verificar tipos e erros de lint:**
   ```bash
   npm run lint
   ```

5. **Gerar build de produção:**
   ```bash
   npm run build
   ```

---

## 🔒 Segurança e Regras de Dados

O projeto segue as diretrizes do **Zero-Trust Security**:
- Regras de segurança rigorosas configuradas em `firestore.rules`.
- Validação estrutural de todos os documentos (`isValidUser` e `isValidScore`).
- Isolamento total de dados pessoais (PII) contra raspagens não autorizadas.
- Exclusão permitida apenas ao próprio criador do registro (`request.auth.uid == resource.data.userId`).

---

## 📄 Licença e Dedicação

Este projeto foi construído para a edificação espiritual e o estímulo constante à leitura e estudo das Sagradas Escrituras.

> *"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."*  
> — **Salmos 119:105**
