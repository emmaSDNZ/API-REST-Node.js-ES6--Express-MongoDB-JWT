import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
    const expiresIn = 100 * 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
};


export const generateRefreshToken = (uid, res)=>{
    const expiresIn = 60*60*24*30
    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH,{ expiresIn })
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            secure: !(process.env.MODO === 'developper'), 
            expiresIn: new Date(Date.now() + expiresIn)
        })
    } catch (error) {
     console.log(error)   
    }
}

export  const tokenVerificationError = {
    "invalid signature" : "La firma del JWT no es valida",
    "jwt expired" : "JWT expirado",
    "invalid token" : "Token no valido",
    "No Bearer" : "Utiliza forma Bearer",
    "jwt malformed": "JWT formato no valido"
}