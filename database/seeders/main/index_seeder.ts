import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'
import User from '#models/user'
import GradeType from '#models/grade_type'

export default class extends BaseSeeder {
  async run() {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (app.inProduction) return

    const user = await User.create({
      firstName: 'Simon',
      lastName: 'Meia',
      username: 'simon-meia',
      email: 'simon@me.ch',
      password: '1234',
    })

    const story = await GradeType.create({
      name: 'Histoire',
      maxGrade: 5,
      userId: user.id,
    })
    story.related('grades').createMany([
      { gradeTypeId: story.id, grade: 1, description: 'Mauvaise' },
      { gradeTypeId: story.id, grade: 2, description: 'Sans plus' },
      { gradeTypeId: story.id, grade: 3, description: 'Bien' },
      { gradeTypeId: story.id, grade: 4, description: 'Tres bien' },
      { gradeTypeId: story.id, grade: 5, description: 'Excellent / Légendaire' },
    ])

    const acting = await GradeType.create({
      name: 'Acting',
      maxGrade: 3,
      userId: user.id,
    })
    acting.related('grades').createMany([
      { gradeTypeId: acting.id, grade: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: acting.id, grade: 2, description: 'Bon / Bien' },
      { gradeTypeId: acting.id, grade: 3, description: 'Excellent' },
    ])

    const directing = await GradeType.create({
      name: 'Réalisation',
      maxGrade: 3,
      userId: user.id,
    })
    directing.related('grades').createMany([
      { gradeTypeId: directing.id, grade: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: directing.id, grade: 2, description: 'Bon / Bien' },
      { gradeTypeId: directing.id, grade: 3, description: 'Excellent' },
    ])

    const music = await GradeType.create({
      name: 'Musique',
      maxGrade: 3,
      userId: user.id,
    })
    music.related('grades').createMany([
      { gradeTypeId: music.id, grade: 1, description: 'Mauvaise / Sans plus' },
      { gradeTypeId: music.id, grade: 2, description: 'Bon / Bien' },
      { gradeTypeId: music.id, grade: 3, description: 'Excellent' },
    ])

    const feeling = await GradeType.create({
      name: 'Feeling à la fin du film',
      maxGrade: 2,
      userId: user.id,
    })
    feeling.related('grades').createMany([
      { gradeTypeId: feeling.id, grade: 1, description: 'Sans plus' },
      { gradeTypeId: feeling.id, grade: 2, description: 'Scotché / Touché / Marqué / Hypé' },
    ])

    const personnal = await GradeType.create({
      name: 'Appréciation personelle',
      maxGrade: 4,
      userId: user.id,
    })
    personnal.related('grades').createMany([
      { gradeTypeId: personnal.id, grade: 1, description: "J'ai pas aimé" },
      { gradeTypeId: personnal.id, grade: 2, description: 'Pas mal' },
      { gradeTypeId: personnal.id, grade: 3, description: 'A revoir / Bien aimé' },
      { gradeTypeId: personnal.id, grade: 4, description: 'Vraiment insane' },
    ])
  }
}
