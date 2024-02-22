import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'
import { UserFactory } from '#database/factories/user_factory'
import Movie from '#models/movie'
import { GenreFactory } from '#database/factories/genre_factory'
import { MoviePersonFactory } from '#database/factories/movie_person_factory'
import { CountryFactory } from '#database/factories/country_factory'
import { LocationFactory } from '#database/factories/location_factory'
import Viewing from '#models/viewing'
import { PartnerFactory } from '#database/factories/partner_factory'

export default class extends BaseSeeder {
  private selectRandomElements(array: Array<any>) {
    const numElements = Math.floor(Math.random() * array.length) + 1
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numElements)
  }

  async run() {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (app.inProduction) return

    await UserFactory.create()

    // const genres = await GenreFactory.makeMany(10)
    // const actors = await MoviePersonFactory.makeMany(10)
    // const directors = await MoviePersonFactory.makeMany(10)
    // const composers = await MoviePersonFactory.makeMany(10)
    // const countries = await CountryFactory.makeMany(10)
    // const locations = await LocationFactory.makeMany(10)
    // const partners = await PartnerFactory.makeMany(10)

    // await UserFactory.with('reviews', 5, (review) =>
    //   review.with('movie', 1).with('viewngs', 3)
    // ).createMany(10)

    // for (const viewing of await Viewing.all()) {
    //   await viewing.related('locations').saveMany(this.selectRandomElements(locations))
    //   await viewing.related('partners').saveMany(this.selectRandomElements(partners))
    // }

    // for (const movie of await Movie.all()) {
    //   await movie.related('genres').saveMany(this.selectRandomElements(genres))
    //   await movie.related('actors').saveMany(this.selectRandomElements(actors))
    //   await movie.related('directors').saveMany(this.selectRandomElements(directors))
    //   await movie.related('composers').saveMany(this.selectRandomElements(composers))
    //   await movie.related('countries').saveMany(this.selectRandomElements(countries))
    // }
  }
}
