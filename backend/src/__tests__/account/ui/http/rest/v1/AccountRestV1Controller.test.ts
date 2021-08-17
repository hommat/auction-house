import { FastifyRequest } from 'fastify';

import { CreateAccountCommand } from '@account/application/command';
import { AccountRestV1Controller } from '@account/ui/http/rest/v1';
import { CreateAccountDTO } from '@account/ui/http/rest/v1/dto';
import { mockEmail1, mockLogin1, mockPassword1 } from '@mocks/account/';
import { mockReply, mockRequest, MockFastifyReply } from '@mocks/ui/http/rest/v1';
import { mockCommandDispatcher, MockCommandDispatcher } from '@mocks/shared-kernel/command';
import { HttpStatusCode } from '@ui/http';

let controller: AccountRestV1Controller;
let dispatcher: MockCommandDispatcher;

let request: FastifyRequest;
let reply: MockFastifyReply;

beforeEach(() => {
  dispatcher = mockCommandDispatcher();
  controller = new AccountRestV1Controller(dispatcher);

  reply = mockReply();
});

describe('AccountRestV1Controller', () => {
  describe('createAccount', () => {
    beforeEach(() => {
      const body: CreateAccountDTO = {
        email: mockEmail1().value,
        login: mockLogin1().value,
        password: mockPassword1().value,
      };

      request = mockRequest(body);
    });

    it('should dispatch CreateAccountCommand with data from request body', async () => {
      await controller.createAccount(request, reply);

      expect(dispatcher.mockDispatch.mock.calls.length).toBe(1);

      const command: CreateAccountCommand = dispatcher.mockDispatch.mock.calls[0][0];
      expect(mockEmail1().equals(command.email)).toBe(true);
      expect(mockLogin1().equals(command.login)).toBe(true);
      expect(mockPassword1().equals(command.password)).toBe(true);
    });

    it('should return http status code 201', async () => {
      await controller.createAccount(request, reply);

      expect(reply.mockCode.mock.calls.length).toBe(1);
      expect(reply.mockCode.mock.calls[0][0]).toBe(HttpStatusCode.CREATED);
    });
  });
});
