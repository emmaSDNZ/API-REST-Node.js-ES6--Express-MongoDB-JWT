import express from 'express'
import { redirectLink } from '../controllers/redirect.controllers.js';

const router = express.Router()

router.get('/:nanoLink', redirectLink)

export default router;