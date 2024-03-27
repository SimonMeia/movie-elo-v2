/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const MoviesController = () => import('#controllers/movies_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const SessionController = () => import('#controllers/session_controller')
const ProfileController = () => import('#controllers/profiles_controller')
const GradeCategoriesController = () => import('#controllers/grade_categories_controller')

router
  .group(() => {
    router.get('/', [HomeController, 'index'])

    router.post('/reviews', [ReviewsController, 'store'])
    router.get('/reviews', [ReviewsController, 'index'])
    router.get('/reviews/:id', [ReviewsController, 'show']).as('reviews.show')

    router.get('/review-form', [ReviewsController, 'create'])

    router.get('/profile', [ProfileController, 'index'])

    router.get('/grade-categories', [GradeCategoriesController, 'create'])

    router.get('/api/tmdb/search', [MoviesController, 'search'])

    router.get('/auth/logout', [SessionController, 'logout'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/auth', [SessionController, 'create'])
    router.post('/auth/login', [SessionController, 'login'])
    router.post('/auth/register', [SessionController, 'signUp'])
  })
  .use(middleware.guest())
