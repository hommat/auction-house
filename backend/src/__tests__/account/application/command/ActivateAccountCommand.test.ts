import { ActivateAccountCommand } from '@account/application/command';
import { ActivateAccountCommandInput } from '@account/application/command/input';
import { mockUuid1 } from '@mocks/shared-kernel';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('ActivateAccountCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when activationTokenUuid is not valid', () => {
      const input = new ActivateAccountCommandInput('');

      expect(() => ActivateAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should return ActivateAccountCommand when input is valid', () => {
      const input = new ActivateAccountCommandInput(mockUuid1().value);
      const activateAccountCommand = ActivateAccountCommand.create(input);

      expect(activateAccountCommand.activationTokenUuid.equals(mockUuid1())).toBe(true);
    });
  });
});
