import { FooterMenu, SocialLink } from './models/footer.model';
import { NavbarMenu } from './models/navbar.model';

export const NAVBAR_MENU: NavbarMenu[] = [
  { id: 'home', title: 'Home', type: 'section' },
  { id: 'about', title: 'About', type: 'section' },
  { id: 'skills', title: 'Skills', type: 'section' },
  { id: 'experience', title: 'Experience', type: 'section' },
  { id: 'projects', title: 'Projects', type: 'route' },
  { id: 'blogs', title: 'Blogs', type: 'route' },
  { id: 'contact', title: 'Contact', type: 'section' },
];

export const FOOTER_MENU: FooterMenu[] = [
  { name: 'Home', id: 'home', type: 'section' },
  { name: 'About', id: 'about', type: 'section' },
  { name: 'Experience', id: 'experience', type: 'section' },
  { name: 'Projects', id: 'projects', type: 'route' },
  { name: 'Blogs', id: 'blogs', type: 'route' },
  { name: 'Contact', id: 'contact', type: 'section' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    link: 'https://github.com/dev-debabrata',
  },
  {
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin-in',
    link: 'https://www.linkedin.com/in/debabrata-das-01b371152/',
  },
];
