import type { IconName } from '../common/Icon';

export const navigationItems: { to: string; label: string; icon: IconName }[] = [
  {to:'/dashboard',label:'Tableau de bord',icon:'dashboard'},
  {to:'/vanta',label:'VANTA',icon:'vanta'},
  {to:'/operators',label:'Opérateurs',icon:'operators'},
  {to:'/armors',label:'Armures',icon:'armors'},
  {to:'/factions',label:'Factions',icon:'factions'},
  {to:'/timeline',label:'Chronologie',icon:'timeline'},
  {to:'/terminal',label:'Terminal',icon:'terminal'},
  {to:'/archives',label:'Archives',icon:'archives'},
  {to:'/investigation',label:'Enquête',icon:'investigation'},
];
