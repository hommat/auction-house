import { CreateAccountCommand } from '@account/application/command';
import { mockLogin1, mockPassword1 } from '@mocks/account';
import { CommandInvalidInputException } from '@shared-kernel/command/exception';

describe('CreateAccountCommand', () => {
  describe('create', () => {
    it('should throw CommandInvalidInputException when login is not valid', () => {
      expect(() => CreateAccountCommand.create('', mockPassword1().value)).toThrow(
        CommandInvalidInputException
      );
    });

    it('should throw CommandInvalidInputException when password is not valid', () => {
      expect(() => CreateAccountCommand.create(mockLogin1().value, '')).toThrow(
        CommandInvalidInputException
      );
    });

    it('should return CreateAccountCommand when input is valid', () => {
      const createAccountCommand = CreateAccountCommand.create(
        mockLogin1().value,
        mockPassword1().value
      );

      expect(createAccountCommand.login).toBeTruthy();
      expect(createAccountCommand.password).toBeTruthy();
    });
  });
});
