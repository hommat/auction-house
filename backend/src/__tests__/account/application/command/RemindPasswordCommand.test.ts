import { RemindPasswordCommand } from '@account/application/command';
import { mockEmail1 } from '@mocks/account';
import { CommandInvalidInputException } from '@shared-kernel/command/exception';

describe('RemindPasswordCommand', () => {
  describe('create', () => {
    it('should throw CommandInvalidInputException when email is not valid', () => {
      expect(() => RemindPasswordCommand.create('')).toThrow(CommandInvalidInputException);
    });

    it('should return RemindPasswordCommand when input is valid', () => {
      const remindPasswordCommand = RemindPasswordCommand.create(mockEmail1().value);

      expect(remindPasswordCommand.email.equals(mockEmail1())).toBe(true);
    });
  });
});
