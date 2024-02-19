import env from '#start/env'
import { TmdbMovieCredits, TmdbMovieDetails, TmdbSearchResponse } from '../../types/tmdb.js'

class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3'

  async searchMovies(id: number) {
    const url = `${this.baseUrl}/search/movie?query=${id}&include_adult=false&language=en-US&page=1`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_BEARER_TOKEN')}`,
      },
    }
    const response = await fetch(url, options)
    const data = (await response.json()) as TmdbSearchResponse
    return data
  }

  async getMovieDetails(id: number) {
    const url = `${this.baseUrl}/movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_BEARER_TOKEN')}`,
      },
    }
    const response = await fetch(url, options)
    const data = (await response.json()) as TmdbMovieDetails
    return data
  }

  async getPeople(id: number) {
    const url = `${this.baseUrl}/movie/${id}/credits?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_BEARER_TOKEN')}`,
      },
    }
    const response = await fetch(url, options)
    const data = (await response.json()) as TmdbMovieCredits

    const actors = data.cast.splice(0, 20)
    const directors = data.crew.filter((person) => person.job === 'Director')
    const composers = data.crew.filter((person) => person.job === 'Original Music Composer')

    return { actors, directors, composers }
  }

  async isMovieIdValid(id: number) {
    const url = `${this.baseUrl}/movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_BEARER_TOKEN')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.status !== 200) {
      return false
    }
    return true
  }
}

export default new TmdbService()
