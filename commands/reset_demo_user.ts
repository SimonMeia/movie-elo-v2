import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

export default class ResetDemoUser extends BaseCommand {
  static commandName = 'reset:demo-user'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(userService: UserService) {
    this.logger.info('Reseting demo user')

    const data = await userService.resetDemoUser()

    this.logger.info('New demo user : ' + data)
  }
}
