export type TmdbSearchResponse = {
  page: number
  results: TmdbSearchedMovie[]
  total_pages: number
  total_results: number
}

export type TmdbSearchedMovie = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TmdbMovieDetails = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: TmdbCollection | null
  budget: number
  genres: TmdbGenre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: TmdbProductionCompany[]
  production_countries: TmdbProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: []
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TmdbCollection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export type TmdbGenre = {
  id: number
  name: string
}

export type TmdbProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export type TmdbProductionCountry = {
  iso_3166_1: string
  name: string
}

export type TmdbSpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type TmdbMovieCredits = {
  id: number
  cast: TmdbCast[]
  crew: TmdbCrew[]
}

export type TmdbCast = {
  adult: false
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type TmdbCrew = {
  adult: false
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}
