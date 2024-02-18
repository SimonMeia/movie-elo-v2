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
const ReviewsController = () => import('#controllers/reviews_controller')

router.get('/', [HomeController, 'index'])

router.get('/tmdb/search', [MoviesController, 'search'])

router.post('/review', [ReviewsController, 'store'])
router.get('/review', [ReviewsController, 'index'])

router.get('/review-form', [ReviewsController, 'create'])
