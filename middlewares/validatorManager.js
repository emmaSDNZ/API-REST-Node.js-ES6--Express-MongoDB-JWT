
import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
};

export const bodyRegisterValidator = [
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
    }),
    validationResultExpress
]

export const bodyLoginValidator = [
    body("email", "Ingrese un email válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Contraseña mínimo 4 carácteres')
    .trim()
    .isLength({ min: 4 }),
    validationResultExpress,
]