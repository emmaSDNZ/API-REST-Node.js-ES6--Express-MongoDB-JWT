import express from 'express'

import {createLink, getLink, getLinks, removeLink, updateLink} from '../controllers/link.controllers.js'
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLinkValidator, paramLinkValidator } from '../middlewares/validatorManager.js';

//GET       api/v1/links                all links
//GET       api/v1/links/:id            search Link,
//POST      api/v1/links                create Link
//Patch     api/v1/links                update Link
//DELETE    api/v1/link/:nanoLink       remove Link
const router = express.Router()

router.get('/', requireToken, getLinks)
router.get('/:nanoLink', getLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.delete('/:id', requireToken,paramLinkValidator, removeLink)
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator,updateLink)


export default router;