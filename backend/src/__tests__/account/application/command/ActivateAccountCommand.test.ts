import { ActivateAccountCommand } from '@account/application/command';
import { mockUuid1 } from '@mocks/shared-kernel';
import { CommandInvalidInputException } from '@shared-kernel/command/exception';

describe('ActivateAccountCommand', () => {
  describe('create', () => {
    it('should throw CommandInvalidInputException when activationTokenUuid is not valid', () => {
      expect(() => ActivateAccountCommand.create('')).toThrow(CommandInvalidInputException);
    });

    it('should return ActivateAccountCommand when input is valid', () => {
      const activateAccountCommand = ActivateAccountCommand.create(mockUuid1().value);

      expect(activateAccountCommand.activationTokenUuid.equals(mockUuid1())).toBe(true);
    });
  });
});
