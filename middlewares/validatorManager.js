
import axios from "axios";
import { validationResult, body,param } from "express-validator";

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
    validationResultExpress
]

export const bodyLinkValidator = [
  body("longLink", "Formato de Link invalido")
  .trim()
  .notEmpty()
  .custom(async value =>{
      try {
          if(!value.startsWith('https://')){
              value = "https://" + value;
          }
         await axios.get(value) 
         return value;
      } catch (error) {
          //console.log(error)
          throw new Error("not found longLink 404");
      }
  })
  ,validationResultExpress
]

export const paramLinkValidator = [
    param('id', 'Formato no valido')
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress

]
