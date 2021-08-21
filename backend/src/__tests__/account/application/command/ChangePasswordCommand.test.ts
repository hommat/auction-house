import { ChangePasswordCommand } from '@account/application/command';
import { mockPassword1 } from '@mocks/account';
import { mockUuid1 } from '@mocks/shared-kernel';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('ChangePasswordCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when changePasswordTokenUuid is not valid', () => {
      expect(() => ChangePasswordCommand.create('', mockPassword1().value)).toThrow(
        InvalidInputException
      );
    });

    it('should throw InvalidInputException when password is not valid', () => {
      expect(() => ChangePasswordCommand.create(mockUuid1().value, '')).toThrow(
        InvalidInputException
      );
    });

    it('should return ChangePasswordCommand when input is valid', () => {
      const changePasswordCommand = ChangePasswordCommand.create(
        mockUuid1().value,
        mockPassword1().value
      );

      expect(changePasswordCommand.changePasswordTokenUuid.equals(mockUuid1())).toBe(true);
      expect(changePasswordCommand.password.equals(mockPassword1())).toBe(true);
    });
  });
});
