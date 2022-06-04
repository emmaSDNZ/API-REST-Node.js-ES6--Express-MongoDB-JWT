import { nanoid } from 'nanoid'
import Link from '../models/Link.js'

export const  getLinks = async(req,res)=>{
  try {
      const links = await Link.find({uid: req.uid})
      return res.json({links})
  } catch (error) {
      console.log(error)
      return res.json({error: "Error de servidor"})
  }
}

export const getLink = async(req,res)=>{
  try {
    const {nanoLink} = req.params
    const link = await Link.findOne({nanoLink})

    if(!link) return res.json({error: "No existe el Link"})
    
    return res.json({longLink: link.longLink})
  } catch (error) {
    console.log(error)
    if(error.kind === 'ObjectId'){
      return res.json({error: "Formato Incorrecto"})
    }
    return res.json({error: "Error de servidor"})
  }
}

//para crud tradicional
export const getLinkCrudV1 = async(req,res)=>{
  try {
    const {id} = req.params
    const link = await Link.findById(id)

    if(!link) return res.json({error: "No existe el Link"})
    if(!link.uid.equals(req.uid)) return res.json({error: "Id no valido para el usuario"})
    return res.json({link})
  } catch (error) {
    console.log(error)
    if(error.kind === 'ObjectId'){
      return res.json({error: "Formato Incorrecto"})
    }
    return res.json({error: "Error de servidor"})
  }
}

export const createLink = async(req, res)=>{
  
  try {
    let {longLink} = req.body
    if(!longLink.startsWith('http://'))
    {
      longLink = "https://" + longLink;
    }
    const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
    const newLink= await link.save()
    return res.json({newLink})
  } catch (error) {
    console.log(error)
      return res.json({error: "Error de servidor"})
  }
}

export const removeLink = async(req,res)=>{
  try {
    const {id} = req.params
    const link = await Link.findById(id)

    if(!link) return res.json({error: "No existe el Link"})
    if(!link.uid.equals(req.uid)) return res.json({error: "Id no valido para el usuario"})
    await link.remove()
    return res.json({link})
  } catch (error) {
    console.log(error)
    if(error.kind === 'ObjectId'){
      return res.json({error: "Formato Incorrecto"})
    }
    return res.json({error: "Error de servidor"})
  }
}

export const updateLink = async()=>{
  try {

    const {id} = req.params;
    let {longLink} =  req.body;
    
    if(!longLink.startsWith('http://'))
    {
      longLink = "https://" + longLink;
    }

    const link = await Link.findById(id)
    if(!link) return res.json({error: "No existe el Link"})
    if(!link.uid.equals(req.uid)) return res.json({error: "Id no valido para el usuario"})
    
    //actualizar
    link.longLink = longLink
    await link.save({longLink})

    return res.json({link})
  } catch (error) {
    console.log(error)
    if(error.kind === 'ObjectId'){
      return res.json({error: "Formato Incorrecto"})
    }
    return res.json({error: "Error de servidor"})
  }
}