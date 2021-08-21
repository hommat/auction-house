import { ChangePasswordCommand } from '@account/application/command';
import { ChangePasswordCommandInput } from '@account/application/command/input';
import { mockPassword1 } from '@mocks/account';
import { mockUuid1 } from '@mocks/shared-kernel';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('ChangePasswordCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when changePasswordTokenUuid is not valid', () => {
      const input = new ChangePasswordCommandInput('', mockPassword1().value);

      expect(() => ChangePasswordCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when password is not valid', () => {
      const input = new ChangePasswordCommandInput(mockUuid1().value, '');

      expect(() => ChangePasswordCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should return ChangePasswordCommand when input is valid', () => {
      const input = new ChangePasswordCommandInput(mockUuid1().value, mockPassword1().value);
      const changePasswordCommand = ChangePasswordCommand.create(input);

      expect(changePasswordCommand.changePasswordTokenUuid.equals(mockUuid1())).toBe(true);
      expect(changePasswordCommand.password.equals(mockPassword1())).toBe(true);
    });
  });
});
