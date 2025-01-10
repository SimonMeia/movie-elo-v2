import scheduler from 'adonisjs-scheduler/services/main'
import logger from '@adonisjs/core/services/logger'

import ResetDemoUser from '../commands/reset_demo_user.js'

scheduler.command(ResetDemoUser).daily()

scheduler.call(() => console.log('console.log')).everyMinute()
scheduler.call(() => logger.info('logger.info')).everyMinute()
