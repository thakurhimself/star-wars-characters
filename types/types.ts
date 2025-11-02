
export interface CharacterType {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string,
    homeworld: string
    films: string[]
    species: string[],
    vehicles: string[],
    starships: string[]
    created: Date,
    edited: Date,
    url: string
}

export interface UIStateType {
    type: 'loading' | 'error' | null
    message?: string
}

export interface HomeworldType {
    name: string,
    url: string
}

export interface LoginStateType {
    success: boolean,
    message?: string
}