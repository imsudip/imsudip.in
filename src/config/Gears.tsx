import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Phone from '@/components/svgs/devices/Phone';

export const devices = [
  {
    name: 'Desktop — Intel Core i7-14700K, RTX 4070 SUPER, 29.5" ultrawide',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'Windows + Linux dual-boot workflow',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'Samsung Galaxy S24',
    icon: <Phone className="size-4" />,
  },
];

export const webExtensions = [
  { name: 'uBlock Origin', href: 'https://ublockorigin.com/' },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi',
  },
  { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
];

export const software = [
  { name: 'VS Code', href: 'https://code.visualstudio.com/' },
  { name: 'Cursor', href: 'https://cursor.com/' },
  { name: 'OpenCode', href: 'https://opencode.ai/' },
  { name: 'Docker', href: 'https://www.docker.com/' },
  { name: 'Notion', href: 'https://www.notion.so/desktop' },
  { name: 'TickTick', href: 'https://ticktick.com/' },
];
