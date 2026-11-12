import Router from "@koa/router";
import {
  getUsers,
  patchUser,
  deleteUser,
  getProfile,
  patchProfile
} from "../controllers/usersCtrl.js";
import upload from "../../../middlewares/upload.js";

const router = new Router();

router.get('/users', getUsers);
router.patch('/users/:id/permission', patchUser);
router.delete('/users/:id', deleteUser);

router.get('/profile', getProfile);
router.patch('/profile', upload.single('avatar'), patchProfile);

export default router;