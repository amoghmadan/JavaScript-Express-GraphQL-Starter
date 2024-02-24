import mongoose from 'mongoose';
import supertest from 'supertest';

import {getRequestListener} from '@/cli/bootstrap';
import {User} from '@/models';
import {MONGODB_URI} from '@/settings';
import {generateKey} from '@/utils/token';

const GRAPHQL_URL = '/graphql/';
const LOGIN_URL = '/api/accounts/login';
const KEYWORD = 'Token';
const EMAIL = 'account.testuser@email.com';
const CREDENTIALS = {email: EMAIL, password: 'foobarbaz'};

const request = supertest(getRequestListener());

describe('Account API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI);
    await User.create({
      ...CREDENTIALS,
      firstName: 'Account',
      lastName: 'Test User',
      token: {key: generateKey()},
    });
  });

  afterAll(async () => {
    await User.deleteOne({email: EMAIL});
    await mongoose.connection.close();
  });

  describe(`POST ${LOGIN_URL}`, () => {
    it('Incomplete Payload', async () => {
      const response = await request.post(LOGIN_URL).send({email: EMAIL});
      expect(response.status).toBe(400);
    });

    it('Invalid Credentials', async () => {
      const response = await request
          .post(LOGIN_URL)
          .send({email: EMAIL, password: 'foobarba'});
      expect(response.status).toBe(401);
    });

    it('Performs Account Login', async () => {
      const response = await request.post(LOGIN_URL).send(CREDENTIALS);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe(`POST ${GRAPHQL_URL}`, () => {
    it('Returns 401 if not authorized', async () => {
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{user {email}}'});
      expect(response.status).toBe(401);
    });

    it('Returns 401 if Bearer instead of Token', async () => {
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{user {email}}'})
          .set('Authorization', 'Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 401 if more than two value', async () => {
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{user {email}}'})
          .set('Authorization', 'This Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 403 if invalid token', async () => {
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{user {email}}'})
          .set('Authorization', 'Token 0X1X2X3X4X5X6X7X8X');
      expect(response.status).toBe(403);
    });

    it('User Detail', async () => {
      const user = await User.findOne({email: EMAIL});
      console.log({token: user.token.key});
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{user {email}}'})
          .set('Authorization', `${KEYWORD} ${user.token.key}`);
      expect(response.status).toBe(200);
    });

    it('Logout User', async () => {
      const user = await User.findOne({email: EMAIL});
      console.log({token: user.token.key});
      const response = await request
          .post(GRAPHQL_URL)
          .send({query: '{logout {}}'})
          .set('Authorization', `${KEYWORD} ${user.token.key}`);
      expect(response.status).toBe(200);
    });
  });
});
