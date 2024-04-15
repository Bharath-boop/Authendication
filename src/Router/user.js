import express from 'express'
import userController from '../Controller/user.js'
import Auth from '../utils/auth.js'
const router=express.Router()

router.get('/',Auth.autherization,Auth.adminGurd,userController.getAllUsers)
router.get('/:id',userController.getUserById)
router.post('/createUser',userController.createUser)
router.post('/login',userController.login)

export default router