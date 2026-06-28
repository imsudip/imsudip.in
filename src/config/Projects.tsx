import Chrome from '@/components/technologies/Chrome';
import Dart from '@/components/technologies/Dart';
import Docker from '@/components/technologies/Docker';
import Flutter from '@/components/technologies/Flutter';
import JavaScript from '@/components/technologies/JavaScript';
import Jupyter from '@/components/technologies/Jupyter';
import NodeJs from '@/components/technologies/NodeJs';
import Python from '@/components/technologies/Python';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'CompareGo',
    description:
      'Price comparison across e-commerce websites with sentiment analysis on user reviews',
    image: '/project/comparego.png',
    link: 'https://github.com/imsudip/CompareGo',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Jupyter', icon: <Jupyter key="jupyter" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
    ],
    github: 'https://github.com/imsudip/CompareGo',
    live: 'https://github.com/imsudip/CompareGo',
    details: true,
    projectDetailsPageSlug: '/projects/comparego',
    isWorking: false,
  },
  {
    title: 'Whisker',
    description: 'Whisper-powered speech-to-text input Chrome extension',
    image: '/project/whisker.png',
    link: 'https://imsudip.github.io/Whisker/',
    technologies: [
      { name: 'Chrome', icon: <Chrome key="chrome" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
    ],
    github: 'https://github.com/imsudip/Whisker',
    live: 'https://imsudip.github.io/Whisker/',
    details: true,
    projectDetailsPageSlug: '/projects/whisker',
    isWorking: true,
  },
  {
    title: 'opencode-mem0-selfhost',
    description:
      'Self-hosted Mem0 REST backend for OpenCode — persistent AI memory for coding agents',
    image: '/project/opencode-mem0.png',
    link: 'https://www.npmjs.com/package/opencode-mem0-selfhost',
    technologies: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
    ],
    github: 'https://github.com/imsudip/opencode-mem0-selfhost',
    live: 'https://www.npmjs.com/package/opencode-mem0-selfhost',
    details: true,
    projectDetailsPageSlug: '/projects/opencode-mem0-selfhost',
    isWorking: true,
  },
  {
    title: 'Refectly',
    description:
      'Reflective journaling AI CLI built with ChromaDB and OpenAI for self-discovery and personal growth',
    image: '/project/refectly.png',
    link: 'https://github.com/imsudip/Refectly',
    technologies: [{ name: 'Python', icon: <Python key="python" /> }],
    github: 'https://github.com/imsudip/Refectly',
    live: 'https://github.com/imsudip/Refectly',
    details: true,
    projectDetailsPageSlug: '/projects/refectly',
    isWorking: false,
  },
  {
    title: 'Sunday Suspense',
    description:
      'Open-source Flutter app to listen to Sunday Suspense episodes',
    image: '/project/sunday-suspense.png',
    link: 'https://github.com/imsudip/sunday_suspense',
    technologies: [
      { name: 'Dart', icon: <Dart key="dart" /> },
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
    ],
    github: 'https://github.com/imsudip/sunday_suspense',
    live: 'https://github.com/imsudip/sunday_suspense',
    details: true,
    projectDetailsPageSlug: '/projects/sunday-suspense',
    isWorking: false,
  },
  {
    title: 'Foodify',
    description:
      'Recipe browsing and recommendation app — final year BSc Computer Science project',
    image: '/project/foodify.png',
    link: 'https://github.com/imsudip/foodify',
    technologies: [
      { name: 'Dart', icon: <Dart key="dart" /> },
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
    ],
    github: 'https://github.com/imsudip/foodify',
    live: 'https://github.com/imsudip/foodify',
    details: true,
    projectDetailsPageSlug: '/projects/foodify',
    isWorking: false,
  },
  {
    title: 'WikiPhilosophy',
    description:
      'Search any word on Wikipedia and trace its path to philosophy',
    image: '/project/wikiphilosophy.png',
    link: 'https://imsudip.github.io/wikiphilosophy/',
    technologies: [
      { name: 'Dart', icon: <Dart key="dart" /> },
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
      { name: 'Python', icon: <Python key="python" /> },
    ],
    github: 'https://github.com/imsudip/wikiphilosophy',
    live: 'https://imsudip.github.io/wikiphilosophy/',
    details: true,
    projectDetailsPageSlug: '/projects/wikiphilosophy',
    isWorking: false,
  },
];
