import {accountsService} from '@/services';

const queries = {
  user: async (parent, args, context, info) => {
    const data = await accountsService.detail(args.user);
    return data;
  },
  logout: async (parent, args, context, info) => {
    const data = await accountsService.logout(args.user);
    return data;
  },
};

export default queries;
