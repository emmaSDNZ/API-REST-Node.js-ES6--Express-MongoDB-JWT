import express from 'express'
import {
    register,
    login,
    infoUser,
    refreshTokenCookie,
    logout,
} from '../controllers/auth.controller.js'
import {requireToken} from '../middlewares/requireToken.js'
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyRegisterValidator, bodyLoginValidator } from '../middlewares/validatorManager.js';


const router = express.Router()

router.post('/register', bodyRegisterValidator, register)

router.post('/login', bodyLoginValidator, login)

router.get('/protected', requireToken ,infoUser)

router.get('/refresh', requireRefreshToken ,refreshTokenCookie)

router.all('/logout', logout)

export default router;
