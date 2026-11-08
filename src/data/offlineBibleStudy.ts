export interface BibleBookOverview {
  name: string;
  category: 'Pentateuco' | 'Históricos' | 'Poéticos' | 'Profetas Maiores' | 'Profetas Menores' | 'Evangelhos' | 'História da Igreja' | 'Epístolas' | 'Profecia';
  testament: 'Antigo Testamento' | 'Novo Testamento';
  chapters: number;
  author: string;
  theme: string;
  keyVerse: string;
  summary: string;
}

export interface BibleGlossaryTerm {
  term: string;
  pronunciation?: string;
  origin: string; // Hebraico / Grego / Aramaico
  definition: string;
  keyPassage: string;
}

export interface BibleTopicStudy {
  id: string;
  title: string;
  icon: string;
  description: string;
  verses: { reference: string; text: string; reflection: string }[];
}

export interface DailyVerse {
  dayIndex: number;
  verse: string;
  text: string;
  devotional: string;
  author: string;
}

// OS 66 LIVROS COMPLETOS DA BÍBLIA SAGRADA (39 AT + 27 NT)
export const BIBLE_BOOKS: BibleBookOverview[] = [
  // ================= ANTIGO TESTAMENTO: PENTATEUCO (5) =================
  {
    name: 'Gênesis',
    category: 'Pentateuco',
    testament: 'Antigo Testamento',
    chapters: 50,
    author: 'Moisés',
    theme: 'Origens, Criação e Aliança',
    keyVerse: 'Gênesis 1:1 - No princípio criou Deus os céus e a terra.',
    summary: 'Narra o início do universo, a criação do homem, a queda, o dilúvio e as alianças com os patriarcas Abraão, Isaque, Jacó e José no Egito.'
  },
  {
    name: 'Êxodo',
    category: 'Pentateuco',
    testament: 'Antigo Testamento',
    chapters: 40,
    author: 'Moisés',
    theme: 'Libertação da Escravidão e a Lei no Sinai',
    keyVerse: 'Êxodo 20:2 - Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão.',
    summary: 'A libertação milagrosa de Israel do Egito, as dez pragas, a travessia do Mar Vermelho, a entrega dos Dez Mandamentos e o Tabernáculo.'
  },
  {
    name: 'Levítico',
    category: 'Pentateuco',
    testament: 'Antigo Testamento',
    chapters: 27,
    author: 'Moisés',
    theme: 'Santidade de Deus e Comunhão',
    keyVerse: 'Levítico 19:2 - Santos sereis, porque eu, o Senhor vosso Deus, sou santo.',
    summary: 'Manual sacerdotal com as leis de sacrifícios, purificação, festas solenes e orientações para um povo santo habitar com o Deus Santo.'
  },
  {
    name: 'Números',
    category: 'Pentateuco',
    testament: 'Antigo Testamento',
    chapters: 36,
    author: 'Moisés',
    theme: 'Peregrinação no Deserto e Fidelidade Divina',
    keyVerse: 'Números 6:24-26 - O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.',
    summary: 'Registra os censos militares e os 40 anos de caminhada no deserto desde o Sinai até as planícies de Moabe, demonstrando a paciência de Deus.'
  },
  {
    name: 'Deuteronômio',
    category: 'Pentateuco',
    testament: 'Antigo Testamento',
    chapters: 34,
    author: 'Moisés (encerramento por Josué)',
    theme: 'Renovação da Aliança e Obediência',
    keyVerse: 'Deuteronômio 6:4-5 - Ouve, Israel, o Senhor nosso Deus é o único Senhor. Amarás, pois, o Senhor teu Deus de todo o teu coração.',
    summary: 'Discursos de despedida de Moisés à nova geração antes de entrarem na Terra Prometida, relembrando a Lei e o compromisso do amor a Deus.'
  },

  // ================= ANTIGO TESTAMENTO: HISTÓRICOS (12) =================
  {
    name: 'Josué',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 24,
    author: 'Josué',
    theme: 'Conquista da Terra e Fidelidade às Promessas',
    keyVerse: 'Josué 1:9 - Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo.',
    summary: 'A travessia do Jordão, a queda das muralhas de Jericó, as vitórias militares e a divisão da terra de Canaã entre as doze tribos.'
  },
  {
    name: 'Juízes',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 21,
    author: 'Tradicionalmente Samuel',
    theme: 'Ciclos de Queda, Arrependimento e Livramento',
    keyVerse: 'Juízes 21:25 - Naqueles dias não havia rei em Israel; cada um fazia o que parecia reto aos seus olhos.',
    summary: 'Relata o ciclo sombrio de apostasia e os juízes que Deus levantou com Seu Espírito para livrar Israel: Débora, Gideão, Sansão e outros.'
  },
  {
    name: 'Rute',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 4,
    author: 'Tradicionalmente Samuel',
    theme: 'Amor Leal e o Parente Remidor',
    keyVerse: 'Rute 1:16 - O teu povo é o meu povo, o teu Deus é o meu Deus.',
    summary: 'Bela história de lealdade da moabita Rute à sua sogra Noemi e seu casamento com Boaz, tornando-se bisavó do rei Davi e ancestral de Jesus.'
  },
  {
    name: '1 Samuel',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 31,
    author: 'Samuel, Natã e Gade',
    theme: 'Transição da Teocracia para a Monarquia',
    keyVerse: '1 Samuel 16:7 - O homem vê o que está diante dos olhos, porém o Senhor olha para o coração.',
    summary: 'A vida do profeta Samuel, a ascensão e queda do rei Saul, e a unção de Davi culminando na vitória sobre Golias.'
  },
  {
    name: '2 Samuel',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 24,
    author: 'Natã e Gade',
    theme: 'O Reinado de Davi e a Aliança Davídica',
    keyVerse: '2 Samuel 7:16 - Porém a tua casa e o teu reino serão firmados para sempre diante de ti.',
    summary: 'A consolidação de Jerusalém como capital, a promessa divina de um trono eterno para o Messias, os triunfos e o quebrantamento de Davi.'
  },
  {
    name: '1 Reis',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 22,
    author: 'Tradicionalmente Jeremias',
    theme: 'A Glória de Salomão e a Divisão do Reino',
    keyVerse: '1 Reis 8:27 - Mas, na verdade, habitaria Deus na terra? Eis que os céus não te podem conter.',
    summary: 'A sabedoria de Salomão e a edificação do Templo, seguida pela divisão do reino em Norte (Israel) e Sul (Judá), e o ministério do profeta Elias.'
  },
  {
    name: '2 Reis',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 25,
    author: 'Tradicionalmente Jeremias',
    theme: 'O Declínio dos Reinos e o Exílio',
    keyVerse: '2 Reis 17:13 - O Senhor advertiu a Israel e a Judá por todos os profetas.',
    summary: 'Os milagres do profeta Eliseu, a sucessão dos reis, a queda do Reino do Norte para a Assíria e a queda de Judá com o cativeiro na Babilônia.'
  },
  {
    name: '1 Crônicas',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 29,
    author: 'Tradicionalmente Esdras',
    theme: 'A Linhagem da Aliança e o Louvor a Deus',
    keyVerse: '1 Crônicas 29:11 - Tua é, Senhor, a magnificência, e o poder, e a honra, e a vitória, e a majestade.',
    summary: 'Genealogias sagradas desde Adão e reinterpretação espiritual do reinado de Davi focada na adoração, organização levítica e preparação do Templo.'
  },
  {
    name: '2 Crônicas',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 36,
    author: 'Tradicionalmente Esdras',
    theme: 'O Templo, Avivamentos e o Retorno',
    keyVerse: '2 Crônicas 7:14 - Se o meu povo, que se chama pelo meu nome, se humilhar, e orar, e buscar a minha face, e se desviar dos seus maus caminhos...',
    summary: 'A glória do templo sob Salomão, as reformas espirituais sob reis como Asa, Josafá, Ezequias e Josias, e o decreto de Ciro autorizando o retorno.'
  },
  {
    name: 'Esdras',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 10,
    author: 'Esdras',
    theme: 'Restauração do Templo e Reforma Espiritual',
    keyVerse: 'Esdras 7:10 - Porque Esdras tinha preparado o seu coração para buscar a lei do Senhor e para a cumprir.',
    summary: 'O regresso dos exilados da Babilônia sob Zorobabel, a reconstrução do segundo templo e a liderança do escriba Esdras restaurando a Lei de Deus.'
  },
  {
    name: 'Neemias',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 13,
    author: 'Neemias',
    theme: 'Reconstrução dos Muros e Liderança Firme',
    keyVerse: 'Neemias 8:10 - A alegria do Senhor é a vossa força.',
    summary: 'Neemias lidera corajosamente a reedificação dos muros de Jerusalém em apenas 52 dias contra ferrenha oposição, promovendo avivamento social.'
  },
  {
    name: 'Ester',
    category: 'Históricos',
    testament: 'Antigo Testamento',
    chapters: 10,
    author: 'Desconhecido (Mardoqueu/Esdras)',
    theme: 'A Providência Invisível de Deus',
    keyVerse: 'Ester 4:14 - E quem sabe se para tal tempo como este chegaste a este reino?',
    summary: 'Como Deus usou a jovem rainha órfã Ester e seu primo Mardoqueu no império persa para livrar o povo judeu do massacre planejado por Hamã.'
  },

  // ================= ANTIGO TESTAMENTO: POÉTICOS (5) =================
  {
    name: 'Jó',
    category: 'Poéticos',
    testament: 'Antigo Testamento',
    chapters: 42,
    author: 'Desconhecido',
    theme: 'A Soberania de Deus no Sofrimento Humano',
    keyVerse: 'Jó 19:25 - Porque eu sei que o meu Redentor vive, e que por fim se levantará sobre a terra.',
    summary: 'A integridade de Jó em meio a perdas devastadoras, debates teológicos profundos sobre justiça divina e o encontro transformador com o Criador.'
  },
  {
    name: 'Salmos',
    category: 'Poéticos',
    testament: 'Antigo Testamento',
    chapters: 150,
    author: 'Davi, Asafe, Filhos de Coré, Moisés, Salomão e outros',
    theme: 'Adoração, Oração e Louvor a Deus',
    keyVerse: 'Salmos 23:1 - O Senhor é o meu pastor, nada me faltará.',
    summary: 'Hinário inspirado de Israel expressando louvor, consolo, lamento, súplica e profecias messiânicas sobre o Reino eterno de Deus.'
  },
  {
    name: 'Provérbios',
    category: 'Poéticos',
    testament: 'Antigo Testamento',
    chapters: 31,
    author: 'Salomão e sábios de Israel',
    theme: 'Sabedoria Prática e Temor ao Senhor',
    keyVerse: 'Provérbios 9:10 - O temor do Senhor é o princípio da sabedoria.',
    summary: 'Máximas práticas inspiradas para a conduta moral, trabalho honesto, amizades, controle da língua, integridade e vida familiar sábia.'
  },
  {
    name: 'Eclesiastes',
    category: 'Poéticos',
    testament: 'Antigo Testamento',
    chapters: 12,
    author: 'Salomão (O Pregador / Qoheleth)',
    theme: 'O Sentido da Vida e o Temor a Deus',
    keyVerse: 'Eclesiastes 12:13 - De tudo o que se tem ouvido, o fim é: Teme a Deus, e guarda os seus mandamentos; porque isto é o dever de todo o homem.',
    summary: 'Reflexão sobre a futilidade dos prazeres mundanos "debaixo do sol" e a conclusão de que a verdadeira plenitude está em temer e obedecer a Deus.'
  },
  {
    name: 'Cantares de Salomão',
    category: 'Poéticos',
    testament: 'Antigo Testamento',
    chapters: 8,
    author: 'Salomão',
    theme: 'A Pureza e Beleza do Amor Conjugal',
    keyVerse: 'Cantares 8:7 - As muitas águas não podem apagar este amor, nem os rios afogá-lo.',
    summary: 'Poema lírico sublime celebrando o amor conjugal puro entre o noivo e a noiva, tipificando também o amor apaixonado de Deus por Seu povo.'
  },

  // ================= ANTIGO TESTAMENTO: PROFETAS MAIORES (5) =================
  {
    name: 'Isaías',
    category: 'Profetas Maiores',
    testament: 'Antigo Testamento',
    chapters: 66,
    author: 'Isaías filho de Amoz',
    theme: 'O Messias Redentor e o Juízo Divino',
    keyVerse: 'Isaías 53:5 - Mas ele foi ferido por causa das nossas transgressões, e moído por causa das nossas iniquidades.',
    summary: 'O "Evangelho do Antigo Testamento", profetizando a vinda de Emanuel, a obra vicária do Servo Sofredor e a criação de novos céus e nova terra.'
  },
  {
    name: 'Jeremias',
    category: 'Profetas Maiores',
    testament: 'Antigo Testamento',
    chapters: 52,
    author: 'Jeremias (o Profeta Chorão)',
    theme: 'A Queda de Judá e a Promessa da Nova Aliança',
    keyVerse: 'Jeremias 31:33 - Porei a minha lei no seu interior, e a escreverei no seu coração; e eu serei o seu Deus e eles serão o meu povo.',
    summary: 'Chamado apaixonado ao arrependimento, o anúncio dos 70 anos de cativeiro babilônico e a gloriosa promessa da Nova Aliança gravada no coração.'
  },
  {
    name: 'Lamentações de Jeremias',
    category: 'Profetas Maiores',
    testament: 'Antigo Testamento',
    chapters: 5,
    author: 'Jeremias',
    theme: 'Choro pela Ruína e Esperança nas Misericórdias',
    keyVerse: 'Lamentações 3:22-23 - As misericórdias do Senhor são a causa de não sermos consumidos; renovam-se cada manhã; grande é a tua fidelidade.',
    summary: 'Cinco poemas acrósticos de dor lancinante pela destruição de Jerusalém e do Templo, pontuados pela certeza da fidelidade inesgotável de Deus.'
  },
  {
    name: 'Ezequiel',
    category: 'Profetas Maiores',
    testament: 'Antigo Testamento',
    chapters: 48,
    author: 'Ezequiel',
    theme: 'A Glória de Deus e a Restauração Espiritual',
    keyVerse: 'Ezequiel 36:26 - Dar-vos-ei coração novo, e porei dentro de vós espírito novo.',
    summary: 'Visões grandiosas da glória de Deus na Babilônia, a visão dos ossos secos renascendo e o templo celestial renovado jorrando águas purificadoras.'
  },
  {
    name: 'Daniel',
    category: 'Profetas Maiores',
    testament: 'Antigo Testamento',
    chapters: 12,
    author: 'Daniel',
    theme: 'A Soberania de Deus sobre os Impérios Terrenos',
    keyVerse: 'Daniel 2:44 - Mas, nos dias destes reis, o Deus do céu levantará um reino que não será jamais destruído.',
    summary: 'A fidelidade exemplar na fornalha e na cova dos leões, e profecias escatológicas sobre a sucessão dos impérios mundiais e o Reino eterno do Messias.'
  },

  // ================= ANTIGO TESTAMENTO: PROFETAS MENORES (12) =================
  {
    name: 'Oséias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 14,
    author: 'Oséias',
    theme: 'O Amor Incondicional de Deus por um Povo Infiel',
    keyVerse: 'Oséias 6:6 - Porque eu quero a misericórdia, e não o sacrifício; e o conhecimento de Deus, mais do que os holocaustos.',
    summary: 'Por meio do casamento doloroso de Oséias com Gômer, Deus ilustra a idolatria de Israel e Seu amor redentor inabalável que atrai o povo de volta.'
  },
  {
    name: 'Joel',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 3,
    author: 'Joel',
    theme: 'O Dia do Senhor e o Derramamento do Espírito',
    keyVerse: 'Joel 2:28 - E há de ser que, depois, derramarei o meu Espírito sobre toda a carne.',
    summary: 'Uma praga de gafanhotos prenuncia o solene Dia do Senhor, chamando ao jejum e profetizando o derramamento do Espírito Santo cumprido em Pentecostes.'
  },
  {
    name: 'Amós',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 9,
    author: 'Amós (boiadeiro de Tecoa)',
    theme: 'Justiça Social e Retidão Divina',
    keyVerse: 'Amós 5:24 - Corra, porém, o juízo como as águas, e a justiça como o ribeiro impetuoso.',
    summary: 'Denúncia corajosa da opressão aos pobres e da falsa religiosidade no próspero Reino do Norte, exigindo justiça e retidão de coração.'
  },
  {
    name: 'Obadias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 1,
    author: 'Obadias',
    theme: 'O Juízo contra o Orgulho de Edom',
    keyVerse: 'Obadias 1:15 - Porque o dia do Senhor está perto, sobre todas as nações; como tu fizeste, assim se fará contigo.',
    summary: 'Profecia contra Edom (descendentes de Esaú) por sua soberba nas fendas das rochas e por se alegrar com a calamidade de seus irmãos de Judá.'
  },
  {
    name: 'Jonas',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 4,
    author: 'Jonas',
    theme: 'A Misericórdia de Deus para com Todas as Nações',
    keyVerse: 'Jonas 4:2 - Sabia que és Deus clemente e misericordioso, tardio em irar-se e grande em benignidade.',
    summary: 'Jonas tenta fugir de sua missão em Nínive, passa pelo grande peixe e finalmente prega aos ninivitas, revelando a compaixão universal de Deus.'
  },
  {
    name: 'Miqueias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 7,
    author: 'Miqueias de Moresete',
    theme: 'Justiça, Misericórdia e o Governador de Belém',
    keyVerse: 'Miqueias 5:2 - E tu, Belém Efrata... de ti me sairá o que governará em Israel, e cujas saídas são desde os tempos antigos, desde os dias da eternidade.',
    summary: 'Contrasta a corrupção dos líderes com o que Deus requer do homem e profetiza o nascimento do Messias na humilde cidade de Belém.'
  },
  {
    name: 'Naum',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 3,
    author: 'Naum de Elcos',
    theme: 'O Julgamento Final da Cruel Nínive',
    keyVerse: 'Naum 1:7 - O Senhor é bom, uma fortaleza no dia da angústia, e conhece os que confiam nele.',
    summary: 'Cerca de 150 anos após Jonas, a Assíria voltou à violência e crueldade; Naum proclama a ruína irrevogável do império assírio sob a justiça de Deus.'
  },
  {
    name: 'Habacuque',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 3,
    author: 'Habacuque',
    theme: 'A Fé Triunfante em Tempos Difíceis',
    keyVerse: 'Habacuque 2:4 - Mas o justo pela sua fé viverá.',
    summary: 'O profeta dialoga com Deus sobre a aparente impunidade dos ímpios e termina com um dos hinos de fé mais comoventes da história bíblica.'
  },
  {
    name: 'Sofonias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 3,
    author: 'Sofonias (tataraneto do rei Ezequias)',
    theme: 'Purificação através do Juízo e o Remanescente Fiel',
    keyVerse: 'Sofonias 3:17 - O Senhor teu Deus está no meio de ti, poderoso para salvar; ele se deleitará em ti com alegria.',
    summary: 'Anuncia a purificação da terra pelo fogo do zelo divino e a restauração de um povo humilde que canta louvores no monte santo de Sião.'
  },
  {
    name: 'Ageu',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 2,
    author: 'Ageu',
    theme: 'Prioridade da Casa de Deus',
    keyVerse: 'Ageu 2:9 - A glória desta última casa será maior do que a da primeira, diz o Senhor dos Exércitos.',
    summary: 'Exorta os repatriados a pararem de cuidar apenas de suas próprias casas luxuosas e terminarem a reconstrução do Templo do Senhor.'
  },
  {
    name: 'Zacarias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 14,
    author: 'Zacarias filho de Baraquias',
    theme: 'Visões Messiânicas e o Rei Humilde',
    keyVerse: 'Zacarias 9:9 - Alegra-te muito, ó filha de Sião... eis que o teu rei virá a ti, justo e salvador, humilde, e montado sobre um jumento.',
    summary: 'Visões noturnas de incentivo à restauração de Jerusalém e profecias messiânicas precisas sobre a entrada triunfal e o pastor traspassado por 30 moedas.'
  },
  {
    name: 'Malaquias',
    category: 'Profetas Menores',
    testament: 'Antigo Testamento',
    chapters: 4,
    author: 'Malaquias',
    theme: 'Fidelidade nas Ofertas e o Sol da Justiça',
    keyVerse: 'Malaquias 4:2 - Mas para vós, os que temeis o meu nome, nascerá o sol da justiça, e cura trará nas suas asas.',
    summary: 'O último livro do Antigo Testamento repreende a apatia espiritual, desafia a fidelidade nos dízimos e anuncia o precursor do Messias (João Batista).'
  },

  // ================= NOVO TESTAMENTO: EVANGELHOS (4) =================
  {
    name: 'Mateus',
    category: 'Evangelhos',
    testament: 'Novo Testamento',
    chapters: 28,
    author: 'Mateus (Levi, ex-publicano)',
    theme: 'Jesus, o Rei Prometido de Israel',
    keyVerse: 'Mateus 28:18-20 - Foi-me dada toda a autoridade no céu e na terra. Ide, portanto, fazei discípulos de todas as nações.',
    summary: 'Demonstra aos judeus que Jesus é o Filho de Davi que cumpre as profecias do Antigo Testamento, enfatizando o Sermão da Montanha e as parábolas do Reino.'
  },
  {
    name: 'Marcos',
    category: 'Evangelhos',
    testament: 'Novo Testamento',
    chapters: 16,
    author: 'João Marcos (guiado por Pedro)',
    theme: 'Jesus, o Servo Sofredor e Poderoso',
    keyVerse: 'Marcos 10:45 - Pois o próprio Filho do Homem não veio para ser servido, mas para servir e dar a sua vida em resgate por muitos.',
    summary: 'Narrativa dinâmica e rápida escrita para os romanos, destacando a autoridade de Jesus através de milagres, curas e Seu sacrifício voluntário na cruz.'
  },
  {
    name: 'Lucas',
    category: 'Evangelhos',
    testament: 'Novo Testamento',
    chapters: 24,
    author: 'Lucas, o médico amado',
    theme: 'Jesus, o Filho do Homem e Salvador dos Perdidos',
    keyVerse: 'Lucas 19:10 - Porque o Filho do homem veio buscar e salvar o que se havia perdido.',
    summary: 'Relato detalhado e compassivo focado na humanidade perfeita de Jesus, Seu amor pelos marginalizados, mulheres, samaritanos e a parábola do Filho Pródigo.'
  },
  {
    name: 'João',
    category: 'Evangelhos',
    testament: 'Novo Testamento',
    chapters: 21,
    author: 'João, o discípulo amado',
    theme: 'Jesus, o Verbo Eterno e Filho de Deus',
    keyVerse: 'João 20:31 - Estes foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome.',
    summary: 'O evangelho espiritual que revela a divindade de Jesus através de sete sinais milagrosos e as sete grandes declarações "EU SOU" da vida eterna.'
  },

  // ================= NOVO TESTAMENTO: HISTÓRIA DA IGREJA (1) =================
  {
    name: 'Atos dos Apóstolos',
    category: 'História da Igreja',
    testament: 'Novo Testamento',
    chapters: 28,
    author: 'Lucas, o médico amado',
    theme: 'O Espírito Santo e o Avanço do Evangelho',
    keyVerse: 'Atos 1:8 - Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.',
    summary: 'A descida do Espírito Santo em Pentecostes, o nascimento da Igreja Primitiva, curas milagrosas e a expansão missionária liderada por Pedro e Paulo.'
  },

  // ================= NOVO TESTAMENTO: EPÍSTOLAS PAULINAS E GERAIS (21) =================
  {
    name: 'Romanos',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 16,
    author: 'Apóstolo Paulo',
    theme: 'A Justificação pela Fé em Cristo',
    keyVerse: 'Romanos 1:16-17 - Não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê... o justo viverá pela fé.',
    summary: 'Tratado teológico monumental sobre o pecado universal, a justificação gratuita pela graça, a vida vitoriosa no Espírito e o propósito soberano de Deus.'
  },
  {
    name: '1 Coríntios',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 16,
    author: 'Apóstolo Paulo',
    theme: 'Ordem na Igreja, Dons Espirituais e o Amor',
    keyVerse: '1 Coríntios 13:13 - Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.',
    summary: 'Instruções práticas para uma igreja com divisões, imoralidade e litígios, culminando no hino supremo ao amor e na teologia da ressurreição.'
  },
  {
    name: '2 Coríntios',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 13,
    author: 'Apóstolo Paulo',
    theme: 'O Poder de Deus Aperfeiçoado na Fraqueza',
    keyVerse: '2 Coríntios 12:9 - A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.',
    summary: 'A defesa mais íntima e apaixonada do apostolado de Paulo, revelando seu "espinho na carne" e a glória do ministério da reconciliação.'
  },
  {
    name: 'Gálatas',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 6,
    author: 'Apóstolo Paulo',
    theme: 'A Liberdade Cristã e a Graça contra o Legalismo',
    keyVerse: 'Gálatas 2:20 - Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim.',
    summary: 'Defesa incisiva do Evangelho da pura graça de Deus, condenando qualquer acréscimo de obras da lei para a salvação e ensinando o Fruto do Espírito.'
  },
  {
    name: 'Efésios',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 6,
    author: 'Apóstolo Paulo',
    theme: 'As Riquezas em Cristo e a Armadura de Deus',
    keyVerse: 'Efésios 2:8-9 - Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.',
    summary: 'Celebra a bênção gloriosa da Igreja como Corpo de Cristo, a reconciliação entre judeus e gentios, a conduta na família e a armadura espiritual.'
  },
  {
    name: 'Filipenses',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 4,
    author: 'Apóstolo Paulo',
    theme: 'A Alegria em Cristo Acima das Circunstâncias',
    keyVerse: 'Filipenses 4:13 - Tudo posso naquele que me fortalece.',
    summary: 'Escrita em uma prisão romana, transborda júbilo santo, apresentando a humilhação e exaltação de Cristo (o poema de Kenosis) e a paz que excede o entendimento.'
  },
  {
    name: 'Colossenses',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 4,
    author: 'Apóstolo Paulo',
    theme: 'A Suprema Preeminência de Cristo',
    keyVerse: 'Colossenses 1:18 - Ele é a cabeça do corpo, da igreja; é o princípio e o primogênito dentre os mortos, para que em tudo tenha a preeminência.',
    summary: 'Refutação de filosofias gnósticas e ascéticas, proclamando que em Cristo habita corporalmente toda a plenitude da divindade.'
  },
  {
    name: '1 Tessalonicenses',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 5,
    author: 'Apóstolo Paulo',
    theme: 'Santificação e a Esperança da Segunda Vinda',
    keyVerse: '1 Tessalonicenses 4:16-17 - Porque o mesmo Senhor descerá do céu com alarido... e assim estaremos para sempre com o Senhor.',
    summary: 'Elogio à fé operosa da jovem igreja e instruções consoladoras sobre a ressurreição dos crentes que dormem e o retorno iminente de Cristo.'
  },
  {
    name: '2 Tessalonicenses',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 3,
    author: 'Apóstolo Paulo',
    theme: 'Firmeza Diante do Engano do Fim dos Tempos',
    keyVerse: '2 Tessalonicenses 2:15 - Ficai firmes e conservai as tradições que vos foram ensinadas.',
    summary: 'Correção de boatos de que o Dia do Senhor já havia ocorrido, revelando a manifestação prévia do homem do pecado e exortando ao trabalho árduo.'
  },
  {
    name: '1 Timóteo',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 6,
    author: 'Apóstolo Paulo',
    theme: 'Liderança Pastoral e Sã Doutrina na Igreja',
    keyVerse: '1 Timóteo 4:12 - Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis, na palavra, no procedimento, no amor, no espírito, na fé, na pureza.',
    summary: 'Manual pastoral com requisitos para bispos/presbíteros e diáconos, instruções para oração pública e combate contra falsos mestres em Éfeso.'
  },
  {
    name: '2 Timóteo',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 4,
    author: 'Apóstolo Paulo',
    theme: 'Combater o Bom Combate e Guardar a Fé',
    keyVerse: '2 Timóteo 4:7-8 - Combati o bom combate, acabei a carreira, guardei a fé. Desde agora, a coroa da justiça me está guardada.',
    summary: 'O comovente testamento final de Paulo no calabouço mamertino em Roma, exortando seu filho na fé a perseverar sem medo no ministério da Palavra.'
  },
  {
    name: 'Tito',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 3,
    author: 'Apóstolo Paulo',
    theme: 'Boas Obras e Ordem nas Igrejas de Creta',
    keyVerse: 'Tito 2:11 - Porque a graça de Deus se há manifestado, trazendo salvação a todos os homens.',
    summary: 'Diretrizes para Tito ordenar presbíteros piedosos na ilha de Creta e ensinar que a graça divina nos educa a renunciar à impiedade e praticar o bem.'
  },
  {
    name: 'Filemom',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 1,
    author: 'Apóstolo Paulo',
    theme: 'Perdão Fraternal e Reconciliação em Cristo',
    keyVerse: 'Filemom 1:16 - Não já como servo, antes, mais do que servo, como irmão amado.',
    summary: 'Carta pessoal de intercessão pelo escravo fugitivo Onésimo, pedindo a Filemom que o receba não com castigo, mas como um irmão amado na fé.'
  },
  {
    name: 'Hebreus',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 13,
    author: 'Autor anônimo primitivo',
    theme: 'A Superioridade Eterna de Cristo e Sua Nova Aliança',
    keyVerse: 'Hebreus 12:2 - Olhando para Jesus, autor e consumador da fé.',
    summary: 'Demonstra a cristãos de origem judaica que Jesus é superior aos anjos, a Moisés e ao sacerdócio levítico, sendo o Eterno Sumo Sacerdote da Aliança Perfeita.'
  },
  {
    name: 'Tiago',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 5,
    author: 'Tiago (irmão do Senhor e líder em Jerusalém)',
    theme: 'A Fé Viva Evidenciada pelas Boas Obras',
    keyVerse: 'Tiago 2:17 - Assim também a fé, se não tiver as obras, é morta em si mesma.',
    summary: 'Provérbios do Novo Testamento focando em religião pura: perseverança em provações, controle da língua, socorro aos necessitados e oração poderosa.'
  },
  {
    name: '1 Pedro',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 5,
    author: 'Apóstolo Pedro',
    theme: 'Esperança Viva em Meio ao Sofrimento e Perseguição',
    keyVerse: '1 Pedro 5:7 - Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
    summary: 'Conforta cristãos espalhados pelo Império Romano enfrentando perseguições, lembrando da herança incorruptível reservada nos céus.'
  },
  {
    name: '2 Pedro',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 3,
    author: 'Apóstolo Pedro',
    theme: 'Alerta contra Falsos Profetas e a Certeza do Retorno de Cristo',
    keyVerse: '2 Pedro 3:18 - Antes, crescei na graça e no conhecimento de nosso Senhor e Salvador, Jesus Cristo.',
    summary: 'Aviso urgente de Pedro antes de seu martírio contra escarnecedores que duvidam da volta do Senhor, reafirmando que Deus não retarda Sua promessa.'
  },
  {
    name: '1 João',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 5,
    author: 'Apóstolo João',
    theme: 'Comunhão com Deus, Amor Fraternal e Certeza da Salvação',
    keyVerse: '1 João 4:8 - Aquele que não ama não conhece a Deus; porque Deus é amor.',
    summary: 'Escrita para dar plena certeza de salvação aos que creem no Filho de Deus, enfatizando que andar na luz significa amar concretamente os irmãos.'
  },
  {
    name: '2 João',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 1,
    author: 'Apóstolo João',
    theme: 'Andar na Verdade e Cuidado com Enganadores',
    keyVerse: '2 João 1:6 - E o amor é este: que andemos segundo os seus mandamentos.',
    summary: 'Breve bilhete endereçado à senhora eleita advertindo a comunidade a não dar acolhida a mestres itinerantes que negam a encarnação de Cristo.'
  },
  {
    name: '3 João',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 1,
    author: 'Apóstolo João',
    theme: 'Hospitalidade Cristã e Fidelidade Ministerial',
    keyVerse: '3 João 1:4 - Não tenho maior gozo do que este: a de ouvir que os meus filhos andam na verdade.',
    summary: 'Elogia o generoso Gaio por apoiar missionários do Reino e repreende a atitude soberba e exclusivista de Diótrefes.'
  },
  {
    name: 'Judas',
    category: 'Epístolas',
    testament: 'Novo Testamento',
    chapters: 1,
    author: 'Judas (irmão de Tiago e de Jesus)',
    theme: 'Batalhar Ardorosamente pela Fé uma Vez Entregue',
    keyVerse: 'Judas 1:3 - Batalhar pela fé que uma vez foi dada aos santos.',
    summary: 'Alerta veemente contra indivíduos ímpios que transformam a graça de Deus em libertinagem, encerrando com uma magnífica doxologia de proteção.'
  },

  // ================= NOVO TESTAMENTO: PROFECIA (1) =================
  {
    name: 'Apocalipse',
    category: 'Profecia',
    testament: 'Novo Testamento',
    chapters: 22,
    author: 'Apóstolo João (na Ilha de Patmos)',
    theme: 'A Vitória Definitiva do Cordeiro e Novos Céus',
    keyVerse: 'Apocalipse 21:4 - E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor.',
    summary: 'A revelação final do triunfo glorioso de Jesus Cristo sobre as forças das trevas, o julgamento dos ímpios, a Nova Jerusalém e a comunhão eterna com o Senhor.'
  }
];

export const BIBLE_GLOSSARY: BibleGlossaryTerm[] = [
  {
    term: 'Graça (Charis)',
    origin: 'Grego',
    definition: 'O favor imerecido e generoso de Deus concedido aos pecadores por meio da obra redentora de Jesus Cristo na cruz, sem que o homem nada possa fazer para comprá-lo.',
    keyPassage: 'Efésios 2:8-9'
  },
  {
    term: 'Justificação (Dikaiosis)',
    origin: 'Grego',
    definition: 'Ato judicial soberano de Deus pelo qual Ele declara o pecador justo e perdoado de toda culpa, imputando-lhe a perfeita justiça de Cristo mediante a fé.',
    keyPassage: 'Romanos 5:1'
  },
  {
    term: 'Redenção (Apolytrosis)',
    origin: 'Grego',
    definition: 'Libertação mediante o pagamento de um resgate. Na Bíblia, Cristo pagou o preço definitivo com Seu próprio sangue para nos resgatar do poder do pecado e da morte.',
    keyPassage: '1 Pedro 1:18-19'
  },
  {
    term: 'Shekinah',
    origin: 'Hebraico',
    definition: 'Termo tradicional que expressa a habitação visível da glória brilhante e majestosa de Deus no meio do Seu povo, como sobre o propiciatório do Tabernáculo.',
    keyPassage: 'Êxodo 40:34-35'
  },
  {
    term: 'Propiciação (Hilasterion)',
    origin: 'Grego',
    definition: 'O sacrifício que aplaca a justa ira de Deus contra o pecado e restaura a comunhão pacífica entre o Criador e a humanidade.',
    keyPassage: '1 João 2:2'
  },
  {
    term: 'Aliança (Berith)',
    origin: 'Hebraico',
    definition: 'Pacto sagrado e solene selado entre Deus e o homem com juramento e promessas eternas, estabelecendo direitos e deveres de comunhão.',
    keyPassage: 'Gênesis 15:18'
  },
  {
    term: 'Maná (Man-hu)',
    origin: 'Hebraico',
    definition: 'Alimento miraculoso fornecido por Deus aos hebreus durante os 40 anos de peregrinação no deserto. Significa "O que é isto?".',
    keyPassage: 'Êxodo 16:15'
  },
  {
    term: 'Maranata',
    origin: 'Aramaico',
    definition: 'Frase que expressa a oração e esperança confiante da Igreja Primitiva: "Vem, nosso Senhor!".',
    keyPassage: '1 Coríntios 16:22'
  }
];

export const BIBLE_TOPICS: BibleTopicStudy[] = [
  {
    id: 'paz-ansiedade',
    title: 'Vencendo a Ansiedade e Encontrando Paz',
    icon: 'ShieldCheck',
    description: 'Como a Palavra de Deus nos ensina a descansar em Sua soberania e cuidado.',
    verses: [
      {
        reference: 'Filipenses 4:6-7',
        text: 'Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplicas, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.',
        reflection: 'Troque a preocupação pela oração de gratidão. A paz divina transcende qualquer circunstância.'
      },
      {
        reference: '1 Pedro 5:7',
        text: 'Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.',
        reflection: 'Deus Se importa com cada detalhe da sua vida. Entregue o fardo em Suas mãos fortes.'
      }
    ]
  },
  {
    id: 'fe-coragem',
    title: 'Fé Inabalável e Coragem Espiritual',
    icon: 'Flame',
    description: 'Passagens bíblicas para momentos de decisões desafiadoras e testes de fé.',
    verses: [
      {
        reference: 'Josué 1:9',
        text: 'Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.',
        reflection: 'A coragem bíblica não é a ausência de perigo, mas a certeza inabalável da presença do Senhor.'
      },
      {
        reference: 'Hebreus 11:6',
        text: 'Ora, sem fé é impossível agradar-lhe; porque é necessário que aquele que se aproxima de Deus creia que ele existe, e que é galardoador dos que o buscam.',
        reflection: 'Buscar a Deus em fé com sinceridade atrai o favor e as bênçãos celestiais.'
      }
    ]
  },
  {
    id: 'sabedoria',
    title: 'Sabedoria Divina para a Vida Diária',
    icon: 'Sparkles',
    description: 'Princípios bíblicos para discernir caminhos retos e tomar boas decisões.',
    verses: [
      {
        reference: 'Tiago 1:5',
        text: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto, e ser-lhe-á dada.',
        reflection: 'Deus tem prazer em conceder sabedoria abundante àqueles que pedem com humildade.'
      },
      {
        reference: 'Provérbios 3:5-6',
        text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
        reflection: 'Consulte ao Senhor antes de dar o próximo passo e Ele guiará seus pés no caminho reto.'
      }
    ]
  }
];

export const DAILY_VERSES: DailyVerse[] = [
  {
    dayIndex: 0,
    verse: 'Isaías 40:31',
    text: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.',
    devotional: 'A paciência em Deus não é perda de tempo; é o tempo em que Ele renova o nosso fôlego para alçarmos voos mais altos.',
    author: 'Isaías'
  },
  {
    dayIndex: 1,
    verse: 'Salmos 46:1',
    text: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.',
    devotional: 'Não importa a tempestade lá fora, no abrigo do Altíssimo você encontra proteção e paz inabalável.',
    author: 'Davi'
  },
  {
    dayIndex: 2,
    verse: 'Jeremias 29:11',
    text: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
    devotional: 'O futuro não está à mercê do acaso; está desenhado pelas mãos dAquele que te amou desde a fundação do mundo.',
    author: 'Jeremias'
  },
  {
    dayIndex: 3,
    verse: 'João 8:32',
    text: 'E conhecereis a verdade, e a verdade vos libertará.',
    devotional: 'A Palavra de Deus liberta do engano, do medo e da culpa, trazendo plena liberdade no amor de Cristo.',
    author: 'Jesus Cristo'
  }
];

export function getTodayVerse(): DailyVerse {
  const day = new Date().getDay();
  return DAILY_VERSES[day % DAILY_VERSES.length];
}
