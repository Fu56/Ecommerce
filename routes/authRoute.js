import express from 'express'
import {loginController, registerController, testController,forgetPasswordController} from '../controllers/auth.controller.js'
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";


//route object
const router = express.Router()
//routing
//REGISTER || METHODE POST
router.post('/register',registerController)
//LOGIN || METHODE POST
router.post('/login',loginController)
//forget password || POST
router.post('/forgot-password',forgetPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;