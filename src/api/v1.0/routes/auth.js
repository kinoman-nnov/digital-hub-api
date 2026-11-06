import Router from "@koa/router";
import { login } from '../controllers/auth/loginCtrl.js';
import { register } from '../controllers/auth/regCtrl.js';

const router = new Router();

router.post('/login', login);
router.post('/registration', register);

export default router;