import { LoginAlreadyInUseException } from '@account/application/exception';
import { AccountRestV1ErrorHandler } from '@account/ui/http/rest/v1';
import { MockFastifyReply, mockReply } from '@mocks/ui/http/rest/v1';
import { mockPrototypeOnceWithoutResponse } from '@mocks/utils';
import { HttpStatusCode } from '@ui/http';
import { HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

let handler: AccountRestV1ErrorHandler;
let reply: MockFastifyReply;

beforeEach(() => {
  handler = new AccountRestV1ErrorHandler();
  reply = mockReply();
});

describe('AccountRestV1ErrorHandler', () => {
  describe('handle', () => {
    describe('LoginAlreadyInUseException', () => {
      let loginAlreadyInUseException: LoginAlreadyInUseException;

      beforeEach(() => {
        loginAlreadyInUseException = new LoginAlreadyInUseException();
      });

      it('should have HTTP status code 409', () => {
        handler.handle(loginAlreadyInUseException, reply);

        expect(reply.mockCode.mock.calls.length).toBe(1);
        expect(reply.mockCode.mock.calls[0][0]).toBe(HttpStatusCode.CONFLICT);
      });

      it('should send validation error converted to dto', () => {
        handler.handle(loginAlreadyInUseException, reply);

        expect(reply.mockSend.mock.calls.length).toBe(1);
        expect(reply.mockSend.mock.calls[0][0]).toEqual(loginAlreadyInUseException.toDTO());
      });
    });

    it('delegates error to parent', () => {
      const mockParentHandler = jest.fn();
      mockPrototypeOnceWithoutResponse(HttpRestV1ErrorHandler, 'handle', mockParentHandler);

      const err = new Error();
      handler.handle(err, reply);

      expect(mockParentHandler.mock.calls.length).toBe(1);
      expect(mockParentHandler.mock.calls[0][0]).toBe(err);
      expect(mockParentHandler.mock.calls[0][1]).toBe(reply);
    });
  });
});
