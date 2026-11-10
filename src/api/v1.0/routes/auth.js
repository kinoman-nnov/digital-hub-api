import Router from "@koa/router";
import { login, register, refreshToken } from '../controllers/authCtrl.js';

const router = new Router();

router.post('/login', login);
router.post('/registration', register);
router.post('/refresh-token', refreshToken);

export default router;