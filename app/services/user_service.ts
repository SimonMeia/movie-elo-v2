import fs from 'node:fs'
import path from 'node:path'
import User from '#models/user'
import GradeType from '#models/grade_type'
import Review from '#models/review'
import MovieService from '#services/movie_service'
import ViewingService from '#services/viewing_service'

class UserService {
  private gradeTypesConfig = [
    {
      name: 'Histoire',
      maxGrade: 5,
      grades: [
        { value: 1, description: 'Mauvaise' },
        { value: 2, description: 'Sans plus' },
        { value: 3, description: 'Bien' },
        { value: 4, description: 'Très bien' },
        { value: 5, description: 'Excellent / Légendaire' },
      ],
    },
    {
      name: 'Acting',
      maxGrade: 3,
      grades: [
        { value: 1, description: 'Mauvaise / Sans plus' },
        { value: 2, description: 'Bon / Bien' },
        { value: 3, description: 'Excellent' },
      ],
    },
    {
      name: 'Réalisation',
      maxGrade: 3,
      grades: [
        { value: 1, description: 'Mauvaise / Sans plus' },
        { value: 2, description: 'Bon / Bien' },
        { value: 3, description: 'Excellent' },
      ],
    },
    {
      name: 'Musique',
      maxGrade: 3,
      grades: [
        { value: 1, description: 'Mauvaise / Sans plus' },
        { value: 2, description: 'Bon / Bien' },
        { value: 3, description: 'Excellent' },
      ],
    },
    {
      name: 'Feeling à la fin du film',
      maxGrade: 2,
      grades: [
        { value: 1, description: 'Sans plus' },
        { value: 2, description: 'Scotché / Touché / Marqué / Hypé' },
      ],
    },
    {
      name: 'Appréciation personnelle',
      maxGrade: 4,
      grades: [
        { value: 1, description: "J'ai pas aimé" },
        { value: 2, description: 'Pas mal' },
        { value: 3, description: 'A revoir / Bien aimé' },
        { value: 4, description: 'Vraiment insane' },
      ],
    },
  ]

  /**
   * Reset the demo user and their grade types.
   */
  public async resetDemoUser() {
    const currentDemoUser = await User.findBy('email', 'demo@movie-elo.com')
    if (currentDemoUser) await currentDemoUser.delete()

    await User.create({
      email: 'demo@movie-elo.com',
      firstName: 'Tom',
      lastName: 'Hanks',
      username: 'DemoUser',
      password: '1234',
      gradeTypesValidated: true,
    })

    const demoUser = await User.findByOrFail('email', 'demo@movie-elo.com')

    await this.createGradeTypes(demoUser)
    await this.addReviewsFromJson(demoUser, 'database/seeders/demo_user_data.json')

    return demoUser.id
  }

  /**
   * Create grade types and associated grades for a user.
   */
  private async createGradeTypes(user: User) {
    for (const gradeTypeConfig of this.gradeTypesConfig) {
      const gradeType = await GradeType.create({
        name: gradeTypeConfig.name,
        maxGrade: gradeTypeConfig.maxGrade,
        userId: user.id,
      })

      await gradeType.related('grades').createMany(
        gradeTypeConfig.grades.map((grade) => ({
          ...grade,
          gradeTypeId: gradeType.id,
        }))
      )
    }
  }

  /**
   * Add reviews for a user from a JSON file.
   */
  public async addReviewsFromJson(user: User, jsonPath: string) {
    const absolutePath = path.resolve(jsonPath)
    const jsonReviews: {
      locations: string
      grades: {
        story: number
        acting: number
        directing: number
        music: number
        feeling: number
        personal: number
      }
      comment: string
      watch_date: string
      tmdb_id: number
      partners: string
    }[] = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))

    // Helper function to fetch a grade by type name and value
    const getGrade = async (gradeName: string, gradeValue: number) => {
      const gradeType = await GradeType.findByOrFail({ name: gradeName, user_id: user.id })
      return gradeType.related('grades').query().where('value', gradeValue).firstOrFail()
    }

    for (const jsonReview of jsonReviews) {
      // Create or fetch the movie
      const movie = await MovieService.createIfNotExists(jsonReview.tmdb_id)

      // Create the review
      const dbReview = await Review.create({
        userId: user.id,
        comment: jsonReview.comment,
        movieId: movie.id,
      })

      // Fetch and attach grades
      const grades = await Promise.all([
        getGrade('Histoire', jsonReview.grades.story),
        getGrade('Acting', jsonReview.grades.acting),
        getGrade('Réalisation', jsonReview.grades.directing),
        getGrade('Musique', jsonReview.grades.music),
        getGrade('Feeling à la fin du film', jsonReview.grades.feeling),
        getGrade('Appréciation personnelle', jsonReview.grades.personal),
      ])

      const gradeIds = grades.map((grade) => grade.id)
      console.log(gradeIds)
      await dbReview.related('grades').attach(gradeIds)

      // Parse watch date and create a viewing record
      const [day, month, year] = jsonReview.watch_date.split('.').map(Number)
      const watchDate = new Date(year, month - 1, day)

      await ViewingService.createViewing(
        user.id,
        watchDate,
        dbReview.id,
        jsonReview.locations.split(', '),
        jsonReview.partners.split(', ')
      )
    }
  }
}

export default UserService
