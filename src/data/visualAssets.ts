const imageRoot = `${import.meta.env.BASE_URL}assets/images`;

function image(path: string): string {
  return `${imageRoot}/${path}`;
}

export const brandImages = {
  logo: image('brand/nexus-logo.webp'),
  symbol: image('brand/nexus-symbol.webp'),
} as const;

export const operatorImages: Record<string, string> = {
  a7: image('operators/operator-a7-portrait.webp'),
  crimson: image('operators/operator-crimson-portrait.webp'),
};

export const armorImages: Record<string, string> = Object.fromEntries(
  ['ombre','crimson','bastion','oracle','medusa','cendre','raptor','seraph','harbinger','mantis','wraith','revenant','goliath','lucid','sovereign','mirror','chimera','ascendant']
    .map((id) => [id,image(`armors/armor-${id}.webp`)]),
);

export const factionImages: Record<string, string> = {
  directoire: image('factions/faction-directoire.webp'),
  'fantomes-libres': image('factions/faction-fantomes-libres.webp'),
  helix: image('factions/faction-helix.webp'),
  'choeur-zero': image('factions/faction-choeur-zero.webp'),
  'syndicat-obsidienne': image('factions/faction-obsidienne.webp'),
  'ordre-miroir': image('factions/faction-ordre-miroir.webp'),
  sentinelles: image('factions/faction-sentinelles-cendre.webp'),
  'nx-s': image('factions/faction-nx-s.webp'),
};

export const locationImages: Record<string, string> = {
  couronne: image('maps/map-la-couronne.webp'),
  voile: image('maps/map-le-voile.webp'),
  profondeurs: image('maps/map-les-profondeurs.webp'),
  cimetiere: image('maps/map-cimetiere-numerique.webp'),
  zero: image('maps/map-zone-zero.webp'),
};

export const archiveImages: Record<string, string> = {
  'rapport-nuit-zero': image('archives/archive-nuit-zero.webp'),
  'restauration-2224': image('archives/archive-restauration-2224.webp'),
  'ordre-execution-a7': image('archives/archive-execution-order-a7.webp'),
  'protocole-fil-rouge': image('archives/archive-fil-rouge.webp'),
  'dossier-sept-corps': image('archives/archive-sept-corps.webp'),
  'registre-helix-k13': image('archives/archive-fil-rouge.webp'),
  'memoire-source-a7-04': image('archives/archive-restauration-2224.webp'),
  'directive-corps-04': image('archives/archive-execution-order-a7.webp'),
  'message-future-crimson': image('archives/archive-future-crimson.webp'),
  'liste-63218': image('archives/archive-protocol-ash.webp'),
  'projet-ascendant': image('archives/archive-ascendant.webp'),
  'verite-originale': image('archives/archive-original-truth.webp'),
  'registre-revisions-miroir': image('archives/archive-original-truth.webp'),
  'directive-verite-supportable': image('archives/archive-original-truth.webp'),
  'enfant-cimetiere': image('archives/archive-child-cemetery.webp'),
  'registre-enfant-cimetiere': image('archives/archive-child-cemetery.webp'),
  'porte-continuite': image('archives/archive-ascendant.webp'),
  'temoignage-mere-echo': image('archives/archive-child-cemetery.webp'),
};
