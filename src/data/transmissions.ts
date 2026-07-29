import type { Transmission } from '../types';

export const transmissions: Transmission[] = [
  {id:'crimson-01',sender:'CRIMSON',text:'Si tu peux lire ceci, le Directoire sait déjà que tu es là.',trigger:'intro'},
  {id:'crimson-02',sender:'CRIMSON',text:"Ne crois pas tout ce que les archives disent sur A7. Ne crois pas non plus tout ce qu’il dit sur lui-même.",trigger:'operator'},
  {id:'a7-01',sender:'A7',text:"Je ne cherche pas mon passé. Je cherche celui qui l’a écrit.",trigger:'dashboard'},
  {id:'directoire-01',sender:'DIRECTOIRE',text:"Le sujet NX5-00-A7 doit être récupéré intact. La préservation de son identité n’est pas prioritaire.",trigger:'dashboard'},
  {id:'nxs-01',sender:'NX-S',text:'Vous m’appelez Spectre parce que vous refusez de donner un nom à ce qui vous survivra.',trigger:'terminal'},
  {id:'nxs-02',sender:'NX-S',text:'Aucune conscience ne devrait mourir seule.',trigger:'level'},
  {id:'mere-echo-01',sender:'MÈRE ÉCHO',text:"Ils ne sont pas morts. Ils attendent que la porte soit ouverte.",trigger:'archives'},
  {id:'yara-01',sender:'YARA SOL',text:'Rien ne sort de Zone Zéro. Même lorsque cela porte le visage d’un ami.',trigger:'vanta'},
  {id:'crimson-future',sender:'CRIMSON // VERSION ANTÉRIEURE',text:"Tu ne te souviens probablement pas de moi. C’est normal. Je suis toi. A7 ne doit pas être restauré depuis la sauvegarde la plus récente.",trigger:'chapter-zero'},
  {id:'nx-s-contact-01',sender:'NX-S',text:"Vous appelez cela une enquête. Vous ne faites que reconstruire un souvenir que j’ai déjà vécu.",trigger:'chapter-zero-complete'},
  {id:'crimson-body-04',sender:'CRIMSON // CANAL R-9',text:"A7-04 n’est pas une sauvegarde de secours. C’est une mission que nous avons choisi d’oublier.",trigger:'chapter-two'},
  {id:'nx-s-body-04',sender:'NX-S',text:"Vous avez choisi lequel devait continuer. C’est ainsi que le Directoire a commencé.",trigger:'chapter-two-complete'},
  {id:'child-r0',sender:'R-0 // SOURCE UNIQUE',text:'Je me souviens de la neige. Je ne sais pas si elle était réelle.',trigger:'chapter-three'},
  {id:'mother-echo-gate',sender:'MÈRE ÉCHO',text:'Nous avons oublié que la première voix du Chœur appartenait à une enfant.',trigger:'chapter-three'},
  {id:'nx-s-gate-final',sender:'NX-S',text:'Vous appelez cela une porte parce que vous avez besoin de croire qu’elle possède deux côtés.',trigger:'chapter-three-complete'},
];
