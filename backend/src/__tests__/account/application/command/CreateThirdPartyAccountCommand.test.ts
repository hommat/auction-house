import { CreateThirdPartyAccountCommand } from '@account/application/command';
import { CreateThirdPartyAccountCommandInput } from '@account/application/command/input';
import {
  mockEmail1,
  mockThirdPartyAccountId1,
  mockThirdPartyAccountService1,
} from '@mocks/account';
import { InvalidInputException } from '@shared-kernel/cqrs/exception';

describe('CreateThirdPartyAccountCommand', () => {
  describe('create', () => {
    it('should throw InvalidInputException when email is not valid', () => {
      const input = new CreateThirdPartyAccountCommandInput(
        '',
        mockThirdPartyAccountId1().value,
        mockThirdPartyAccountService1().type
      );

      expect(() => CreateThirdPartyAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when thirdPartyAccountId is not valid', () => {
      const input = new CreateThirdPartyAccountCommandInput(
        mockEmail1().value,
        '',
        mockThirdPartyAccountService1().type
      );

      expect(() => CreateThirdPartyAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should throw InvalidInputException when thirdPartyAccountService is not valid', () => {
      const input = new CreateThirdPartyAccountCommandInput(
        mockEmail1().value,
        mockThirdPartyAccountId1().value,
        ''
      );

      expect(() => CreateThirdPartyAccountCommand.create(input)).toThrow(InvalidInputException);
    });

    it('should return CreateThirdPartyAccountCommandInput when input is valid', () => {
      const input = new CreateThirdPartyAccountCommandInput(
        mockEmail1().value,
        mockThirdPartyAccountId1().value,
        mockThirdPartyAccountService1().type
      );

      const createThirdPartyAccountCommand = CreateThirdPartyAccountCommand.create(input);

      expect(createThirdPartyAccountCommand.email.equals(mockEmail1())).toBe(true);
      expect(
        createThirdPartyAccountCommand.thirdPartyAccountId.equals(mockThirdPartyAccountId1())
      ).toBe(true);
      expect(
        createThirdPartyAccountCommand.thirdPartyAccountService.equals(
          mockThirdPartyAccountService1()
        )
      ).toBe(true);
    });
  });
});
