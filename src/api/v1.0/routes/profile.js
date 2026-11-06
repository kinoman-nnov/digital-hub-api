import Router from "@koa/router";
import { getProfile, patchProfile } from '../controllers/profileCtrl.js';

import upload from "../../../middlewares/upload.js";

const router = new Router();

router.get('/', getProfile);
router.patch('/', upload.single('avatar'), patchProfile);

export default router;