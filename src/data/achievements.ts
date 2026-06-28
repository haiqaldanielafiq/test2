import { Achievement } from '@/types/user';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'math-hero',
    title: 'Wira Matematik',
    description: 'Selesaikan Level 1 dengan sempurna.',
    icon: '🏆',
  },
  {
    id: 'money-master',
    title: 'Jaguh Wang',
    description: 'Selesaikan semua Level 1-5.',
    icon: '💰',
  },
  {
    id: 'fast-thinker',
    title: 'Pemikir Pantas',
    description: 'Selesaikan level dengan baki masa lebih 2 minit.',
    icon: '⚡',
  },
  {
    id: 'perfect-player',
    title: 'Pemain Sempurna',
    description: 'Selesaikan level tanpa kehilangan nyawa.',
    icon: '🌟',
  },
  {
    id: 'coin-collector',
    title: 'Pengumpul Syiling',
    description: 'Kumpul jumlah 100 syiling.',
    icon: '🪙',
  },
];
