import {
  Brain,
  CalendarHeart,
  Heart,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sprout,
  SunMedium,
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
  tagline: '🌿 Escuta, acolhimento e cuidado',
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
    title: 'Reconhecer dificuldades',
    summary: 'Exploramos emoções, crenças e padrões que pesam na sua rotina.',
    detail:
      'Nomear dores, bloqueios e repetições ajuda a construir escolhas mais conscientes e menos automáticas.',
    icon: SunMedium,
  },
  {
    title: 'Renovar e crescer',
    summary: 'Fortalecemos possibilidades para uma vida com mais sentido e equilíbrio.',
    detail:
      'O processo terapêutico abre espaço para autonomia, autoestima e relações mais saudáveis.',
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
