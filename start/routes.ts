/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const HomeController = () => import('#controllers/home_controller')
const MoviesController = () => import('#controllers/movies_controller')
const RatingsController = () => import('#controllers/ratings_controller')

router.get('/', [HomeController, 'index'])

router.get('/search', [MoviesController, 'search'])

router.post('/rating', [RatingsController, 'store'])
router.get('/rating', [RatingsController, 'index'])

router.get('/rating-form', [RatingsController, 'create'])

// router.post('/rating', () => console.log('lol'))
