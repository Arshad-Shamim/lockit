import {Router} from 'express';  
import {expressjwt} from 'express-jwt';       //for valid token;

import {signup,signin,validateToken,generatePws} from '../controller/user.mjs';

const router = Router();

router.post("/signup/store",signup);
router.get("/signin/authenticate",signin);
router.get("/",expressjwt({algorithms:['HS256'],secret:"hello user"}),validateToken);
router.get("/randompws",generatePws);

export {router};