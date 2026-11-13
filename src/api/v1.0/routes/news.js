import Router from "@koa/router";
import {
  getNews,
  postNews,
  patchNews,
  deleteNews
} from '../controllers/newsCtrl.js';
import { checkAuth } from "../../../middlewares/checkAuth.js";

const router = new Router();

router.use(checkAuth);

router.get('/', getNews);
router.post('/', postNews);
router.patch('/:id', patchNews);
router.delete('/:id', deleteNews);

export default router;