import express from 'express'
import { body } from "express-validator";
import {
    register,
    login,
    infoUser,
    refreshTokenCookie,
    logout,
} from '../controllers/auth.controller.js'

import {validationResultExpress} from '../middlewares/validationResultExpress.js'
import {requireToken} from '../middlewares/requireToken.js'


const router = express.Router()

router.post('/register',[
    body("email", "Ingrese un email válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Contraseña mínimo 4 carácteres')
    .trim()
    .isLength({ min: 4 }),
    body('password', 'Credenciales invalidad')
    .custom((value, { req }) => {
        if (value !== req.body.repassword) {
            throw new Error("No coinciden las contraseñas");
        }
        return value;
    })
],
validationResultExpress,
register)


router.post('/login',[
    body("email", "Ingrese un email válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Contraseña mínimo 4 carácteres')
    .trim()
    .isLength({ min: 4 }),
],
validationResultExpress,
login)

router.get('/protected', requireToken ,infoUser)

router.get('/refresh', refreshTokenCookie)

router.all('/logout', logout)

export default router;
