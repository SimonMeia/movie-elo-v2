import GradeType from '#models/grade_type'
import { type UserId } from '#models/user'

class GradeService {
  async getMovieForEachGrade(userId: UserId) {
    const gradesTypes = await GradeType.query().where('user_id', userId).preload('grades')

    const jsp = await Promise.all(
      gradesTypes.map(async (gradeType) => {
        const gradesWithMovies = await gradeType
          .related('grades')
          .query()
          .preload('reviews', (reviews) => {
            reviews.preload('movie')
          })

        return {
          id: gradeType.id,
          grades: gradesWithMovies.map((grade) => {
            const randomReview =
              grade.reviews.length > 0
                ? grade.reviews[Math.floor(Math.random() * grade.reviews.length)]
                : null
            return {
              id: grade.id,
              movie: randomReview ? randomReview.movie.title : 'Pas de film',
            }
          }),
        }
      })
    )
    return jsp
  }
}

export default new GradeService()
