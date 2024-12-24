import {Router} from 'express'

import { sendEmail,verifyEmail } from '../controller/email.mjs';

const router =Router();

router.post("/verifylink",sendEmail);
router.get("/verified",verifyEmail);

export {router};