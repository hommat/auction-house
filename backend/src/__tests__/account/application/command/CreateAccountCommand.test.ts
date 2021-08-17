import { CreateAccountCommand } from '@account/application/command';
import { mockEmail1, mockLogin1, mockPassword1 } from '@mocks/account';
import { CommandInvalidInputException } from '@shared-kernel/command/exception';

describe('CreateAccountCommand', () => {
  describe('create', () => {
    it('should throw CommandInvalidInputException when email is not valid', () => {
      expect(() =>
        CreateAccountCommand.create('', mockLogin1().value, mockPassword1().value)
      ).toThrow(CommandInvalidInputException);
    });

    it('should throw CommandInvalidInputException when login is not valid', () => {
      expect(() =>
        CreateAccountCommand.create(mockEmail1().value, '', mockPassword1().value)
      ).toThrow(CommandInvalidInputException);
    });

    it('should throw CommandInvalidInputException when password is not valid', () => {
      expect(() => CreateAccountCommand.create(mockEmail1().value, mockLogin1().value, '')).toThrow(
        CommandInvalidInputException
      );
    });

    it('should return CreateAccountCommand when input is valid', () => {
      const createAccountCommand = CreateAccountCommand.create(
        mockEmail1().value,
        mockLogin1().value,
        mockPassword1().value
      );

      expect(createAccountCommand.email.equals(mockEmail1())).toBe(true);
      expect(createAccountCommand.login.equals(mockLogin1())).toBe(true);
      expect(createAccountCommand.password.equals(mockPassword1())).toBe(true);
    });
  });
});
