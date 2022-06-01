import jwt from 'jsonwebtoken'
import {tokenVerificationError} from '../ultis/tokenManager.js'

export const requireRefreshToken = (req,res,next)=>{
    try{
        const refreshTokenCookie = req.cookies.refreshToken
        if(!refreshTokenCookie) throw new Error('No existe el token');
        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        
        req.uid = uid
        next()
    }catch(error){
        console.log(error)
        const tokenVerificationError = {
            "invalid signature" : "La firma del JWT no es valida",
            "jwt expired" : "JWT expirado",
            "invalid token" : "Token no valido",
            "No Bearer" : "Utiliza forma Bearer",
            "jwt malformed": "JWT formato no valido"
        }
        return res.json({error: tokenVerificationError[error.message]})
    }
}
