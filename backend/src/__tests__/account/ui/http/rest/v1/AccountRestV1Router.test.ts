import { FastifyInstance, RouteOptions } from 'fastify';

import { AccountRestV1Router, IAccountRestV1Controller } from '@account/ui/http/rest/v1';
import { HttpMethod } from '@ui/http';

class MockAccountRestV1Controller implements IAccountRestV1Controller {
  public createAccount = jest.fn(() => Promise.resolve());

  public mockCreateAccount = this.createAccount;
}

let router: AccountRestV1Router;
let routes: RouteOptions[] = [];
let controller: MockAccountRestV1Controller;

beforeEach(() => {
  routes = [];
  controller = new MockAccountRestV1Controller();

  const server: Partial<FastifyInstance> = {
    route: jest.fn((r) => routes.push(r)) as any,
  };

  router = new AccountRestV1Router(server as FastifyInstance, {} as any, controller);
  router.registerRoutes();
});

describe('AccountRestV1Router', () => {
  describe('registerRoutes', () => {
    describe('create account route', () => {
      const url = '/account/create';
      let createAccountRoute: any;

      beforeEach(() => {
        createAccountRoute = routes.find((r) => r.url === url)!;
      });

      it(`should have ${url}`, () => {
        expect(createAccountRoute.url).toBe(url);
      });

      it('should have HTTP method POST', () => {
        expect(createAccountRoute.method).toBe(HttpMethod.POST);
      });

      it('should call createAccount controller method', () => {
        createAccountRoute.handler();

        expect(controller.mockCreateAccount.mock.calls.length).toBe(1);
      });
    });
  });
});
