import {
  Brain,
  CalendarHeart,
  Compass,
  Heart,
  Leaf,
  MessageCircle,
  Search,
  ShieldCheck,
  Sprout,
  SunMedium,
  Target,
} from 'lucide-react';

export const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'Abordagem', href: '#abordagem' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
];

export const contactInfo = {
  phoneLabel: '+55 35 99884-8410',
  phoneHref: 'tel:+5535998848410',
  instagramUrl: 'https://www.instagram.com/psithaislage',
};

export const whatsappUrl =
  'https://wa.me/5535998848410?text=Ol%C3%A1%2C%20Tha%C3%ADs.%20Gostaria%20de%20agendar%20minha%20primeira%20sess%C3%A3o.';

export const professionalInfo = {
  crp: 'CRP/MG - 04/85600',
  approach: 'Terapia Cognitivo-Comportamental',
};

export const approachSteps = [
  {
    title: 'Acolher e escutar',
    summary: 'Um espaço seguro para falar, sentir e ser compreendida sem julgamentos.',
    detail:
      'A escuta clínica organiza o que parece confuso e cria um ponto de partida mais gentil para olhar para si.',
    icon: Heart,
  },
  {
    title: 'Compreender emoções',
    summary: 'Damos nome ao que você sente e entendemos como as emoções aparecem na sua rotina.',
    detail:
      'Compreender as emoções reduz a sensação de confusão e ajuda a reconhecer necessidades importantes. Juntas, observamos os sinais do corpo, os pensamentos e as situações que despertam cada sentimento.',
    icon: SunMedium,
  },
  {
    title: 'Identificar padrões',
    summary: 'Observamos crenças, hábitos e repetições que influenciam escolhas e relacionamentos.',
    detail:
      'Alguns padrões se repetem de forma automática e podem manter sofrimentos por muito tempo. Identificá-los permite entender de onde vêm, como funcionam e quais caminhos podem ser construídos de maneira diferente.',
    icon: Search,
  },
  {
    title: 'Definir caminhos',
    summary: 'Transformamos necessidades em objetivos possíveis, claros e conectados com a sua realidade.',
    detail:
      'A terapia também é um espaço para organizar prioridades e decidir quais mudanças fazem sentido agora. Os objetivos são construídos em conjunto, respeitando sua história, seus limites e o momento que você está vivendo.',
    icon: Compass,
  },
  {
    title: 'Construir estratégias',
    summary: 'Desenvolvemos recursos práticos para enfrentar desafios com mais consciência e equilíbrio.',
    detail:
      'A partir do que foi compreendido, construímos estratégias aplicáveis ao cotidiano. Elas podem envolver novas formas de responder aos pensamentos, regular emoções, estabelecer limites e lidar com situações difíceis.',
    icon: Target,
  },
  {
    title: 'Fortalecer autonomia',
    summary: 'Consolidamos aprendizados para que você confie mais em si e nas próprias escolhas.',
    detail:
      'O processo terapêutico busca ampliar sua autonomia, não criar dependência. Com o tempo, você passa a reconhecer seus recursos, tomar decisões mais alinhadas aos seus valores e enfrentar desafios com maior segurança.',
    icon: Sprout,
  },
];

export const services = [
  {
    title: 'Ansiedade e estresse',
    description: 'Estratégias para lidar com preocupações excessivas, esgotamento e sobrecarga.',
    icon: Brain,
  },
  {
    title: 'Autoestima e autoconfiança',
    description: 'Fortalecimento da sua autoimagem, autovalor e relação consigo mesma.',
    icon: Heart,
  },
  {
    title: 'Desenvolvimento pessoal',
    description: 'Autoconhecimento, clareza de propósito e construção de uma vida com sentido.',
    icon: Leaf,
  },
  {
    title: 'Relacionamentos',
    description: 'Compreensão de padrões relacionais e construção de vínculos mais saudáveis.',
    icon: MessageCircle,
  },
];

export const trustPoints = [
  { label: 'Ambiente seguro, sigiloso e acolhedor.', icon: ShieldCheck },
  { label: 'Terapia Cognitivo-Comportamental.', icon: Brain },
  { label: 'Atendimento online ou presencial.', icon: CalendarHeart },
];
