export interface PokemonBasic {
  name: string;
  url: string;
}

export type pokemon = PokemonBasic;

export interface PokemonType {
  slot?: number;
  type: {
    name: string;
    url?: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort?: number;
  stat: {
    name: string;
    url?: string;
  };
}

export interface PokemonAbility {
  is_hidden?: boolean;
  slot?: number;
  ability: {
    name: string;
    url?: string;
  };
}

export interface PokemonSprites {
  front_default?: string;
  other?: {
    "official-artwork"?: {
      front_default?: string;
    };
  };
}

export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url?: string;
  };
  version_group: {
    name: string;
    url?: string;
  };
}

export interface PokemonMoveEntry {
  move: {
    name: string;
    url: string;
  };
  version_group_details: MoveVersionGroupDetail[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: PokemonSprites;
  types?: PokemonType[];
  stats?: PokemonStat[];
  abilities?: PokemonAbility[];
  moves?: PokemonMoveEntry[];
}

export type pokemonDetails = PokemonDetails;

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url?: string;
  };
}

export interface GenusEntry {
  genus: string;
  language: {
    name: string;
    url?: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries?: FlavorTextEntry[];
  genera?: GenusEntry[];
}

export interface StatLabel {
  key: string;
  label: string;
}
