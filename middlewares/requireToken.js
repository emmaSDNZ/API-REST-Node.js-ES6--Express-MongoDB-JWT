import jwt from 'jsonwebtoken'

export const requireToken = async ( req,res,next) =>{
    try {
        let token = req.headers?.authorization
        console.log(req.headers)
        if(!token) throw new Error('Invalid, formato Bearer token')

         //verificacion del token
        token = token.split(' ')[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        
        req.uid = uid
        next()

    } catch (error) {
         console.log(error)

         const TokenVerificationError ={
             "invalid signature" : "La firma del JWT no es valida",
             "jwt expired" : "JWT expirado",
             "invalid token" : "Token no valido",
             "No Bearer" : "Utiliza forma Bearer",
             "jwt malformed": "JWT formato no valido"

         }
         return res.json({error: TokenVerificationError[error.message]})
    }
}