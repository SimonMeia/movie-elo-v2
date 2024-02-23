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

router.post('/reviews', [ReviewsController, 'store'])
router.get('/reviews', [ReviewsController, 'index'])
router.get('/reviews/:id', [ReviewsController, 'show']).as('reviews.show')

router.get('/review-form', [ReviewsController, 'create'])

router.get('/api/tmdb/search', [MoviesController, 'search'])
