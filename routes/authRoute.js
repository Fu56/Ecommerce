import express from 'express'
import {loginController, registerController, testController} from '../controllers/auth.controller.js'
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";


//route object
const router = express.Router()
//routing
//REGISTER || METHODE POST
router.post('/register',registerController)
//LOGIN || METHODE POST
router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)


export default router;