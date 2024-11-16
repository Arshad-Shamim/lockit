import {Router} from 'express';
import {signup} from '../controller/user.mjs';

const router = Router();

router.post("/signup/store",signup);

export {router};