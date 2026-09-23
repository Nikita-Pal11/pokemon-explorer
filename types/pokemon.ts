export interface pokemon {
    name: string;
    url: string;
}

export interface pokemonDetails {
    id: number;
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
    stats?: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

