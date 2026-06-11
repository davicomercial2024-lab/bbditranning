export type LessonType = "video" | "pdf" | "audio" | "text";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  // for video: url (youtube/vimeo embed); pdf: url; audio: url; text: html/markdown
  source: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Training {
  id: string;
  title: string;
  category: string;
  department?: string;
  description: string;
  cover: string; // gradient class
  totalLessons: number;
  completedLessons: number;
  modules: Module[];
}

export const trainings: Training[] = [
  {
    id: "onboarding-bbdi",
    title: "Onboarding BBDI",
    category: "Integração",
    description: "Conheça a história, valores e estrutura organizacional da BBDI antes de começar suas atividades.",
    cover: "from-emerald-500/40 to-teal-700/30",
    totalLessons: 6,
    completedLessons: 4,
    modules: [
      {
        id: "m1",
        title: "Bem-vindo à BBDI",
        lessons: [
          { id: "l1", title: "Mensagem da diretoria", type: "video", duration: "08:12", source: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: true },
          { id: "l2", title: "Nossa história", type: "text", duration: "5 min", source: "<h2>Nossa história</h2><p>A BBDI foi fundada com o propósito de transformar a forma como equipes operam...</p><p>Ao longo de mais de uma década, expandimos atuação em diversos setores.</p>", completed: true },
          { id: "l3", title: "Manual do colaborador", type: "pdf", duration: "12 págs", source: "https://www.africau.edu/images/default/sample.pdf", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Cultura e valores",
        lessons: [
          { id: "l4", title: "Os 5 pilares culturais", type: "video", duration: "14:30", source: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: true },
          { id: "l5", title: "Podcast: conversa com fundadores", type: "audio", duration: "22:10", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
          { id: "l6", title: "Código de conduta", type: "pdf", duration: "8 págs", source: "https://www.africau.edu/images/default/sample.pdf" },
        ],
      },
    ],
  },
  {
    id: "atendimento-cliente",
    title: "Atendimento ao Cliente",
    category: "Soft skills",
    description: "Princípios e técnicas para um atendimento humanizado e eficiente em todos os canais.",
    cover: "from-sky-500/40 to-indigo-700/30",
    totalLessons: 8,
    completedLessons: 2,
    modules: [
      {
        id: "m1",
        title: "Fundamentos",
        lessons: [
          { id: "l1", title: "Escuta ativa", type: "video", duration: "11:05", source: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: true },
          { id: "l2", title: "Empatia na prática", type: "text", duration: "6 min", source: "<h2>Empatia na prática</h2><p>Empatia começa por suspender julgamentos...</p>", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Casos reais",
        lessons: [
          { id: "l3", title: "Estudo de caso #1", type: "audio", duration: "18:42", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          { id: "l4", title: "Estudo de caso #2", type: "audio", duration: "15:20", source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
        ],
      },
    ],
  },
  {
    id: "seguranca-informacao",
    title: "Segurança da Informação",
    category: "Compliance",
    description: "Boas práticas de segurança, LGPD e prevenção a vazamentos de dados no dia a dia.",
    cover: "from-amber-500/40 to-orange-700/30",
    totalLessons: 5,
    completedLessons: 0,
    modules: [
      {
        id: "m1",
        title: "Conceitos",
        lessons: [
          { id: "l1", title: "Panorama de ameaças", type: "video", duration: "09:50", source: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l2", title: "LGPD em 10 minutos", type: "pdf", duration: "10 págs", source: "https://www.africau.edu/images/default/sample.pdf" },
          { id: "l3", title: "Política interna", type: "text", duration: "4 min", source: "<h2>Política interna</h2><p>Toda credencial é pessoal e intransferível...</p>" },
        ],
      },
    ],
  },
  {
    id: "ferramentas-internas",
    title: "Ferramentas Internas",
    category: "Operacional",
    description: "Tour pelas ferramentas usadas diariamente: ERP, CRM e plataforma de comunicação.",
    cover: "from-violet-500/40 to-fuchsia-700/30",
    totalLessons: 7,
    completedLessons: 7,
    modules: [
      {
        id: "m1",
        title: "ERP",
        lessons: [
          { id: "l1", title: "Login e navegação", type: "video", duration: "06:22", source: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: true },
        ],
      },
    ],
  },
];

export const students = [
  { id: "u1", name: "Ana Carolina", email: "ana@bbdi.com", department: "Operações", progress: 78, lastActive: "Há 2h", trainings: 4, completed: 3 },
  { id: "u2", name: "Bruno Lima", email: "bruno@bbdi.com", department: "Comercial", progress: 42, lastActive: "Há 1 dia", trainings: 4, completed: 1 },
  { id: "u3", name: "Camila Souza", email: "camila@bbdi.com", department: "Atendimento", progress: 95, lastActive: "Há 30 min", trainings: 4, completed: 4 },
  { id: "u4", name: "Diego Martins", email: "diego@bbdi.com", department: "TI", progress: 12, lastActive: "Há 5 dias", trainings: 4, completed: 0 },
  { id: "u5", name: "Elaine Pires", email: "elaine@bbdi.com", department: "RH", progress: 64, lastActive: "Há 4h", trainings: 4, completed: 2 },
  { id: "u6", name: "Felipe Andrade", email: "felipe@bbdi.com", department: "Financeiro", progress: 33, lastActive: "Há 2 dias", trainings: 4, completed: 1 },
];

export const activity = [
  { id: "a1", user: "Camila Souza", action: "concluiu", target: "Atendimento ao Cliente · Empatia na prática", time: "há 12 min" },
  { id: "a2", user: "Ana Carolina", action: "iniciou", target: "Segurança da Informação", time: "há 1h" },
  { id: "a3", user: "Bruno Lima", action: "concluiu", target: "Onboarding BBDI · Manual do colaborador", time: "há 3h" },
  { id: "a4", user: "Elaine Pires", action: "comentou em", target: "Ferramentas Internas · ERP", time: "há 5h" },
];
