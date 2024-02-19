import Movie from '#models/movie'
import MoviePerson from '#models/movie_person'
import TmdbService from '#services/tmdb_service'
import { DateTime } from 'luxon'
import { TmdbCast, TmdbCrew, TmdbGenre, TmdbProductionCountry } from '../../types/tmdb.js'
import Country from '#models/country'
import Genre from '#models/genre'

class MovieService {
  async createIfNotExists(id: number) {
    let movie = await Movie.findBy('tmdbId', id)
    if (!movie) {
      movie = await creatMovie(id)
    }
    return movie
  }
}

async function creatMovie(id: number) {
  const movieDetails = await TmdbService.getMovieDetails(id)
  const { actors, directors, composers } = await TmdbService.getPeople(id)

  const actorsIds = await Promise.all(actors.map(createMoviePersonIfNotExists))
  const directorsIds = await Promise.all(directors.map(createMoviePersonIfNotExists))
  const composersIds = await Promise.all(composers.map(createMoviePersonIfNotExists))
  const countriesIds = await Promise.all(
    movieDetails.production_countries.map(createCountryIfNotExists)
  )
  const genresIds = await Promise.all(movieDetails.genres.map(createGenreIfNotExists))

  const movie = await Movie.create({
    tmdbId: id,
    title: movieDetails.title,
    synopsis: movieDetails.overview,
    releaseDate: movieDetails.release_date
      ? DateTime.fromFormat(movieDetails.release_date, 'yyyy-MM-dd')
      : null,
    runtime: movieDetails.runtime,
    backdropPath: movieDetails.backdrop_path,
    posterPath: movieDetails.poster_path,
  })

  movie.related('actors').attach(actorsIds)
  movie.related('directors').attach(directorsIds)
  movie.related('composers').attach(composersIds)
  movie.related('countries').attach(countriesIds)
  movie.related('genres').attach(genresIds)

  return movie
}

async function createMoviePersonIfNotExists(person: TmdbCrew | TmdbCast) {
  const moviePerson = await MoviePerson.firstOrNew(
    {
      tmdbId: person.id,
    },
    {
      name: person.name,
      profilePath: person.profile_path,
    }
  )
  await moviePerson.save()
  return moviePerson.id
}

async function createCountryIfNotExists(country: TmdbProductionCountry) {
  const dbCountry = await Country.firstOrCreate(
    { iso3166_1: country.iso_3166_1 },
    { name: country.name }
  )
  await dbCountry.save()
  return dbCountry.id
}

async function createGenreIfNotExists(genre: TmdbGenre) {
  const dbGenre = await Genre.firstOrCreate({ tmdbId: genre.id }, { name: genre.name })
  await dbGenre.save()
  return dbGenre.id
}

export default new MovieService()
