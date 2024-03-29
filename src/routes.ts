import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/coursesController'
import { episodesControler } from './controllers/episodesController'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoritesController'
import { likesController } from './controllers/likesController'
import { userController } from './controllers/userController'

const router = express.Router()

router.post('/auth/register',authController.register,)
router.post('/auth/login',authController.login)

router.get('/categories', ensureAuth ,categoriesController.index)
router.get('/categories/:id',ensureAuth,categoriesController.show)

router.get('/courses/featured',ensureAuth,coursesController.featured)
router.get('/courses/newest',coursesController.newest)
router.get('/courses/popular',ensureAuth,coursesController.popular)
router.get('/courses/search',ensureAuth,coursesController.search)
router.get('/courses/:id',ensureAuth,coursesController.show)

router.get('/episodes/stream',ensureAuthViaQuery,episodesControler.stream)
router.get('/watching',ensureAuth,episodesControler.userListWatchTime)
router.get('/episodes/:id/watchTime',ensureAuth,episodesControler.getWatchTime)
router.post('/episodes/:id/watchTime',ensureAuth,episodesControler.setWatchTime)

router.post('/favorites',ensureAuth,favoritesController.save)
router.get('/favorites',ensureAuth,favoritesController.index)
router.delete('/favorites',ensureAuth,favoritesController.delete)

router.post('/likes',ensureAuth,likesController.save)
router.delete('/likes',ensureAuth,likesController.delete)

router.get('/account',ensureAuth,userController.show)
router.put('/account',ensureAuth,userController.update)
router.put('/account/password',ensureAuth,userController.updatePassword)



export {router}