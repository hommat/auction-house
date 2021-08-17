import { MockFastifyReply, mockReply } from '@mocks/ui/http/rest/v1';
import { CommandInvalidInputException } from '@shared-kernel/command/exception';
import { ValidationFailedException, ValidationErrorFactory } from '@shared-kernel/validation';
import { HttpStatusCode } from '@ui/http';
import { HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

let handler: HttpRestV1ErrorHandler;
let reply: MockFastifyReply;

beforeEach(() => {
  handler = new HttpRestV1ErrorHandler();
  reply = mockReply();
});

describe('HttpRestV1ErrorHandler', () => {
  describe('handle', () => {
    describe('CommandInvalidInputException', () => {
      const alreadyInUseError = ValidationErrorFactory.createAlreadyInUse();
      const tooLongError = ValidationErrorFactory.createTooLong(10);

      const firstException = new ValidationFailedException('field1', {
        [alreadyInUseError.type]: alreadyInUseError.details,
        [tooLongError.type]: tooLongError.details,
      });

      const secondException = new ValidationFailedException('field2', {
        [alreadyInUseError.type]: alreadyInUseError.details,
      });

      let commandInvalidInputException: CommandInvalidInputException;

      beforeEach(() => {
        commandInvalidInputException = new CommandInvalidInputException([
          firstException,
          secondException,
        ]);
      });

      it('should have HTTP status code 400', () => {
        handler.handle(commandInvalidInputException, reply);

        expect(reply.mockCode.mock.calls.length).toBe(1);
        expect(reply.mockCode.mock.calls[0][0]).toBe(HttpStatusCode.BAD_REQUEST);
      });

      it('should send validation error array converted to dto', () => {
        handler.handle(commandInvalidInputException, reply);

        expect(reply.mockSend.mock.calls.length).toBe(1);
        expect(reply.mockSend.mock.calls[0][0]).toEqual({
          errors: [firstException.toDTO(), secondException.toDTO()],
        });
      });
    });

    describe('ValidationFailedException', () => {
      const alreadyInUseError = ValidationErrorFactory.createAlreadyInUse();

      let validationFailedException: ValidationFailedException;

      beforeEach(() => {
        validationFailedException = new ValidationFailedException('field1', {
          [alreadyInUseError.type]: [alreadyInUseError.details],
        });
      });

      it('should have HTTP status code 400', () => {
        handler.handle(validationFailedException, reply);

        expect(reply.mockCode.mock.calls.length).toBe(1);
        expect(reply.mockCode.mock.calls[0][0]).toBe(HttpStatusCode.BAD_REQUEST);
      });

      it('should send validation error converted to dto', () => {
        handler.handle(validationFailedException, reply);

        expect(reply.mockSend.mock.calls.length).toBe(1);
        expect(reply.mockSend.mock.calls[0][0]).toEqual(validationFailedException.toDTO());
      });
    });

    describe('unknown exception', () => {
      let unknownException: Error;

      beforeEach(() => {
        unknownException = new Error();
      });

      it('should have HTTP status code 500', () => {
        handler.handle(unknownException, reply);

        expect(reply.mockCode.mock.calls.length).toBe(1);
        expect(reply.mockCode.mock.calls[0][0]).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
      });
    });
  });
});
