import baseSwagger from "./base.swagger.js";
import { mainPageSwagger } from "./paths/mainPage.swagger.js";
import { authSwagger } from "./paths/auth.swagger.js";
import { usersSwagger } from './paths/users.swagger.js';
import { profileSwagger } from './paths/profile.swagger.js';
import { newsSwagger } from './paths/news.swagger.js';

const swagger = {
  ...baseSwagger,
  paths: {
    ...mainPageSwagger.paths,
    ...authSwagger.paths,
    ...usersSwagger.paths,
    ...profileSwagger.paths,
    ...newsSwagger.paths
  },
  components: {
    ...baseSwagger.components,
    schemas: {
      ...baseSwagger.components.schemas,
      ...(mainPageSwagger.components?.schemas || {}),
      ...(authSwagger.components?.schemas || {}),
      ...(usersSwagger.components?.schemas || {}),
      ...(profileSwagger.components?.schemas || {}),
      ...(newsSwagger.components?.schemas || {})
    }
  }
};

export default swagger;