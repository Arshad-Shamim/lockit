import {Router} from 'express'
import { sendEmail } from '../controller/email.mjs';

const router =Router();

router.post("/varify",sendEmail)

export {router};