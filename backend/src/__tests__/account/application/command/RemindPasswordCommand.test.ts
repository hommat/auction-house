import { RemindPasswordCommand } from '@account/application/command';
import { RemindPasswordCommandInput } from '@account/application/command/input';
import { mockEmail1 } from '@mocks/account';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('RemindPasswordCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when email is not valid', () => {
      const input = new RemindPasswordCommandInput('');

      expect(() => RemindPasswordCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should return RemindPasswordCommand when input is valid', () => {
      const input = new RemindPasswordCommandInput(mockEmail1().value);
      const remindPasswordCommand = RemindPasswordCommand.create(input);

      expect(remindPasswordCommand.email.equals(mockEmail1())).toBe(true);
    });
  });
});
