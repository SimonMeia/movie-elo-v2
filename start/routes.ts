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
const ViewingsController = () => import('#controllers/viewings_controller')
const RewindsController = () => import('#controllers/rewinds_controller')
const PasswordResetController = () => import('#controllers/forgot_password_controller')
const AdminController = () => import('#controllers/admin/admin_controller')
const UsersController = () => import('#controllers/admin/users_controller')

router.get('/', ({ inertia }) => {
  return inertia.render('landing/index')
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [HomeController, 'index']).as('home')
        router.get('/profile', [ProfileController, 'index'])
        router.get('/rewinds', [RewindsController, 'index'])

        router.get('/reviews', [ReviewsController, 'index']).as('reviews.index')
        router.get('/api/tmdb/search', [MoviesController, 'search'])
        router.post('/viewings', [ViewingsController, 'store'])

        router
          .group(() => {
            router.get('/reviews/create', [ReviewsController, 'create']).as('reviews.create')
            router.post('/reviews', [ReviewsController, 'store']).as('reviews.store')
          })
          .middleware([middleware.userHasGradeTypesValidated({ mustBeValidated: true })])

        router
          .group(() => {
            router.get('/reviews/:id', [ReviewsController, 'show']).as('reviews.show')
            router.delete('/reviews/:id', [ReviewsController, 'delete']).as('reviews.delete')
            router.patch('/reviews/:id/grades', [ReviewsController, 'updateGrades'])
          })
          .middleware([middleware.canAccessReview()])

        router
          .group(() => {
            router.get('/grade-types', [GradeTypesController, 'create']).as('grade-types.create')
            router.post('/grade-types', [GradeTypesController, 'store']).as('grade-types.store')
            router
              .post('/grade-types/validate', [GradeTypesController, 'validate'])
              .as('grade-types.validate')
            router
              .delete('/grade-types/:id', [GradeTypesController, 'delete'])
              .as('grade-types.delete')
          })
          .use([middleware.userHasGradeTypesValidated({ mustBeValidated: false })])
      })
      .use([middleware.auth()])
  })
  .prefix('app')

router
  .group(() => {
    router.get('/auth', [SessionController, 'create']).as('auth')
    router.post('/auth/login', [SessionController, 'login']).as('auth.login')
    router.post('/auth/register', [SessionController, 'signUp']).as('auth.register')
    router.get('/forgot-password', [PasswordResetController, 'showForgotPasswordForm'])
    router.post('/forgot-password', [PasswordResetController, 'sendResetEmail'])
    router.get('/reset-password', [PasswordResetController, 'showResetPasswordForm'])
    router.post('/reset-password', [PasswordResetController, 'resetPassword'])
  })
  .use(middleware.guest())

router
  .get('/auth/logout', [SessionController, 'logout'])
  .middleware([middleware.auth()])
  .as('auth.logout')

router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('admin.index')
    router.get('/users', [UsersController, 'index']).as('admin.users.index')
  })
  .use([middleware.auth(), middleware.isAdmin()])
  .prefix('admin')
