export class CardApiary {
    "status": string;
    "card": {
        "name": string;
        "image_path": string;
        "thumbnail_path": string;
        "text": string;
        "type": string;
        "number": number;
        "price_low": number;
        "price_avg": number;
        "price_high": number;
        "tcgplayer_link": string;
        "is_monster": boolean;
        "is_spell": boolean;
        "is_illegal": boolean;
        "is_trap": boolean;
        "has_name_condition": boolean;
        "species": string;
        "monster_types": string[];
        "attack": number;
        "defense": number;
        "stars": number;
        "attribute": string;
        "is_pendulum": boolean;
        "is_xyz": boolean;
        "is_synchro": boolean;
        "is_fusion": boolean;
        "is_link": boolean;
        "is_extra_deck": boolean;
        "has_materials": boolean;
    }
}