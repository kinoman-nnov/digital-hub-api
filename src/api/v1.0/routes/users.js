import Router from "@koa/router";
import { users } from "../controllers/usersCtrl.js";

const router = new Router();

router.get('/', users);

export default router;