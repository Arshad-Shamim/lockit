import {Router} from 'express';  
import {expressjwt} from 'express-jwt';       //for valid token;

import {signup,signin,validateToken,generatePws,storeData,getData,deleteData,sortData} from '../controller/user.mjs';

const router = Router();

router.post("/signup/store",signup);
router.get("/signin/authenticate",signin);
router.get("/",expressjwt({algorithms:['HS256'],secret:"hello user"}),validateToken);
router.get("/randompws",generatePws);
router.post("/data/store",expressjwt({algorithms:['HS256'],secret:"hello user"}),storeData);
router.get("/data",expressjwt({algorithms:['HS256'],secret:"hello user"}),getData);
router.delete("/data/delete",expressjwt({algorithms:['HS256'],secret:"hello user"}),deleteData);
router.get("/data/sort",expressjwt({algorithms:['HS256'],secret:"hello user"}),sortData);

export {router};


//here we check wheather user is authorize or not 
//if not so error fn specifed in api/index.mjs is run;
//else coresponding function is run;