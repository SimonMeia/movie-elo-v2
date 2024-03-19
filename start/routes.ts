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
const GradeTypesController = () => import('#controllers/grade_types_controller')

router.get('/', [HomeController, 'index']).use(middleware.auth())

router.post('/reviews', [ReviewsController, 'store']).use(middleware.auth())
router.get('/reviews', [ReviewsController, 'index']).use(middleware.auth())
router.get('/reviews/:id', [ReviewsController, 'show']).as('reviews.show').use(middleware.auth())

router.get('/review-form', [ReviewsController, 'create']).use(middleware.auth())

router.get('/profile', [ProfileController, 'index']).use(middleware.auth())

router.get('/grade-types', [GradeTypesController, 'create']).use(middleware.auth())

router.get('/api/tmdb/search', [MoviesController, 'search']).use(middleware.auth())

router.get('/auth', [SessionController, 'create']).use(middleware.guest())
router.post('/auth/login', [SessionController, 'login']).use(middleware.guest())
router.post('/auth/register', [SessionController, 'signUp']).use(middleware.guest())
router.get('/auth/logout', [SessionController, 'logout']).use(middleware.auth())
