import Router from "@koa/router";
import { refreshToken } from "../controllers/auth/refreshTokenCtrl.js";

const router = new Router();

router.post('/refresh-token', refreshToken);

export default router;