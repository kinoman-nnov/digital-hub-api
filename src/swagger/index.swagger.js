import baseSwagger from "./base.swagger.js";
import { mainPageSwagger } from "./paths/mainPage.swagger.js";
import { registrationSwagger } from "./paths/reg.swagger.js";
import { loginSwagger } from "./paths/login.swagger.js";
import { usersSwagger } from './paths/users.swagger.js';
import { profileSwagger } from './paths/profile.swagger.js';

const swagger = {
  ...baseSwagger,
  paths: {
    ...mainPageSwagger.paths,
    ...registrationSwagger.paths,
    ...loginSwagger.paths,
    ...usersSwagger.paths,
    ...profileSwagger.paths
  },
  components: {
    ...baseSwagger.components,
    schemas: {
      ...baseSwagger.components.schemas,
      ...(mainPageSwagger.components?.schemas || {}),
      ...(registrationSwagger.components?.schemas || {}),
      ...(loginSwagger.components?.schemas || {}),
      ...(usersSwagger.components?.schemas || {}),
      ...(profileSwagger.components?.schemas || {}),
    }
  }
};

export default swagger;