import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from '../ultis/tokenManager.js';

export const register = async(req, res)=>{
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(user) throw {code: 11000}
        user = new User({email, password})
        await user.save()
        return res.json({ok : "register"})
    } catch (error) {
        console.log(error)
        if(error.code === 11000) {
            return res.json({error: "El usuario ya existe "})
        }
    }
};


export const login =  async(req, res)=>{
    const {email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){return res.json({error: "No existe el Usuario"})}
        const passwordCandidate = await user.comparePassword(password)
        if(!passwordCandidate) {
            return res.json({error: "Constraseña Incorrecta"})
        }
        // token
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        
        
        return res.json({ token, expiresIn})
    }catch(error){
        console.log(error)
        return res.json({error: "Error de servidor"})
    }
};


export const infoUser = async(req, res)=>{
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({uid:user._id, email: user.email})
    } catch (error) {
        return res.json({error: "Error de servidor"})
    }
}


export const refreshTokenCookie = (req, res) => {
   try {
  
    const {token, expiresIn} = generateToken(req.uid)
    return res.json( {token, expiresIn})
    
   } catch (error) {
    console.log(error)
    return res.json({error: "Error de servidor"})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshTokenCookie')
    res.json({ ok: "logout"})
}