import { RemindPasswordCommand } from '@account/application/command';
import { mockEmail1 } from '@mocks/account';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('RemindPasswordCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when email is not valid', () => {
      expect(() => RemindPasswordCommand.create('')).toThrow(InvalidInputException);
    });

    it('should return RemindPasswordCommand when input is valid', () => {
      const remindPasswordCommand = RemindPasswordCommand.create(mockEmail1().value);

      expect(remindPasswordCommand.email.equals(mockEmail1())).toBe(true);
    });
  });
});
