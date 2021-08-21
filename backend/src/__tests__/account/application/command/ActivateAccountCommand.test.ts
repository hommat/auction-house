import { ActivateAccountCommand } from '@account/application/command';
import { mockUuid1 } from '@mocks/shared-kernel';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('ActivateAccountCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when activationTokenUuid is not valid', () => {
      expect(() => ActivateAccountCommand.create('')).toThrow(InvalidInputException);
    });

    it('should return ActivateAccountCommand when input is valid', () => {
      const activateAccountCommand = ActivateAccountCommand.create(mockUuid1().value);

      expect(activateAccountCommand.activationTokenUuid.equals(mockUuid1())).toBe(true);
    });
  });
});
