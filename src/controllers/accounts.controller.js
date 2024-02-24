import {ValidationError} from 'joi';

import {accountsService} from '@/services';

export default {
  login: async (request, response) => {
    try {
      const data = await accountsService.login(request.body);
      if (!data) {
        return response.status(401).json({detail: 'Invalid credentials!'});
      }
      return response.status(201).json(data);
    } catch (err) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err.details);
      }
      return response.status(500).json(err);
    }
  },
};
