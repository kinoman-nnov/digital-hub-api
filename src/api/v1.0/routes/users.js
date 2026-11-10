import Router from "@koa/router";
import { getUsers, deleteUser } from "../controllers/usersCtrl.js";

const router = new Router();

router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;