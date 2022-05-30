import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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
        const token = jwt.sign( { uid : user.id }, process.env.JWT_SECRET)
        return res.json({ token })
    }catch(error){
        console.log(error)
        return res.json({error: "Error de servidor"})
    }
};