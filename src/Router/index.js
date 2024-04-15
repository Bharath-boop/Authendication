import express from 'express'
import UserRouter from './user.js'
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('<h1>authendication<h1>')
})
router.use('/user',UserRouter)

export default router