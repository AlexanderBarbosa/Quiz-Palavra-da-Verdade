import { Question, AgeCategory, LadderStep } from '../types';

export const LADDER_STEPS: LadderStep[] = [
  { tier: 1, rewardCorrect: 1000, rewardStop: 0, rewardWrong: 0 },
  { tier: 2, rewardCorrect: 2000, rewardStop: 1000, rewardWrong: 500 },
  { tier: 3, rewardCorrect: 5000, rewardStop: 2000, rewardWrong: 1000 },
  { tier: 4, rewardCorrect: 10000, rewardStop: 5000, rewardWrong: 2500 },
  { tier: 5, rewardCorrect: 20000, rewardStop: 10000, rewardWrong: 5000 },
  { tier: 6, rewardCorrect: 50000, rewardStop: 20000, rewardWrong: 10000 },
  { tier: 7, rewardCorrect: 100000, rewardStop: 50000, rewardWrong: 25000 },
  { tier: 8, rewardCorrect: 200000, rewardStop: 100000, rewardWrong: 50000 },
  { tier: 9, rewardCorrect: 500000, rewardStop: 200000, rewardWrong: 100000 },
  { tier: 10, rewardCorrect: 1000000, rewardStop: 500000, rewardWrong: 0 },
];

export const BIBLE_QUESTIONS: Question[] = [
  // =========================================================================
  // CATEGORIA 1: CRIANÇAS / PEQUENOS DISCÍPULOS (KIDS)
  // =========================================================================
  // Tier 1
  {
    id: 'k1_a',
    category: 'kids',
    tier: 1,
    question: 'Quem construiu a grande arca para salvar os animais do dilúvio?',
    options: ['Moisés', 'Noé', 'Abraão', 'Sansão'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 6:13-14',
    explanation: 'Deus ordenou que Noé construísse uma arca de madeira de gofer para abrigar sua família e os animais durante o dilúvio.',
    curiosity: 'Noé soltou primeiro um corvo e depois uma pomba para verificar se a terra já havia secado.'
  },
  {
    id: 'k1_b',
    category: 'kids',
    tier: 1,
    question: 'Em quantos dias Deus criou o mundo e tudo o que nele existe?',
    options: ['3 dias', '6 dias', '10 dias', '12 dias'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 1:31 - 2:2',
    explanation: 'Deus criou todas as coisas em seis dias e no sétimo dia Ele descansou de toda a Sua obra.',
    curiosity: 'No primeiro dia, Deus disse: "Haja luz!", e houve luz.'
  },
  {
    id: 'k1_c',
    category: 'kids',
    tier: 1,
    question: 'Quem foram os dois primeiros seres humanos criados por Deus no Jardim do Éden?',
    options: ['Abraão e Sara', 'Adão e Eva', 'Moisés e Miriã', 'José e Maria'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 2:7, 21-22',
    explanation: 'Deus formou Adão do pó da terra e soprou em suas narinas o fôlego da vida, e depois formou Eva.',
    curiosity: 'O Jardim do Éden era banhado por quatro grandes rios: Pisom, Giom, Tigre e Eufrates.'
  },

  // Tier 2
  {
    id: 'k2_a',
    category: 'kids',
    tier: 2,
    question: 'Qual jovem pastor derrotou o gigante Golias com uma funda e uma pedra?',
    options: ['Salomão', 'Davi', 'Samuel', 'Josué'],
    correctIndex: 1,
    biblicalReference: '1 Samuel 17:49-50',
    explanation: 'Davi confiava totalmente no poder do Senhor e venceu o temível filisteu usando sua funda de pastor.',
    curiosity: 'Davi escolheu cinco pedras lisas do ribeiro antes de marchar para a batalha.'
  },
  {
    id: 'k2_b',
    category: 'kids',
    tier: 2,
    question: 'Qual o nome do pai terreno de Jesus, que era carpinteiro em Nazaré?',
    options: ['Zacarias', 'José', 'Simão', 'Tiago'],
    correctIndex: 1,
    biblicalReference: 'Mateus 1:16, 13:55',
    explanation: 'José era um homem justo da linhagem de Davi e cuidou de Jesus com carinho e fidelidade.',
    curiosity: 'Jesus aprendeu a profissão de carpinteiro com José em Nazaré.'
  },
  {
    id: 'k2_c',
    category: 'kids',
    tier: 2,
    question: 'O que o povo de Israel recebeu de Deus que caiu do céu como chuva no deserto?',
    options: ['Frutos doces', 'Maná', 'Pães de trigo', 'Mel das rochas'],
    correctIndex: 1,
    biblicalReference: 'Êxodo 16:31',
    explanation: 'O maná caía todas as manhãs com o orvalho e tinha sabor doce como bolo de mel.',
    curiosity: 'A palavra hebraica "Man-hu" significa "O que é isto?", pois ninguém conhecia aquele alimento.'
  },

  // Tier 3
  {
    id: 'k3_a',
    category: 'kids',
    tier: 3,
    question: 'Quem foi engolido por um grande peixe após tentar fugir de Deus?',
    options: ['Elias', 'Jonas', 'Eliseu', 'Pedro'],
    correctIndex: 1,
    biblicalReference: 'Jonas 1:17',
    explanation: 'Jonas tentou fugir em um navio para Társis, mas foi engolido por um grande peixe enviado pelo Senhor.',
    curiosity: 'Jonas ficou três dias e três noites no ventre do peixe orando arrependido a Deus.'
  },
  {
    id: 'k3_b',
    category: 'kids',
    tier: 3,
    question: 'Quem recebeu de seu pai Jacó uma túnica especial de muitas cores?',
    options: ['Benjamim', 'José', 'Judá', 'Ruben'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 37:3',
    explanation: 'Jacó amava muito a José e lhe deu de presente uma linda túnica de várias cores.',
    curiosity: 'Mais tarde, José se tornou governador de todo o Egito e salvou sua família da fome.'
  },
  {
    id: 'k3_c',
    category: 'kids',
    tier: 3,
    question: 'Quem foi colocado num cestinho de junco nas águas do rio Nilo para escapar do perigo?',
    options: ['Arão', 'Moisés', 'Gideão', 'Sansão'],
    correctIndex: 1,
    biblicalReference: 'Êxodo 2:3',
    explanation: 'Sua mãe Joquebede o colocou no cesto para salvá-lo, e a filha do Faraó o adotou como filho.',
    curiosity: 'O nome "Moisés" significa "tirado das águas".'
  },

  // Tier 4
  {
    id: 'k4_a',
    category: 'kids',
    tier: 4,
    question: 'Em qual cidade Jesus nasceu numa manjedoura?',
    options: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'],
    correctIndex: 2,
    biblicalReference: 'Lucas 2:4-7',
    explanation: 'Jesus nasceu em Belém da Judeia, conforme profetizado séculos antes pelo profeta Miqueias.',
    curiosity: 'Belém em hebraico significa "Casa do Pão". Jesus é o Pão Vivo que desceu do céu.'
  },
  {
    id: 'k4_b',
    category: 'kids',
    tier: 4,
    question: 'Qual animal falou com o profeta Balaão na estrada quando viu o anjo do Senhor?',
    options: ['Um cordeiro', 'Uma jumenta', 'Um cavalo', 'Um camelo'],
    correctIndex: 1,
    biblicalReference: 'Números 22:28',
    explanation: 'Deus abriu a boca da jumenta para advertir Balaão sobre o anjo com a espada desembainhada.',
    curiosity: 'Este é um dos raros momentos bíblicos em que um animal falou com voz humana por milagre de Deus.'
  },

  // Tier 5
  {
    id: 'k5_a',
    category: 'kids',
    tier: 5,
    question: 'Quem orava a Deus três vezes ao dia e foi protegido na cova dos leões?',
    options: ['Sadraque', 'Daniel', 'Neemias', 'Ezequiel'],
    correctIndex: 1,
    biblicalReference: 'Daniel 6:16-22',
    explanation: 'Daniel permaneceu fiel a Deus e o Senhor enviou o Seu anjo que fechou a boca dos leões famintos.',
    curiosity: 'O rei Dario ficou tão feliz que fez um decreto declarando que todos deveriam temer o Deus de Daniel.'
  },
  {
    id: 'k5_b',
    category: 'kids',
    tier: 5,
    question: 'Quantos pães e peixinhos o menino entregou a Jesus para alimentar uma grande multidão?',
    options: ['7 pães e 3 peixes', '5 pães e 2 peixinhos', '12 pães e 4 peixes', '3 pães e 1 peixe'],
    correctIndex: 1,
    biblicalReference: 'João 6:9',
    explanation: 'Com apenas cinco pães de cevada e dois peixinhos, Jesus alimentou mais de 5.000 pessoas e ainda sobraram 12 cestos cheios!',
    curiosity: 'O milagre ensina que quando colocamos o pouco que temos nas mãos de Jesus, Ele multiplica com abundância.'
  },

  // Tier 6
  {
    id: 'k6_a',
    category: 'kids',
    tier: 6,
    question: 'Qual homem baixinho subiu em uma árvore para conseguir ver Jesus passar em Jericó?',
    options: ['Bartimeu', 'Zaqueu', 'Nicodemos', 'Lázaro'],
    correctIndex: 1,
    biblicalReference: 'Lucas 19:1-8',
    explanation: 'Zaqueu subiu num sicômoro e Jesus o avistou, chamando-o pelo nome e hospedando-se em sua casa.',
    curiosity: 'Transformado pelo amor de Jesus, Zaqueu doou metade dos seus bens aos pobres.'
  },
  {
    id: 'k6_b',
    category: 'kids',
    tier: 6,
    question: 'O que Moisés estendeu sobre o Mar Vermelho para que as águas se abrissem?',
    options: ['Uma espada dourada', 'Sua vara de pastor', 'Seu manto sagrado', 'Uma tocha acesa'],
    correctIndex: 1,
    biblicalReference: 'Êxodo 14:16-21',
    explanation: 'Moisés estendeu a vara sobre o mar e o Senhor soprou um forte vento oriental que abriu o caminho em seco.',
    curiosity: 'O povo de Israel caminhou em terra enxuta com paredões de água à direita e à esquerda.'
  },

  // Tier 7
  {
    id: 'k7_a',
    category: 'kids',
    tier: 7,
    question: 'Quem ouviu a voz de Deus chamando-o à noite no templo enquanto ainda era menino?',
    options: ['Davi', 'Samuel', 'Josias', 'João Batista'],
    correctIndex: 1,
    biblicalReference: '1 Samuel 3:10',
    explanation: 'O jovem Samuel respondeu: "Fala, Senhor, porque o teu servo ouve!", e se tornou um grande profeta.',
    curiosity: 'Sua mãe Ana havia orado fervorosamente pedindo um filho e o consagrou ao Senhor por toda a vida.'
  },
  {
    id: 'k7_b',
    category: 'kids',
    tier: 7,
    question: 'Qual homem tinha uma força extraordinária em seus cabelos consagrados a Deus?',
    options: ['Gideão', 'Sansão', 'Bole', 'Jafé'],
    correctIndex: 1,
    biblicalReference: 'Juízes 16:17',
    explanation: 'Sansão era nazireu de Deus desde o nascimento e enquanto seu voto era mantido, o Espírito do Senhor lhe dava força sobre-humana.',
    curiosity: 'Com a queixada de um jumento, Sansão derrotou mil guerreiros filisteus.'
  },

  // Tier 8
  {
    id: 'k8_a',
    category: 'kids',
    tier: 8,
    question: 'Qual foi o sinal colocado no céu por Deus como aliança de que nunca mais haveria outro dilúvio universal?',
    options: ['Uma estrela cadente', 'O arco-íris', 'Uma nuvem de fogo', 'O eclipse solar'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 9:13',
    explanation: 'Deus disse: "O meu arco tenho posto nas nuvens; este será por sinal da aliança entre mim e a terra".',
    curiosity: 'O arco-íris possui sete cores principais e reflete a fidelidade eterna de Deus.'
  },
  {
    id: 'k8_b',
    category: 'kids',
    tier: 8,
    question: 'Quem andou sobre as águas em direção a Jesus até começar a ter medo do vento?',
    options: ['João', 'Pedro', 'Tiago', 'André'],
    correctIndex: 1,
    biblicalReference: 'Mateus 14:29-31',
    explanation: 'Pedro desceu do barco e andou por cima das ondas, mas ao olhar o vento afundou e Jesus estendeu a mão para salvá-lo.',
    curiosity: 'Jesus disse a ele: "Homem de pequena fé, por que duvidaste?".'
  },

  // Tier 9
  {
    id: 'k9_a',
    category: 'kids',
    tier: 9,
    question: 'Qual rei de Israel pediu sabedoria a Deus em vez de riquezas ou vida longa?',
    options: ['Saul', 'Salomão', 'Roboão', 'Ezequias'],
    correctIndex: 1,
    biblicalReference: '1 Reis 3:9-12',
    explanation: 'Deus se agradou do pedido humilde de Salomão e lhe concedeu sabedoria incomparável e também honra e riquezas.',
    curiosity: 'Pessoas de todas as nações, incluindo a Rainha de Sabá, viajavam para ouvir os conselhos sábios de Salomão.'
  },
  {
    id: 'k9_b',
    category: 'kids',
    tier: 9,
    question: 'Qual profeta pediu azeite a uma viúva pobre e o azeite multiplicou até encher todas as vasilhas emprestadas?',
    options: ['Elias', 'Eliseu', 'Isaías', 'Amós'],
    correctIndex: 1,
    biblicalReference: '2 Reis 4:1-7',
    explanation: 'Eliseu instruiu a viúva a pegar vasilhas com seus vizinhos; o azeite só parou de jorrar quando não havia mais vasilhas vazias!',
    curiosity: 'Com o azeite vendido, a viúva pagou todas as suas dívidas e viveu com seus filhos.'
  },

  // Tier 10
  {
    id: 'k10_a',
    category: 'kids',
    tier: 10,
    question: 'Quantos livros tem a Bíblia Sagrada no total?',
    options: ['50 livros', '66 livros', '70 livros', '100 livros'],
    correctIndex: 1,
    biblicalReference: 'Cânon Bíblico',
    explanation: 'A Bíblia Sagrada é composta por 66 livros inspirados: 39 no Antigo Testamento e 27 no Novo Testamento.',
    curiosity: 'A Bíblia foi escrita ao longo de mais de 1.500 anos por cerca de 40 autores diferentes inspirados pelo Espírito Santo.'
  },
  {
    id: 'k10_b',
    category: 'kids',
    tier: 10,
    question: 'Qual o último livro da Bíblia que descreve o céu, a Nova Jerusalém e o retorno triunfal de Jesus?',
    options: ['Gênesis', 'Salmos', 'Atos', 'Apocalipse'],
    correctIndex: 3,
    biblicalReference: 'Apocalipse 21:1-4',
    explanation: 'O Apocalipse termina prometendo que Deus habitará com os homens e enxugará dos olhos toda lágrima.',
    curiosity: 'A Bíblia começa com um jardim no Gênesis e termina com uma cidade santa no Apocalipse.'
  },

  // =========================================================================
  // CATEGORIA 2: JOVENS / VALENTES DA FÉ (TEENS)
  // =========================================================================
  // Tier 1
  {
    id: 't1_a',
    category: 'teens',
    tier: 1,
    question: 'Qual o primeiro mandamento com promessa citado pelo apóstolo Paulo aos jovens em Efésios?',
    options: ['Não matarás', 'Honra teu pai e tua mãe', 'Não furtarás', 'Lembra-te do sábado'],
    correctIndex: 1,
    biblicalReference: 'Efésios 6:2-3',
    explanation: 'Honrar pai e mãe é acompanhado da promessa divina: "para que te vá bem e vivas muito tempo sobre a terra".',
    curiosity: 'A honra aos pais abrange respeito, consideração e gratidão em todas as fases da vida.'
  },
  {
    id: 't1_b',
    category: 'teens',
    tier: 1,
    question: 'Qual jovem rei de Judá começou a reinar com apenas 8 anos de idade e promoveu uma grande reforma espiritual?',
    options: ['Josafá', 'Josias', 'Manassés', 'Acaz'],
    correctIndex: 1,
    biblicalReference: '2 Reis 22:1-2',
    explanation: 'Josias buscou ao Senhor desde a sua mocidade e ao encontrar o Livro da Lei no templo rasgou suas vestes e renovou a aliança.',
    curiosity: 'Durante o reinado de Josias foi celebrada uma das maiores Páscoas de toda a história de Israel.'
  },

  // Tier 2
  {
    id: 't2_a',
    category: 'teens',
    tier: 2,
    question: 'Qual profeta subiu aos céus em um redemoinho com carruagens e cavalos de fogo?',
    options: ['Elias', 'Eliseu', 'Isaías', 'Enoque'],
    correctIndex: 0,
    biblicalReference: '2 Reis 2:11',
    explanation: 'Elias foi arrebatado ao céu sem provar a morte física, deixando seu manto com Eliseu.',
    curiosity: 'Eliseu pediu e recebeu porção dobrada do espírito que repousava sobre Elias.'
  },
  {
    id: 't2_b',
    category: 'teens',
    tier: 2,
    question: 'Em Efésios 6, qual peça da Armadura de Deus serve para apagar todos os dardos inflamados do maligno?',
    options: ['O Capacete da Salvação', 'O Escudo da Fé', 'A Espada do Espírito', 'A Couraça da Justiça'],
    correctIndex: 1,
    biblicalReference: 'Efésios 6:16',
    explanation: 'Paulo orienta os cristãos a tomarem sobretudo o escudo da fé contra as ciladas espirituais.',
    curiosity: 'Os escudos romanos eram revestidos de couro grosso molhado em água antes da batalha para extinguir flechas incandescentes.'
  },

  // Tier 3
  {
    id: 't3_a',
    category: 'teens',
    tier: 3,
    question: 'Na parábola contada por Jesus, o que o Filho Pródigo pediu ao pai antes de partir para uma terra distante?',
    options: ['Sua bênção de sacerdote', 'Sua parte da herança', 'Cem ovelhas e servos', 'Uma carruagem de luxo'],
    correctIndex: 1,
    biblicalReference: 'Lucas 15:11-14',
    explanation: 'O filho mais novo pediu a antecipação de sua herança, gastou tudo dissolutamente e depois voltou humilhado ao pai.',
    curiosity: 'Ao ver o filho voltando de longe, o pai correu, abraçou-o e colocou nele o melhor anel e sandálias.'
  },
  {
    id: 't3_b',
    category: 'teens',
    tier: 3,
    question: 'Qual jovem corajosa declarou "Se perecer, pereci" para interceder pelo seu povo diante do rei persa?',
    options: ['Rute', 'Ester', 'Débora', 'Ana'],
    correctIndex: 1,
    biblicalReference: 'Ester 4:16',
    explanation: 'A rainha Ester convocou um jejum de três dias e entrou na presença do rei Assuero para desmascarar a conspiração de Hamã.',
    curiosity: 'A vitória do povo judeu narrada em Ester deu origem à alegre festa judaica de Purim.'
  },

  // Tier 4
  {
    id: 't4_a',
    category: 'teens',
    tier: 4,
    question: 'Com quantos homens Gideão venceu o incontável exército dos midianitas por ordem do Senhor?',
    options: ['32.000', '10.000', '300', '1.000'],
    correctIndex: 2,
    biblicalReference: 'Juízes 7:7-8',
    explanation: 'Deus reduziu o exército a apenas 300 homens selecionados pela maneira como beberam água no ribeiro.',
    curiosity: 'Eles atacaram à meia-noite tocando trombetas, quebrando cântaros e segurando tochas com o brado "Pelo Senhor e por Gideão!".'
  },
  {
    id: 't4_b',
    category: 'teens',
    tier: 4,
    question: 'Qual discípulo jovem recebeu a famosa exortação de Paulo: "Ninguém despreze a tua mocidade"?',
    options: ['Tito', 'Timóteo', 'Lucas', 'Barnabé'],
    correctIndex: 1,
    biblicalReference: '1 Timóteo 4:12',
    explanation: 'Paulo instruiu Timóteo a ser exemplo dos fiéis na palavra, no procedimento, no amor, na fé e na pureza.',
    curiosity: 'Timóteo aprendeu as Escrituras desde a infância com sua mãe Eunice e sua avó Lóide.'
  },

  // Tier 5
  {
    id: 't5_a',
    category: 'teens',
    tier: 5,
    question: 'No caminho de qual cidade o perseguidor Saulo de Tarso teve um encontro com a luz resplandecente de Cristo?',
    options: ['Antioquia', 'Roma', 'Damasco', 'Corinto'],
    correctIndex: 2,
    biblicalReference: 'Atos 9:3-6',
    explanation: 'Indo para prender cristãos em Damasco, Saulo foi cercado por uma luz do céu e ouviu: "Saulo, Saulo, por que me persegues?".',
    curiosity: 'Saulo ficou cego por três dias até que Ananias orou por ele e caíram escamas de seus olhos.'
  },
  {
    id: 't5_b',
    category: 'teens',
    tier: 5,
    question: 'Qual o nome dos três jovens hebreus amigos de Daniel que não se prostraram diante da estátua de ouro do rei Nabucodonosor?',
    options: [
      'Simão, André e Tiago',
      'Sadraque, Mesaque e Abednego',
      'Eleazar, Finéias e Itamar',
      'Gideão, Baraque e Jefté'
    ],
    correctIndex: 1,
    biblicalReference: 'Daniel 3:16-25',
    explanation: 'Lançados na fornalha ardente, o rei viu um quarto homem passeando com eles com aspecto do Filho de Deus e nem o cheiro de fogo pegou em suas roupas.',
    curiosity: 'Seus nomes hebraicos originais eram Hananias, Misael e Azarias.'
  },

  // Tier 6
  {
    id: 't6_a',
    category: 'teens',
    tier: 6,
    question: 'O que aconteceu no dia de Pentecostes quando os discípulos estavam reunidos em oração em Jerusalém?',
    options: [
      'O Templo de Herodes foi reconstruído',
      'O Espírito Santo desceu como línguas de fogo e falaram em outras línguas',
      'O mar da Galileia se secou milagrosamente',
      'Os discípulos foram presos pelos soldados romanos'
    ],
    correctIndex: 1,
    biblicalReference: 'Atos 2:1-4',
    explanation: 'Cerca de 120 discípulos foram cheios do Espírito Santo e pregaram com ousadia as grandezas de Deus.',
    curiosity: 'Naquele mesmo dia, após a pregação fervorosa do apóstolo Pedro, quase 3.000 almas se converteram e foram batizadas.'
  },
  {
    id: 't6_b',
    category: 'teens',
    tier: 6,
    question: 'Qual dos doze apóstolos era cobrador de impostos (publicano) antes de atender ao chamado de Jesus?',
    options: ['Pedro', 'Mateus (Levi)', 'Tomé', 'Filipe'],
    correctIndex: 1,
    biblicalReference: 'Mateus 9:9',
    explanation: 'Jesus viu Mateus sentado na coletoria e lhe disse: "Segue-me!". Ele se levantou imediatamente e o seguiu.',
    curiosity: 'Mateus ofereceu um grande banquete em sua casa para que outros publicanos conhecessem a Jesus.'
  },

  // Tier 7
  {
    id: 't7_a',
    category: 'teens',
    tier: 7,
    question: 'Qual profeta foi enviado à casa de um oleiro para aprender como Deus molda a vida de Seu povo?',
    options: ['Isaías', 'Jeremias', 'Oséias', 'Miqueias'],
    correctIndex: 1,
    biblicalReference: 'Jeremias 18:1-6',
    explanation: 'O vaso se estragou na mão do oleiro, e ele fez dele outro vaso novo, como bem lhe pareceu aos olhos.',
    curiosity: 'Deus declarou: "Como o barro na mão do oleiro, assim sois vós na minha mão, ó casa de Israel".'
  },
  {
    id: 't7_b',
    category: 'teens',
    tier: 7,
    question: 'Em Filipenses 4:13, qual célebre frase o apóstolo Paulo declarou com plena convicção?',
    options: [
      'A riqueza deste mundo nos enriquece',
      'Tudo posso naquele que me fortalece',
      'O homem é fruto do seu próprio esforço',
      'O destino de todos está na sorte'
    ],
    correctIndex: 1,
    biblicalReference: 'Filipenses 4:13',
    explanation: 'Paulo escreveu esta carta preso em Roma, ensinando o segredo de estar contente em qualquer situação através da força de Cristo.',
    curiosity: 'O contexto do versículo trata de saber passar necessidade e saber ter abundância com o coração em Deus.'
  },

  // Tier 8
  {
    id: 't8_a',
    category: 'teens',
    tier: 8,
    question: 'Qual foi o primeiro milagre público realizado por Jesus registrado no Evangelho de João?',
    options: [
      'A cura do cego de nascença',
      'A transformação de água em vinho nas bodas de Caná',
      'A ressurreição de Lázaro',
      'A multiplicação dos pães'
    ],
    correctIndex: 1,
    biblicalReference: 'João 2:1-11',
    explanation: 'Em Caná da Galileia, Jesus transformou cerca de 600 litros de água no melhor vinho, manifestando Sua glória aos discípulos.',
    curiosity: 'O mestre-sala elogiou o noivo dizendo que ele havia guardado o melhor vinho para o final da festa.'
  },
  {
    id: 't8_b',
    category: 'teens',
    tier: 8,
    question: 'Qual amigo de Davi e filho do rei Saul fez um pacto de amizade profunda com Davi arriscando a própria vida?',
    options: ['Jônatas', 'Abner', 'Absalão', 'Adonias'],
    correctIndex: 0,
    biblicalReference: '1 Samuel 18:1-4',
    explanation: 'A alma de Jônatas se ligou à de Davi com amor fraternal, entregando-lhe sua capa, espada, arco e cinto militar.',
    curiosity: 'Mesmo sendo o herdeiro legal do trono de Saul, Jônatas reconheceu com humildade que Davi havia sido escolhido por Deus.'
  },

  // Tier 9
  {
    id: 't9_a',
    category: 'teens',
    tier: 9,
    question: 'Qual capítulo da carta aos Romanos termina com o triunfo de que "nada nos poderá separar do amor de Deus"?',
    options: ['Romanos 5', 'Romanos 8', 'Romanos 10', 'Romanos 12'],
    correctIndex: 1,
    biblicalReference: 'Romanos 8:38-39',
    explanation: 'Romanos 8 proclama com majestade que nem tribulação, angústia, morte ou poderes podem nos afastar do amor de Deus em Cristo Jesus.',
    curiosity: 'Romanos 8 começa com "nenhuma condenação há" e termina com "nenhuma separação haverá".'
  },
  {
    id: 't9_b',
    category: 'teens',
    tier: 9,
    question: 'Quem orou a Deus e o sol se deteve sobre Gibeão e a lua sobre o vale de Aijalom durante a batalha?',
    options: ['Moisés', 'Josué', 'Calebe', 'Gideão'],
    correctIndex: 1,
    biblicalReference: 'Josué 10:12-14',
    explanation: 'Josué falou ao Senhor diante de todo o Israel e o sol parou no meio do céu por quase um dia inteiro.',
    curiosity: 'A Bíblia destaca que nunca antes nem depois houve dia semelhante em que o Senhor atendeu à voz de um homem dessa forma.'
  },

  // Tier 10
  {
    id: 't10_a',
    category: 'teens',
    tier: 10,
    question: 'Qual o significado bíblico do termo hebraico "Ebenézer" proclamado pelo profeta Samuel após a vitória sobre os filisteus?',
    options: ['Deus é poderoso', 'Até aqui nos ajudou o Senhor', 'Luz celestial', 'O Senhor dos Exércitos'],
    correctIndex: 1,
    biblicalReference: '1 Samuel 7:12',
    explanation: 'Samuel tomou uma pedra, colocou-a entre Mispá e Sem e a chamou Ebenézer dizendo: "Até aqui nos ajudou o Senhor".',
    curiosity: 'Ebenézer significa literalmente "Pedra de Ajuda", um memorial permanente da fidelidade de Deus.'
  },
  {
    id: 't10_b',
    category: 'teens',
    tier: 10,
    question: 'Em 1 Coríntios 13, das três grandes virtudes que permanecem (fé, esperança e amor), qual é categoricamente declarada como a maior?',
    options: ['A Fé', 'A Esperança', 'O Amor', 'A Sabedoria'],
    correctIndex: 2,
    biblicalReference: '1 Coríntios 13:13',
    explanation: 'O apóstolo conclui: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor".',
    curiosity: 'O amor divino (Ágape) é eterno porque o próprio Deus é amor em Sua essência.'
  },

  // =========================================================================
  // CATEGORIA 3: ADULTOS / GUERREIROS DA PALAVRA (ADULTS)
  // =========================================================================
  // Tier 1
  {
    id: 'a1_a',
    category: 'adults',
    tier: 1,
    question: 'Qual profeta teve a visão de um vale de ossos secos que foram revividos pelo sopro do Espírito do Senhor?',
    options: ['Isaías', 'Jeremias', 'Ezequiel', 'Oséias'],
    correctIndex: 2,
    biblicalReference: 'Ezequiel 37:1-14',
    explanation: 'O profeta profetizou ao vento e o fôlego da vida entrou nos ossos, erguendo um exército grandioso em representação da restauração de Israel.',
    curiosity: 'Ezequiel profetizava enquanto estava exilado na Babilônia junto ao rio Quebar.'
  },
  {
    id: 'a1_b',
    category: 'adults',
    tier: 1,
    question: 'Quantos anos durou o cativeiro de Judá na Babilônia conforme profetizado com precisão por Jeremias?',
    options: ['40 anos', '70 anos', '100 anos', '120 anos'],
    correctIndex: 1,
    biblicalReference: 'Jeremias 25:11-12 e Daniel 9:2',
    explanation: 'Jeremias profetizou que a terra ficaria desolada durante 70 anos sob a Babilônia antes do retorno.',
    curiosity: 'O profeta Daniel compreendeu pelos livros de Jeremias que o fim dos 70 anos havia chegado e começou a jejuar e orar.'
  },

  // Tier 2
  {
    id: 'a2_a',
    category: 'adults',
    tier: 2,
    question: 'Em Hebreus 11:1, qual é a definição canônica da fé?',
    options: [
      'Uma sensação mística do coração',
      'O firme fundamento das coisas que se esperam e a prova das coisas que se não veem',
      'O cumprimento mecânico de rituais religiosos',
      'A capacidade mental de imaginar coisas positivas'
    ],
    correctIndex: 1,
    biblicalReference: 'Hebreus 11:1',
    explanation: 'A fé bíblica não é especulação, mas a garantia sólida (substância) e a convicção do que Deus prometeu.',
    curiosity: 'A palavra grega para firme fundamento é "hypostasis", o título legal de garantia de uma propriedade.'
  },
  {
    id: 'a2_b',
    category: 'adults',
    tier: 2,
    question: 'No Tabernáculo do deserto, qual objeto sagrado ficava no Santo dos Santos atrás do véu?',
    options: ['A Menorá (Candelabro)', 'A Mesa dos Pães da Proposição', 'A Arca da Aliança', 'O Altar de Bronze'],
    correctIndex: 2,
    biblicalReference: 'Êxodo 25:10-22 e Hebreus 9:3-4',
    explanation: 'A Arca da Aliança coberta pelo propiciatório ficava no Santo dos Santos, onde o sumo sacerdote entrava uma vez ao ano no Yom Kippur.',
    curiosity: 'Dentro da Arca estavam as tábuas da Lei, um vaso com o maná e a vara de Arão que floresceu.'
  },

  // Tier 3
  {
    id: 'a3_a',
    category: 'adults',
    tier: 3,
    question: 'Qual rei de Judá viu o anjo do Senhor ferir 185 mil soldados assírios em uma só noite após estender as cartas no templo?',
    options: ['Josafá', 'Ezequias', 'Josias', 'Roboão'],
    correctIndex: 1,
    biblicalReference: '2 Reis 19:14-35',
    explanation: 'O rei Ezequias orou com fervor ao Senhor diante da ameaça de Senaqueribe e Deus enviou o Seu anjo para libertar Jerusalém.',
    curiosity: 'Ezequias também construiu o histórico aqueduto subterrâneo de água em Jerusalém que existe até os dias atuais.'
  },
  {
    id: 'a3_b',
    category: 'adults',
    tier: 3,
    question: 'Qual discípulo foi escolhido para substituir Judas Iscariotes no colégio dos doze apóstolos em Atos 1?',
    options: ['Barnabé', 'Matias', 'Estêvão', 'Silas'],
    correctIndex: 1,
    biblicalReference: 'Atos 1:23-26',
    explanation: 'Os apóstolos oraram pedindo a direção do Senhor sobre quem conhecia o coração de todos e a sorte caiu sobre Matias.',
    curiosity: 'O critério era ter acompanhado o ministério de Jesus desde o batismo de João até o dia de Sua ascensão.'
  },

  // Tier 4
  {
    id: 'a4_a',
    category: 'adults',
    tier: 4,
    question: 'Qual homem íntegro de Uz foi visitado por três amigos (Elifaz, Bildade e Zofar) após perder suas posses e filhos?',
    options: ['Jó', 'Boaz', 'Mardoqueu', 'Neemias'],
    correctIndex: 0,
    biblicalReference: 'Jó 2:11-13',
    explanation: 'Jó manteve sua lealdade a Deus proclamando: "O Senhor o deu, o Senhor o tomou; bendito seja o nome do Senhor".',
    curiosity: 'No desfecho do livro, Deus repreendeu os três amigos e deu a Jó em dobro tudo o que ele possuía antes.'
  },
  {
    id: 'a4_b',
    category: 'adults',
    tier: 4,
    question: 'Em Gálatas 5:22-23, quantas virtudes compõem a descrição do Fruto do Espírito?',
    options: ['7 virtudes', '9 virtudes', '10 virtudes', '12 virtudes'],
    correctIndex: 1,
    biblicalReference: 'Gálatas 5:22-23',
    explanation: 'São nove facetas: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão e domínio próprio.',
    curiosity: 'No original grego a palavra "fruto" (karpos) está no singular, indicando uma unidade integrada produzida pelo Espírito Santo.'
  },

  // Tier 5
  {
    id: 'a5_a',
    category: 'adults',
    tier: 5,
    question: 'Qual profeta confrontou corajosamente o rei Davi pelo seu pecado com a parábola da ovelhinha pobre?',
    options: ['Gade', 'Natã', 'Aías', 'Miqueias'],
    correctIndex: 1,
    biblicalReference: '2 Samuel 12:1-7',
    explanation: 'Natã declarou com firmeza ao rei: "Tu és este homem!", levando Davi ao profundo quebrantamento do Salmo 51.',
    curiosity: 'Davi não mandou prender o profeta, mas se prostrou com cinzas e jejum reconhecendo sua transgressão diante de Deus.'
  },
  {
    id: 'a5_b',
    category: 'adults',
    tier: 5,
    question: 'Em Efésios 2:8-9, como o apóstolo Paulo define a forma pela qual somos salvos?',
    options: [
      'Pelo mérito das nossas caridades humanas',
      'Pela graça, por meio da fé, sendo dom gratuito de Deus',
      'Pela descendência familiar de linhagem santa',
      'Pela compra de indulgências religiosas'
    ],
    correctIndex: 1,
    biblicalReference: 'Efésios 2:8-9',
    explanation: '"Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie."',
    curiosity: 'Esta passagem foi o pilar teológico da redescoberta bíblica da Reforma do século XVI.'
  },

  // Tier 6
  {
    id: 'a6_a',
    category: 'adults',
    tier: 6,
    question: 'Qual casal da igreja primitiva caiu morto aos pés do apóstolo Pedro por mentir ao Espírito Santo sobre o valor de um campo vendido?',
    options: ['Áquila e Priscila', 'Ananias e Safira', 'Zacarias e Isabel', 'Filipe e Eunice'],
    correctIndex: 1,
    biblicalReference: 'Atos 5:1-10',
    explanation: 'Pedro repreendeu Ananias dizendo: "Não mentiste aos homens, mas a Deus", e houve grande temor em toda a igreja.',
    curiosity: 'O pecado não foi reter parte do dinheiro, mas mentir fingindo que haviam ofertado a totalidade do valor.'
  },
  {
    id: 'a6_b',
    category: 'adults',
    tier: 6,
    question: 'Qual sacerdote e escriba conduziu o retorno de exilados a Jerusalém e leu a Lei diante de todo o povo reunido na praça?',
    options: ['Zorobabel', 'Esdras', 'Josué filho de Jozadaque', 'Neemias'],
    correctIndex: 1,
    biblicalReference: 'Esdras 7:6 e Neemias 8:1-3',
    explanation: 'Esdras preparou seu coração para buscar a Lei do Senhor, cumpri-la e ensiná-la em Israel.',
    curiosity: 'O povo ouviu a leitura da Palavra de Deus em pé desde a alvorada até o meio-dia, chorando e adorando.'
  },

  // Tier 7
  {
    id: 'a7_a',
    category: 'adults',
    tier: 7,
    question: 'Qual profeta foi engolido pela tristeza debaixo de um zimbro pedindo para si a morte, até que um anjo o tocou com pão e água?',
    options: ['Jeremias', 'Elias', 'Jonas', 'Habacuque'],
    correctIndex: 1,
    biblicalReference: '1 Reis 19:4-8',
    explanation: 'Após a vitória no Carmelo, ameaçado por Jezabel, Elias fugiu ao deserto; o anjo o alimentou duas vezes com pão cozido e botija de água.',
    curiosity: 'Com a força daquela comida dada pelo anjo, Elias caminhou 40 dias e 40 noites até Horebe, o monte de Deus.'
  },
  {
    id: 'a7_b',
    category: 'adults',
    tier: 7,
    question: 'Em 1 Coríntios 15, qual evento histórico é afirmado como a coluna central inegociável de toda a fé cristã?',
    options: [
      'A construção do templo de Salomão',
      'A ressurreição corporal de Jesus Cristo dentre os mortos',
      'A coroação do rei Davi em Hebrom',
      'A fuga para o Egito'
    ],
    correctIndex: 1,
    biblicalReference: '1 Coríntios 15:14-17',
    explanation: '"E, se Cristo não ressuscitou, logo é vã a nossa pregação, e também é vã a vossa fé... e ainda permaneceis nos vossos pecados."',
    curiosity: 'Paulo cita que Jesus ressurreto apareceu a mais de 500 irmãos de uma só vez, a maioria dos quais ainda vivia na época.'
  },

  // Tier 8
  {
    id: 'a8_a',
    category: 'adults',
    tier: 8,
    question: 'Qual rei piedoso de Judá removeu os altares idólatras, quebrou a serpente de bronze que havia se tornado ídolo e restaurou a Páscoa?',
    options: ['Ezequias', 'Asa', 'Josias', 'Jeú'],
    correctIndex: 0,
    biblicalReference: '2 Reis 18:4',
    explanation: 'A serpente de bronze feita por Moisés no deserto vinha sendo adorada como ídolo pelo povo e Ezequias a despedaçou chamando-a de "Neustã" (pedaço de bronze).',
    curiosity: 'Ezequias apegou-se ao Senhor de tal maneira que não se apartou Dele e o Senhor prosperou todos os seus caminhos.'
  },
  {
    id: 'a8_b',
    category: 'adults',
    tier: 8,
    question: 'O que o sumo sacerdote levava no peitoral sobre o seu coração ao entrar no santuário diante de Deus?',
    options: [
      'Doze pedras preciosas com os nomes gravados das doze tribos de Israel',
      'Apenas o rolo dos Dez Mandamentos',
      'Uma taça de prata com incenso',
      'Uma chave de ouro puro'
    ],
    correctIndex: 0,
    biblicalReference: 'Êxodo 28:21, 29',
    explanation: 'Arão levava os nomes dos filhos de Israel no peitoral do juízo sobre o coração como memorial contínuo perante o Senhor.',
    curiosity: 'No peitoral também ficavam o Urim e o Tumim, usados para consultar a vontade divina.'
  },

  // Tier 9
  {
    id: 'a9_a',
    category: 'adults',
    tier: 9,
    question: 'Qual apóstolo foi arrebatado até o terceiro céu em visões inefáveis das quais não lhe era lícito falar?',
    options: ['Pedro', 'Paulo', 'João', 'Tiago'],
    correctIndex: 1,
    biblicalReference: '2 Coríntios 12:2-4',
    explanation: 'Paulo relata sua experiência sublime no Paraíso e explica que, para não se ensoberbecer com as revelações, recebeu um espinho na carne.',
    curiosity: 'A resposta do Senhor à oração de Paulo foi: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza".'
  },
  {
    id: 'a9_b',
    category: 'adults',
    tier: 9,
    question: 'Em Atos 17, diante de qual tribunal ateniense o apóstolo Paulo pregou sobre o "Deus Desconhecido" aos filósofos epicureus e estóicos?',
    options: ['O Areópago', 'O Coliseu', 'O Sinédrio', 'A Basílica Romana'],
    correctIndex: 0,
    biblicalReference: 'Atos 17:19-23',
    explanation: 'No Areópago em Atenas, Paulo proclamou que Deus não habita em templos feitos por mãos humanas e anunciou o Cristo ressuscitado.',
    curiosity: 'Dionísio, o areopagita, e uma mulher chamada Dâmaris creram na mensagem após o discurso.'
  },

  // Tier 10
  {
    id: 'a10_a',
    category: 'adults',
    tier: 10,
    question: 'Em qual capítulo do livro do profeta Isaías é descrita a visão majestosa de Deus no Seu alto e sublime trono com os serafins clamando "Santo, Santo, Santo"?',
    options: ['Isaías 1', 'Isaías 6', 'Isaías 40', 'Isaías 53'],
    correctIndex: 1,
    biblicalReference: 'Isaías 6:1-3',
    explanation: 'No ano da morte do rei Uzias, Isaías viu o Senhor e foi purificado com uma brasa viva tirada do altar, respondendo: "Eis-me aqui, envia-me a mim".',
    curiosity: 'O clamor quádruplo/tríplice dos anjos é chamado de "Triságio" na tradição litúrgica e teológica.'
  },
  {
    id: 'a10_b',
    category: 'adults',
    tier: 10,
    question: 'Na epístola aos Hebreus capítulo 7, o sacerdócio eterno de Jesus Cristo é estabelecido segundo a ordem de qual personagem bíblico?',
    options: ['Arão', 'Melquisedeque', 'Levi', 'Zadoco'],
    correctIndex: 1,
    biblicalReference: 'Hebreus 7:1-17',
    explanation: 'Cristo não descende do sacerdócio levítico temporal, mas é Sumo Sacerdote eterno segundo a ordem superior de Melquisedeque, Rei de Justiça e Rei de Paz.',
    curiosity: 'Melquisedeque abençoou Abraão no vale de Savé no livro de Gênesis e recebeu dele o dízimo de tudo.'
  },

  // =========================================================================
  // CATEGORIA 4: MESTRES / TEÓLOGOS DAS ESCRITURAS (MASTERS)
  // =========================================================================
  // Tier 1
  {
    id: 'm1_a',
    category: 'masters',
    tier: 1,
    question: 'Qual é o versículo bíblico mais curto do Novo Testamento em língua portuguesa?',
    options: ['Orai sem cessar (1 Ts 5:17)', 'Jesus chorou (Jo 11:35)', 'Deus é amor (1 Jo 4:8)', 'Vigiai e orai (Mc 14:38)'],
    correctIndex: 1,
    biblicalReference: 'João 11:35',
    explanation: 'João 11:35 possui apenas duas palavras: "Jesus chorou". Expressa a profunda compaixão e humanidade do Messias perante a dor de Marta e Maria.',
    curiosity: 'No original grego, 1 Tessalonicenses 5:16 tem menos caracteres, mas na tradução em língua portuguesa João 11:35 é o mais conciso.'
  },
  {
    id: 'm1_b',
    category: 'masters',
    tier: 1,
    question: 'Em Gênesis 14, qual rei de Salém e sacerdote do Deus Altíssimo trouxe pão e vinho e abençoou o patriarca Abrão?',
    options: ['Jetro', 'Melquisedeque', 'Abimeleque', 'Potífera'],
    correctIndex: 1,
    biblicalReference: 'Gênesis 14:18-20',
    explanation: 'Melquisedeque (Rei de Justiça) era rei de Salém (Paz) e recebeu o dízimo dos despojos da batalha dada por Deus a Abraão.',
    curiosity: 'Salém foi a antiga fortaleza que mais tarde se tornou a cidade santa de Jerusalém.'
  },

  // Tier 2
  {
    id: 'm2_a',
    category: 'masters',
    tier: 2,
    question: 'Nas sete cartas às igrejas da Ásia em Apocalipse 2 e 3, quais são as duas únicas congregações que NÃO receberam repreensão do Senhor?',
    options: ['Éfeso e Laodiceia', 'Esmirna e Filadélfia', 'Pérgamo e Tiatira', 'Sardes e Esmirna'],
    correctIndex: 1,
    biblicalReference: 'Apocalipse 2:8-11 e 3:7-13',
    explanation: 'Esmirna (a igreja sob perseguição e martírio) e Filadélfia (a igreja da porta aberta e do amor fraternal) receberam apenas palavras de encorajamento e promessas de galardão.',
    curiosity: 'Em contraste severo, Laodiceia foi chamada de morna e não recebeu nenhum elogio do Salvador.'
  },
  {
    id: 'm2_b',
    category: 'masters',
    tier: 2,
    question: 'O que estava gravado na lâmina de ouro puro na mitra do Sumo Sacerdote de Israel?',
    options: ['SENHOR DOS EXÉRCITOS', 'SANTIDADE AO SENHOR', 'JUSTIÇA E PAZ', 'DEUS DE ABRAÃO'],
    correctIndex: 1,
    biblicalReference: 'Êxodo 28:36',
    explanation: 'A lâmina de ouro levava a gravação sagrada "Qodesh l’Adonai" ("Santidade ao Senhor"), lembrando a pureza solene exigida para estar diante do Eterno.',
    curiosity: 'A lâmina ficava constantemente na testa de Arão para que as ofertas de Israel fossem aceitáveis diante de Deus.'
  },

  // Tier 3
  {
    id: 'm3_a',
    category: 'masters',
    tier: 3,
    question: 'Em 1 Reis 18, em qual monte o profeta Elias desafiou os 450 profetas de Baal e o fogo celestial consumiu o holocausto?',
    options: ['Monte Sinai', 'Monte Carmelo', 'Monte Hermom', 'Monte Nebo'],
    correctIndex: 1,
    biblicalReference: '1 Reis 18:19-39',
    explanation: 'No Carmelo, Elias restaurou o altar de 12 pedras, encharcou o sacrifício com água e orou; o fogo do Senhor desceu e consumiu até o pó.',
    curiosity: 'Ao presenciarem o fogo divino, todo o povo caiu com o rosto em terra e clamou: "O Senhor é Deus! O Senhor é Deus!".'
  },
  {
    id: 'm3_b',
    category: 'masters',
    tier: 3,
    question: 'Qual o significado do termo aramaico "Maranata" usado pelo apóstolo Paulo no encerramento de 1 Coríntios?',
    options: ['Deus é poderoso', 'Vem, Senhor nosso!', 'A paz seja convosco', 'Glória nas maiores alturas'],
    correctIndex: 1,
    biblicalReference: '1 Coríntios 16:22',
    explanation: '"Maranatha" é uma aclamação em aramaico da igreja primitiva que clama com ardente expectativa: "Nosso Senhor vem!" ou "Vem, Senhor nosso!".',
    curiosity: 'Funcionava como uma senha de esperança e encorajamento entre os cristãos perseguidos no Império Romano.'
  },

  // Tier 4
  {
    id: 'm4_a',
    category: 'masters',
    tier: 4,
    question: 'Qual governante romano lavou as mãos em público diante da multidão, declarando-se inocente do sangue de Jesus?',
    options: ['Herodes Antipas', 'Pôncio Pilatos', 'Félix', 'Festo'],
    correctIndex: 1,
    biblicalReference: 'Mateus 27:24',
    explanation: 'Pilatos tomou água e lavou as mãos dizendo: "Estou inocente do sangue deste justo", mas cedeu à pressão e entregou Jesus para ser crucificado.',
    curiosity: 'A esposa de Pilatos havia enviado um recado para que ele não se envolvesse com "aquele justo" por causa de um sonho perturbador.'
  },
  {
    id: 'm4_b',
    category: 'masters',
    tier: 4,
    question: 'Em Isaías 53, como o Messias servo sofredor é descrito em Sua morte vicária por nossos pecados?',
    options: [
      'Como um rei guerreiro empunhando espada dourada',
      'Como um cordeiro que é levado ao matadouro e como a ovelha muda perante os seus tosquiadores',
      'Como um juiz implacável banindo os ímpios',
      'Como um general celeste à frente de carruagens'
    ],
    correctIndex: 1,
    biblicalReference: 'Isaías 53:7',
    explanation: 'O texto profetizou com 700 anos de antecedência a humilhação pacífica, submissa e expiatória do Cordeiro de Deus na cruz do Calvário.',
    curiosity: 'Era exatamente este trecho de Isaías que o eunuco etíope lia em sua carruagem quando o evangelista Filipe se aproximou em Atos 8.'
  },

  // Tier 5
  {
    id: 'm5_a',
    category: 'masters',
    tier: 5,
    question: 'Na estátua profética do sonho de Nabucodonosor interpretada por Daniel (capítulo 2), o que representa a cabeça de ouro puro?',
    options: ['O Império Medo-Persa', 'O Império Babilônico', 'O Império Grego de Alexandre', 'O Império Romano'],
    correctIndex: 1,
    biblicalReference: 'Daniel 2:37-38',
    explanation: 'Daniel declarou ao rei: "Tu és a cabeça de ouro", representando o esplendor e a soberania do Império Neobabilônico.',
    curiosity: 'A prata representava a Medo-Pérsia, o bronze a Grécia, o ferro Roma, e a rocha que esmiuçou tudo é o Reino eterno de Cristo.'
  },
  {
    id: 'm5_b',
    category: 'masters',
    tier: 5,
    question: 'Qual profeta menor é o único cuja profecia é inteiramente dirigida contra a soberba e crueldade de Edom?',
    options: ['Naum', 'Obadias', 'Habacuque', 'Ageu'],
    correctIndex: 1,
    biblicalReference: 'Obadias 1:1-4',
    explanation: 'Obadias, o livro mais curto do Antigo Testamento com apenas um capítulo, denuncia Edom por habitar nas fendas das rochas e tripudiar sobre Judá.',
    curiosity: 'Os edomitas eram descendentes biológicos de Esaú, irmão gêmeo de Jacó.'
  },

  // Tier 6
  {
    id: 'm6_a',
    category: 'masters',
    tier: 6,
    question: 'Em qual capítulo de João se encontra a Oração Sacerdotal de Jesus, onde Ele intercede pela unidade e santificação dos discípulos?',
    options: ['João 14', 'João 15', 'João 16', 'João 17'],
    correctIndex: 3,
    biblicalReference: 'João 17:1-26',
    explanation: 'João 17 registra a oração mais profunda de Jesus ao Pai antes de Sua paixão no Getsêmani, orando por todos aqueles que haveriam de crer por meio da Palavra.',
    curiosity: 'Jesus rogou: "Santifica-os na verdade; a tua palavra é a verdade".'
  },
  {
    id: 'm6_b',
    category: 'masters',
    tier: 6,
    question: 'Qual termo teológico grego empregado em Filipenses 2:7 descreve o ato pelo qual o Filho eterno "esvaziou-se a si mesmo", assumindo a forma de servo?',
    options: ['Theotokos', 'Kenosis', 'Homooúsios', 'Parakletos'],
    correctIndex: 1,
    biblicalReference: 'Filipenses 2:7',
    explanation: '"Kenosis" (esvaziamento) refere-se a Cristo não se apegar aos Seus privilégios divinos visíveis e humilhar-Se até a morte e morte de cruz.',
    curiosity: 'Por isso Deus O exaltou soberanamente e Lhe deu o Nome que está acima de todo nome.'
  },

  // Tier 7
  {
    id: 'm7_a',
    category: 'masters',
    tier: 7,
    question: 'Nas visões do livro de Zacarias capítulo 3, o que é tirado do sumo sacerdote Josué e o que é colocado sobre ele?',
    options: [
      'São tiradas as vestes sacerdotais e colocado um cetro de ferro',
      'São tiradas as vestes imundas e colocadas vestes festivas e uma mitra limpa',
      'É tirado o calçado e posta uma coroa de prata',
      'É tirado o escudo e colocado o peitoral de bronze'
    ],
    correctIndex: 1,
    biblicalReference: 'Zacarias 3:3-5',
    explanation: 'Josué estava diante do anjo com vestes manchadas enquanto Satanás o acusava; o Senhor repreendeu o acusador e outorgou a Josué vestes limpas e justas.',
    curiosity: 'Esta cena é um quadro profético magnífico da justificação graciosa onde Deus remove nossos pecados e nos veste com a justiça de Cristo.'
  },
  {
    id: 'm7_b',
    category: 'masters',
    tier: 7,
    question: 'Qual termo grego no Evangelho de João 1:1 é utilizado para designar a Jesus como a Palavra eterna e criadora pré-existente?',
    options: ['Rhema', 'Logos', 'Gnosis', 'Pneuma'],
    correctIndex: 1,
    biblicalReference: 'João 1:1-3',
    explanation: '"No princípio era o Verbo (Logos), e o Verbo estava com Deus, e o Verbo era Deus. Todas as coisas foram feitas por meio dele."',
    curiosity: 'O conceito de Logos unia a mente grega (razão ordenadora do cosmos) com a revelação hebraica (a Palavra ativa do Criador).'
  },

  // Tier 8
  {
    id: 'm8_a',
    category: 'masters',
    tier: 8,
    question: 'Em Levítico 16, no Dia da Expiação (Yom Kippur), o que era feito com o segundo bode chamado "bode emissário" (Azazel)?',
    options: [
      'Era sacrificado no altar do pátio e suas cinzas espalhadas',
      'O sumo sacerdote confessava sobre sua cabeça os pecados do povo e ele era enviado vivo para o deserto',
      'Era guardado no tabernáculo durante sete dias',
      'Era doado aos pobres da congregação'
    ],
    correctIndex: 1,
    biblicalReference: 'Levítico 16:21-22',
    explanation: 'O bode levava sobre si simbolicamente as iniquidades do povo para uma terra solitária, tipificando o perdão completo em que Deus afasta de nós as nossas transgressões.',
    curiosity: 'O primeiro bode era sacrificado para purificação do santuário; o segundo era solto vivo, demonstrando a remoção do pecado.'
  },
  {
    id: 'm8_b',
    category: 'masters',
    tier: 8,
    question: 'Qual apóstolo escreveu a famosa epístola doutrinária que refuta as heresias do docetismo e do gnosticismo incipiente, afirmando que "o Verbo se fez carne"?',
    options: ['Apóstolo Paulo', 'Apóstolo Pedro', 'Apóstolo João', 'Apóstolo Judas'],
    correctIndex: 2,
    biblicalReference: '1 João 4:2-3 e 2 João 1:7',
    explanation: 'João enfatiza com veemência que todo espírito que confessa que Jesus Cristo veio em carne é de Deus, refutando os que negavam a verdadeira humanidade de Cristo.',
    curiosity: 'O gnosticismo primitivo ensinava que a matéria era má e por isso Cristo não poderia ter tido um corpo humano real, erro severamente combatido por João.'
  },

  // Tier 9
  {
    id: 'm9_a',
    category: 'masters',
    tier: 9,
    question: 'Na profecia das Setenta Semanas de Daniel capítulo 9, a partir de qual decreto se inicia a contagem cronológica messiânica?',
    options: [
      'O decreto de Ciro autorizando o primeiro retorno',
      'A ordem para restaurar e edificar Jerusalém',
      'A inauguração do Templo de Zorobabel',
      'A vitória dos Macabeus'
    ],
    correctIndex: 1,
    biblicalReference: 'Daniel 9:25',
    explanation: '"Sabe e entende: desde a saída da ordem para restaurar e para edificar Jerusalém, até ao Ungido, ao Príncipe, sete semanas e sessenta e duas semanas."',
    curiosity: 'Este texto profético previa o ano exato da manifestação pública e da morte do Messias na história humana.'
  },
  {
    id: 'm9_b',
    category: 'masters',
    tier: 9,
    question: 'Qual termo bíblico hebraico designa a tampa da Arca da Aliança, onde o sangue da expiação era aspergido entre os dois querubins de ouro?',
    options: ['Kapporeth (Propiciatório)', 'Menorá', 'Mizbeach', 'Parokhet'],
    correctIndex: 0,
    biblicalReference: 'Êxodo 25:17-22 e Romanos 3:25',
    explanation: 'O "Kapporeth" era o local sagrado da expiação e da manifestação da Shekinah, tipificando Cristo como nossa propiciação definitiva.',
    curiosity: 'A raiz hebraica "K-P-R" significa cobrir, reconciliar e purificar a culpa do pecado.'
  },

  // Tier 10
  {
    id: 'm10_a',
    category: 'masters',
    tier: 10,
    question: 'Em Apocalipse 22:16, qual sublime título messiânico Jesus atribui a Si mesmo no último capítulo de toda a Bíblia?',
    options: [
      'A Estrela do Oriente e o Sol do Meio-Dia',
      'A Raiz e a Geração de Davi, a Resplandecente Estrela da Manhã',
      'O Arcanjo Soberano e o Guarda do Éden',
      'O Conquistador de Babilônia e o Juiz de Tiro'
    ],
    correctIndex: 1,
    biblicalReference: 'Apocalipse 22:16',
    explanation: '"Eu, Jesus, enviei o meu anjo para vos testificar estas coisas às igrejas. Eu sou a Raiz e a Geração de Davi, a resplandecente Estrela da Manhã."',
    curiosity: 'A Estrela da Manhã surge no momento mais escuro que antecede a aurora, anunciando a chegada irrevogável do dia eterno de Deus.'
  },
  {
    id: 'm10_b',
    category: 'masters',
    tier: 10,
    question: 'Qual profeta do Antigo Testamento teve visões de querubins com quatro faces (leão, boi, homem e águia) sob uma plataforma de cristal reluzente?',
    options: ['Isaías', 'Ezequiel', 'Daniel', 'Zacarias'],
    correctIndex: 1,
    biblicalReference: 'Ezequiel 1:5-10',
    explanation: 'Ezequiel contemplou as quatro faces dos seres viventes, que a tradição cristã primitiva associou simbolicamente aos quatro Evangelhos de Cristo.',
    curiosity: 'O leão (Mateus: o Rei), o boi (Marcos: o Servo), o homem (Lucas: o Filho do Homem) e a águia (João: o Filho divino de Deus).'
  }
];

// =========================================================================
// SISTEMA ANTI-REPETIÇÃO INTELIGENTE COM PERSISTÊNCIA LOCAL
// =========================================================================
const SEEN_QUESTIONS_KEY_PREFIX = 'quiz_seen_questions_v2_';

export function getSeenQuestionIds(category: AgeCategory): string[] {
  try {
    const raw = localStorage.getItem(`${SEEN_QUESTIONS_KEY_PREFIX}${category}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markQuestionsAsSeen(category: AgeCategory, ids: string[]): void {
  try {
    const seen = getSeenQuestionIds(category);
    const updated = Array.from(new Set([...seen, ...ids]));
    localStorage.setItem(`${SEEN_QUESTIONS_KEY_PREFIX}${category}`, JSON.stringify(updated));
  } catch {
    // Ignore storage issues
  }
}

export function resetSeenQuestions(category: AgeCategory): void {
  try {
    localStorage.removeItem(`${SEEN_QUESTIONS_KEY_PREFIX}${category}`);
  } catch {
    // Ignore
  }
}

export function getQuestionsForMatch(category: AgeCategory): Question[] {
  const categoryQuestions = BIBLE_QUESTIONS.filter(q => q.category === category);
  const seenIds = new Set(getSeenQuestionIds(category));

  const ladderQuestions: Question[] = [];
  const newlyPickedIds: string[] = [];

  for (let tier = 1; tier <= 10; tier++) {
    const questionsAtTier = categoryQuestions.filter(q => q.tier === tier);
    if (questionsAtTier.length === 0) continue;

    // Filter out previously seen questions for this tier
    const unseenAtTier = questionsAtTier.filter(q => !seenIds.has(q.id));

    let chosen: Question;
    if (unseenAtTier.length > 0) {
      // Pick randomly from unseen
      chosen = unseenAtTier[Math.floor(Math.random() * unseenAtTier.length)];
    } else {
      // All questions in this tier have been seen!
      // Recycle: pick randomly from all questions of this tier
      chosen = questionsAtTier[Math.floor(Math.random() * questionsAtTier.length)];
      // Remove this question from seen so the cycle refreshes
      seenIds.delete(chosen.id);
    }

    ladderQuestions.push(chosen);
    newlyPickedIds.push(chosen.id);
    seenIds.add(chosen.id);
  }

  // Persist newly picked questions as seen
  markQuestionsAsSeen(category, newlyPickedIds);

  return ladderQuestions;
}

export function getAlternateQuestion(category: AgeCategory, tier: number, currentId: string): Question {
  const seenIds = new Set(getSeenQuestionIds(category));
  const tierQuestions = BIBLE_QUESTIONS.filter(q => q.category === category && q.tier === tier && q.id !== currentId);

  // Prefer unseen alternative
  const unseenAlt = tierQuestions.filter(q => !seenIds.has(q.id));
  if (unseenAlt.length > 0) {
    const chosen = unseenAlt[Math.floor(Math.random() * unseenAlt.length)];
    markQuestionsAsSeen(category, [chosen.id]);
    return chosen;
  }

  // Fallback to any alternative at this tier
  if (tierQuestions.length > 0) {
    const chosen = tierQuestions[Math.floor(Math.random() * tierQuestions.length)];
    return chosen;
  }

  // Extreme fallback across entire database
  const anyOther = BIBLE_QUESTIONS.filter(q => q.id !== currentId);
  return anyOther[Math.floor(Math.random() * anyOther.length)];
}

export function getTotalQuestionsStats(): { total: number; byCategory: Record<AgeCategory, number> } {
  const byCategory: Record<AgeCategory, number> = {
    kids: 0,
    teens: 0,
    adults: 0,
    masters: 0
  };

  BIBLE_QUESTIONS.forEach(q => {
    byCategory[q.category] = (byCategory[q.category] || 0) + 1;
  });

  return {
    total: BIBLE_QUESTIONS.length,
    byCategory
  };
}
