import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandInput } from '@account/application/command/input';
import { mockEmail1, mockLogin1, mockPassword1 } from '@mocks/account';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('CreateAccountCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when email is not valid', () => {
      const input = new CreateAccountCommandInput('', mockLogin1().value, mockPassword1().value);

      expect(() => CreateAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when login is not valid', () => {
      const input = new CreateAccountCommandInput(mockEmail1().value, '', mockPassword1().value);

      expect(() => CreateAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when password is not valid', () => {
      const input = new CreateAccountCommandInput(mockEmail1().value, mockLogin1().value, '');

      expect(() => CreateAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should return CreateAccountCommand when input is valid', () => {
      const input = new CreateAccountCommandInput(
        mockEmail1().value,
        mockLogin1().value,
        mockPassword1().value
      );
      const createAccountCommand = CreateAccountCommand.create(input);

      expect(createAccountCommand.email.equals(mockEmail1())).toBe(true);
      expect(createAccountCommand.login.equals(mockLogin1())).toBe(true);
      expect(createAccountCommand.password.equals(mockPassword1())).toBe(true);
    });
  });
});
