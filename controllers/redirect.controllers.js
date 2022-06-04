import Link from "../models/Link.js"

export const redirectLink = async(req, res)=>{
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({nanoLink})
    
        if(!link) return res.json({error: "No existe el Link"})
        
        return res.redirect(link.longLink)
      } catch (error) {
        console.log(error)
        if(error.kind === 'ObjectId'){
          return res.json({error: "Formato Incorrecto"})
        }
        return res.json({error: "Error de servidor"})
      }

}