import Dart from '@/components/technologies/Dart';
import Flutter from '@/components/technologies/Flutter';
import JavaScript from '@/components/technologies/JavaScript';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'American Express',
    position: 'SDE II (current) | SDE I | Intern',
    location: 'Bengaluru, Karnataka, India',
    image: '/company/amex.svg',
    description: [
      'Building and maintaining enterprise-scale software systems.',
      'Collaborating with cross-functional teams to deliver reliable, performant solutions.',
      'Working across backend services and frontend interfaces.',
    ],
    startDate: 'Jan 2024',
    endDate: 'Present',
    technologies: [
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
    ],
    website: 'https://www.americanexpress.com',
    linkedin: 'https://www.linkedin.com/company/american-express',
  },

  {
    isCurrent: false,
    company: 'takeUforward',
    position: 'Technical Content Writer',
    location: 'Remote',
    image: '/company/takeuforward.png',
    description: [
      'Wrote technical content on data structures, algorithms, and programming concepts.',
      'Created educational material for the competitive programming community.',
    ],
    startDate: 'Feb 2023',
    endDate: 'Apr 2023',
    technologies: [
      {
        name: 'JavaScript',
        href: 'https://javascript.com/',
        icon: <JavaScript />,
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        icon: <TypeScript />,
      },
    ],
    website: 'https://takeuforward.org',
  },
  {
    isCurrent: false,
    company: 'Shaderbytes',
    position: 'Junior Flutter Developer',
    location: 'Remote',
    image: '/company/shaderbytes.png',
    description: [
      'Developed mobile applications using Flutter and Dart.',
      'Built and maintained cross-platform mobile features.',
    ],
    startDate: 'May 2022',
    endDate: 'Nov 2022',
    technologies: [
      {
        name: 'Dart',
        href: 'https://dart.dev/',
        icon: <Dart />,
      },
      {
        name: 'Flutter',
        href: 'https://flutter.dev/',
        icon: <Flutter />,
      },
    ],
    website: '#',
  },
  {
    isCurrent: false,
    company: 'Bluewitcher',
    position: 'Mobile Application Developer',
    location: 'Remote',
    image: '/company/bluewitcher.png',
    description: [
      'Built mobile applications with Flutter.',
      'Worked on app features and UI implementation.',
    ],
    startDate: 'Apr 2021',
    endDate: 'Jun 2021',
    technologies: [
      {
        name: 'Dart',
        href: 'https://dart.dev/',
        icon: <Dart />,
      },
      {
        name: 'Flutter',
        href: 'https://flutter.dev/',
        icon: <Flutter />,
      },
    ],
    website: '#',
  },
  {
    isCurrent: false,
    company: 'Bottom Street',
    position: 'Application Developer',
    location: 'Remote',
    image: '/company/bottom-street.png',
    description: [
      'Developed mobile and web applications for clients.',
      'Worked remotely across the full development lifecycle.',
    ],
    startDate: 'Nov 2020',
    endDate: 'May 2021',
    technologies: [
      {
        name: 'Dart',
        href: 'https://dart.dev/',
        icon: <Dart />,
      },
      {
        name: 'Flutter',
        href: 'https://flutter.dev/',
        icon: <Flutter />,
      },
      {
        name: 'JavaScript',
        href: 'https://javascript.com/',
        icon: <JavaScript />,
      },
    ],
    website: '#',
  },
];
