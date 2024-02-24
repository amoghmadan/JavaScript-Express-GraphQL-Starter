import {Router} from 'express';

import {accountsController} from '@/controllers';

// eslint-disable-next-line new-cap
const accountsRouter = Router();
accountsRouter.route('/login').post(accountsController.login);

export default accountsRouter;
