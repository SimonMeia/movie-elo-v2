import env from '#start/env'

class TmdbService {
  private baseUrl = 'https://api.themoviedb.org/3'

  async searchMovies(query: string) {
    const url = `${this.baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.get('TMDB_BEARER_TOKEN')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  }
}

export default new TmdbService()
