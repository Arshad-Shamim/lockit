import {Router} from 'express';
import {signup,signin} from '../controller/user.mjs';

const router = Router();

router.post("/signup/store",signup);
router.get("/signin/authenticate",signin);

export {router};