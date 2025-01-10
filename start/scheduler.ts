import scheduler from 'adonisjs-scheduler/services/main'

import ResetDemoUser from '../commands/reset_demo_user.js'

scheduler.command(ResetDemoUser).daily()
