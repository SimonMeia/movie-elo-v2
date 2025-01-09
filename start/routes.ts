/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {middleware} from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const MoviesController = () => import('#controllers/movies_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const SessionController = () => import('#controllers/session_controller')
const ProfileController = () => import('#controllers/profiles_controller')
const GradeTypesController = () => import('#controllers/grade_types_controller')
const ViewingsController = () => import('#controllers/viewings_controller')
const RewindsController = () => import('#controllers/rewinds_controller')

router
  .group(() => {
    router.get('/', [HomeController, 'index'])

    router.get('/reviews', [ReviewsController, 'index']).as('reviews.index')
    router.post('/reviews', [ReviewsController, 'store']).as('reviews.store')
    router.get('/reviews/:id', [ReviewsController, 'show']).as('reviews.show')
    router.delete('/reviews/:id', [ReviewsController, 'delete']).as('reviews.delete')
    router.patch('/reviews/:id/grades', [ReviewsController, 'updateGrades'])

    router.get('/review-form', [ReviewsController, 'create'])

    router.get('/profile', [ProfileController, 'index'])

    router.post('/viewings', [ViewingsController, 'store'])

    router.get('/rewinds', [RewindsController, 'index'])

    router.get('/grade-types', [GradeTypesController, 'create'])
    router.post('/grade-types', [GradeTypesController, 'store'])

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
