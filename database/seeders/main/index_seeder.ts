import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'
import User from '#models/user'
import GradeType from '#models/grade_type'
import fs from 'node:fs'
import path from 'node:path'
import MovieService from '#services/movie_service'
import Review from '#models/review'
import ViewingService from '#services/viewing_service'

export default class extends BaseSeeder {
  async run() {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (app.inProduction) return

    await User.create({
      firstName: 'Simon',
      lastName: 'Meia',
      username: 'simon-meia',
      email: 'simon@me.com',
      password: '1234',
    })

    const user = await User.findByOrFail('username', 'simon-meia')

    const story = await GradeType.create({
      name: 'Histoire',
      maxGrade: 5,
      userId: user.id,
    })
    await story.related('grades').createMany([
      { gradeTypeId: story.id, value: 1, description: 'Mauvaise' },
      { gradeTypeId: story.id, value: 2, description: 'Sans plus' },
      { gradeTypeId: story.id, value: 3, description: 'Bien' },
      { gradeTypeId: story.id, value: 4, description: 'Tres bien' },
      { gradeTypeId: story.id, value: 5, description: 'Excellent / Légendaire' },
    ])

    const acting = await GradeType.create({
      name: 'Acting',
      maxGrade: 3,
      userId: user.id,
    })
    await acting.related('grades').createMany([
      { gradeTypeId: acting.id, value: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: acting.id, value: 2, description: 'Bon / Bien' },
      { gradeTypeId: acting.id, value: 3, description: 'Excellent' },
    ])

    const directing = await GradeType.create({
      name: 'Réalisation',
      maxGrade: 3,
      userId: user.id,
    })
    await directing.related('grades').createMany([
      { gradeTypeId: directing.id, value: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: directing.id, value: 2, description: 'Bon / Bien' },
      { gradeTypeId: directing.id, value: 3, description: 'Excellent' },
    ])

    const music = await GradeType.create({
      name: 'Musique',
      maxGrade: 3,
      userId: user.id,
    })
    await music.related('grades').createMany([
      { gradeTypeId: music.id, value: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: music.id, value: 2, description: 'Bon / Bien' },
      { gradeTypeId: music.id, value: 3, description: 'Excellent' },
    ])

    const feeling = await GradeType.create({
      name: 'Feeling à la fin du film',
      maxGrade: 2,
      userId: user.id,
    })
    await feeling.related('grades').createMany([
      { gradeTypeId: feeling.id, value: 1, description: 'Sans plus' },
      { gradeTypeId: feeling.id, value: 2, description: 'Scotché / Touché / Marqué / Hypé' },
    ])

    const personnal = await GradeType.create({
      name: 'Appréciation personelle',
      maxGrade: 4,
      userId: user.id,
    })
    await personnal.related('grades').createMany([
      { gradeTypeId: personnal.id, value: 1, description: "J'ai pas aimé" },
      { gradeTypeId: personnal.id, value: 2, description: 'Pas mal' },
      { gradeTypeId: personnal.id, value: 3, description: 'A revoir / Bien aimé' },
      { gradeTypeId: personnal.id, value: 4, description: 'Vraiment insane' },
    ])

    const jsonPath = path.resolve('database', 'seeders', 'reviews.json')
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
    }[] = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

    await Promise.all(
      jsonReviews.map(async (jsonReview) => {
        const movie = await MovieService.createIfNotExists(jsonReview.tmdb_id)
        const dbReview = await Review.create({
          userId: user.id,
          comment: jsonReview.comment,
          movieId: movie.id,
        })

        const gradeStoryType = await GradeType.findByOrFail('name', 'Histoire')
        const gradeStory = await gradeStoryType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.story)
          .firstOrFail()

        const gradeActingType = await GradeType.findByOrFail('name', 'Acting')
        const gradeActing = await gradeActingType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.acting)
          .firstOrFail()

        const gradeDirectingType = await GradeType.findByOrFail('name', 'Réalisation')
        const gradeDirecting = await gradeDirectingType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.directing)
          .firstOrFail()

        const gradeMusicType = await GradeType.findByOrFail('name', 'Musique')
        const gradeMusic = await gradeMusicType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.music)
          .firstOrFail()

        const gradeFeelingType = await GradeType.findByOrFail('name', 'Feeling à la fin du film')
        const gradeFeeling = await gradeFeelingType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.feeling)
          .firstOrFail()

        const gradePersonalType = await GradeType.findByOrFail('name', 'Appréciation personelle')
        const gradePersonal = await gradePersonalType
          .related('grades')
          .query()
          .where('value', jsonReview.grades.personal)
          .firstOrFail()

        const gradesId = [
          gradeStory.id,
          gradeActing.id,
          gradeDirecting.id,
          gradeMusic.id,
          gradeFeeling.id,
          gradePersonal.id,
        ]

        await dbReview.related('grades').attach(gradesId)

        await ViewingService.createViewing(
          user.id,
          new Date(
            Number.parseInt(jsonReview.watch_date.split('.')[2]),
            Number.parseInt(jsonReview.watch_date.split('.')[1]) - 1,
            Number.parseInt(jsonReview.watch_date.split('.')[0])
          ),
          dbReview.id,
          jsonReview.locations.split(', '),
          jsonReview.partners.split(', ')
        )
      })
    )
  }
}
