export interface IMovie {
    id: number,
    poster_path: string,
    release_date: Date,
    tagline: string,
    title: string,
    original_title: string,
    // optional
    popularity?: number,
    runtime?: number,
    revenue?: number,
    genres?: string, // its not
    production_countries?: string, // its not
    spoken_languages?: string, // its not
    vote_average?: number,
    vote_count?: number
}

export interface IActorInMovie {
    id: string,
    name: string,
    character: string,
    birthday: Date,
    picture: string,
    ageDuringMovie: number
}
