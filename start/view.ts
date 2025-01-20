import edge from 'edge.js'
import env from '#start/env'

/**
 * Define a global property
 */
edge.global('appUrl', env.get('APP_URL'))
edge.global('appName', env.get('APP_NAME'))
