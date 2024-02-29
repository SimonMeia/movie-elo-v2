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

    await GradeType.createMany([
      { name: 'Histoire', maxGrade: 5, userId: user.id },
      { name: 'Acting', maxGrade: 3, userId: user.id },
      { name: 'Réalisation', maxGrade: 3, userId: user.id },
      { name: 'Musique', maxGrade: 3, userId: user.id },
      { name: 'Feeling à la fin du film', maxGrade: 2, userId: user.id },
      { name: 'Appréciation personelle', maxGrade: 4, userId: user.id },
    ])
  }
}
