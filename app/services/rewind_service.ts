import { type UserId } from '#models/user'
import {
  AverageGrades,
  AverageRuntime,
  LongestShortesMovies,
  PreferredActors,
  PreferredGenres,
  PreferredLocations,
  PreferredPartners,
  Rewind,
  ViewingsByMonth,
  YearlyMovies,
} from '#types/rewind'
import Movie from '#models/movie'
import GradeType from '#models/grade_type'
import Viewing from '#models/viewing'

class RewindService {
  async getRewindData(userId: UserId, year: number): Promise<Rewind> {
    const moviesWatched = await Movie.query()
      .whereHas('reviews', (review) => {
        review.where('user_id', userId)
        review.whereHas('viewings', (viewing) => {
          viewing.whereBetween('viewing_date', [`${year}-01-01`, `${year}-12-31`])
        })
      })
      .preload('actors')
      .preload('genres')
      .preload('reviews', (review) => {
        review.where('user_id', userId)
        review.preload('grades')
      })

    const gradingSystem = await GradeType.query().where('user_id', userId)

    // Nombre de films vus
    const yearlyMovies: YearlyMovies = {
      value: moviesWatched.length,
      frequencyInDays: 365 / moviesWatched.length,
    }

    // Durée moyenne des films
    const averageRuntime: AverageRuntime = {
      minutes: Math.floor(
        moviesWatched.reduce((acc, cur) => acc + cur.runtime, 0) / moviesWatched.length
      ),
    }

    // Genres et acteurs préférés
    const topGenres: { id: number; name: string; count: number }[] = []
    const topActors: { id: number; name: string; count: number }[] = []

    moviesWatched.forEach((movie) => {
      movie.actors.forEach((actor) => {
        const topActorIndex = topActors.findIndex((topActor) => actor.id === topActor.id)
        if (topActorIndex !== -1) {
          topActors[topActorIndex].count++
        } else {
          topActors.push({ id: actor.id, name: actor.name, count: 1 })
        }
      })

      movie.genres.forEach((genre) => {
        const topGenreIndex = topGenres.findIndex((topGenre) => genre.id === topGenre.id)
        if (topGenreIndex !== -1) {
          topGenres[topGenreIndex].count++
        } else {
          topGenres.push({ id: genre.id, name: genre.name, count: 1 })
        }
      })
    })

    const preferredGenres: PreferredGenres = {
      totalGenres: topGenres.length,
      topGenres: topGenres
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((g) => ({
          name: g.name,
          numberOfMovies: g.count,
        })),
    }

    const preferredActors: PreferredActors = topActors
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((a) => ({
        name: a.name,
        numberOfMovies: a.count,
      }))

    // Film le plus long et le plus court
    const moviesSortedByRuntime = moviesWatched.sort((a, b) => a.runtime - b.runtime)
    const longestShortestMovies: LongestShortesMovies = {
      shortestName: moviesSortedByRuntime[0].title,
      shortestRuntimeMin: moviesSortedByRuntime[0].runtime,
      longestName: moviesSortedByRuntime[moviesSortedByRuntime.length - 1].title,
      longestRuntimeMin: moviesSortedByRuntime[moviesSortedByRuntime.length - 1].runtime,
    }

    const gradeTypesCumulated = gradingSystem.map((gradeType) => ({
      id: gradeType.id,
      name: gradeType.name,
      maxGrade: gradeType.maxGrade,
      total: 0,
    }))

    for (const movie of moviesWatched) {
      for (const grade of movie.reviews[0].grades) {
        const index = gradeTypesCumulated.findIndex(
          (gradeType) => gradeType.id === grade.gradeTypeId
        )
        if (index !== -1) gradeTypesCumulated[index].total += grade.value
      }
    }

    const averageGrades: AverageGrades = {
      maxOverallGrade: gradingSystem.reduce((acc, cur) => acc + cur.maxGrade, 0),
      overallAverage: gradeTypesCumulated.reduce(
        (acc, cur) => acc + cur.total / moviesWatched.length,
        0
      ),
      gradeTypes: gradeTypesCumulated.map((g) => ({
        maxGrade: g.maxGrade,
        name: g.name,
        average: g.total / moviesWatched.length,
      })),
    }

    const viewings = await Viewing.query()
      .whereHas('review', (review) => {
        review.where('user_id', userId)
      })
      .whereBetween('viewing_date', [`${year}-01-01`, `${year}-12-31`])
      .preload('locations')
      .preload('partners')
      .preload('review', (review) => {
        review.preload('movie')
      })

    // Location préférées
    const preferredLocations: PreferredLocations = viewings
      .flatMap((viewing) => viewing.locations)
      .reduce<PreferredLocations>((acc, location) => {
        const existingLocation = acc.find((item) => item.name === location.name)
        if (existingLocation) {
          existingLocation.numberOfMovies += 1
        } else {
          acc.push({ name: location.name, numberOfMovies: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.numberOfMovies - a.numberOfMovies)

    // Partners préférés
    const preferredPartners: PreferredPartners = viewings
      .flatMap((viewing) => viewing.partners)
      .reduce<PreferredPartners>((acc, partner) => {
        const existingPartner = acc.find((item) => item.name === partner.name)
        if (existingPartner) {
          existingPartner.numberOfMovies += 1
        } else {
          acc.push({ name: partner.name, numberOfMovies: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.numberOfMovies - a.numberOfMovies)

    // Temps total
    const timeSpent = { minutes: viewings.reduce((acc, cur) => acc + cur.review.movie.runtime, 0) }

    // Regrouper les viewings par mois
    const viewingsByMonth: ViewingsByMonth = viewings
      .reduce<ViewingsByMonth>((acc, viewing) => {
        const existingMonth = acc.find((item) => item.monthId === viewing.viewingDate.month)
        if (existingMonth) {
          existingMonth.numberOfMovies += 1
        } else {
          acc.push({ monthId: viewing.viewingDate.month, numberOfMovies: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => {
        return a.monthId - b.monthId
      })

    return {
      year: year,
      yearlyMovies: yearlyMovies,
      averageRuntime: averageRuntime,
      preferredActors: preferredActors,
      preferredGenres: preferredGenres,
      longestShortestMovies: longestShortestMovies,
      averageGrades: averageGrades,
      preferredPartners: preferredPartners,
      preferredLocations: preferredLocations,
      timeSpent: timeSpent,
      viewingsByMonth: viewingsByMonth,
    }
  }
}

export default new RewindService()
