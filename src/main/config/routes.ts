import { Router, type Express } from 'express';
import fg from 'fast-glob';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router)
  // eslint-disable-next-line array-callback-return
  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
