export type Movie = {
  id: number
  tmdbId: number
  title: string
  synopsis: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: Date
  runtime: number
  actors: MoviePerson[]
  directors: MoviePerson[]
  composers: MoviePerson[]
  genres: Genre[]
  countries: Country[]
}

export type Genre = {
  id: number
  tmdbId: number
  name: string
}

export type MoviePerson = {
  id: number
  tmdbId: number
  name: string
  profilePath: string
}

export type Country = {
  id: number
  name: string
  iso3166_1: string
}
