import express from 'express'
const router = express.Router()
import {getLinks} from '../controllers/link.controllers.js'
import { requireToken } from '../middlewares/requireToken.js';

//GET       api/v1/links                all links
//GET       api/v1/links/:nanoLink      search Link,
//POST      api/v1/links                create Link
//Patch     api/v1/links                update Link
//DELETE    api/v1/link/:nanoLink       remove Link

router.get('/', requireToken, getLinks)

export default router;