import { CreateThirdPartyAccountCommand } from '@account/application/command';
import { CreateThirdPartyAccountCommandHandler } from '@account/application/command/handler';
import { CreateThirdPartyAccountCommandInput } from '@account/application/command/input';
import { EmailAlreadyInUseException } from '@account/application/exception';
import { Account, AccountStatus } from '@account/domain';
import {
  mockEmail1,
  mockThirdPartyAccountId1,
  mockThirdPartyAccountService1,
} from '@mocks/account';
import { mockAccountRepository } from '@mocks/account/repository';

let createThirdPartyAccountCommand: CreateThirdPartyAccountCommand;

beforeEach(() => {
  createThirdPartyAccountCommand = CreateThirdPartyAccountCommand.create(
    new CreateThirdPartyAccountCommandInput(
      mockEmail1().value,
      mockThirdPartyAccountId1().value,
      mockThirdPartyAccountService1().type
    )
  );
});

describe('CreateThirdPartyAccountCommandHandler', () => {
  describe('execute', () => {
    it('should throw EmailAlreadyInUseException when email is already in use', async () => {
      const mockByEmailFn = jest.fn().mockResolvedValue([]);
      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new CreateThirdPartyAccountCommandHandler(
        mockAccountRepository({
          create: mockCreateFn,
          findByEmail: mockByEmailFn,
        })
      );

      await expect(commandHandler.execute(createThirdPartyAccountCommand)).rejects.toThrow(
        EmailAlreadyInUseException
      );

      expect(mockCreateFn.mock.calls.length).toBe(0);
    });

    it('should create third party Account with given email and third party data', async () => {
      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new CreateThirdPartyAccountCommandHandler(
        mockAccountRepository({
          create: mockCreateFn,
        })
      );

      await commandHandler.execute(createThirdPartyAccountCommand);

      expect(mockCreateFn.mock.calls.length).toBe(1);

      const createdAccount: Account = mockCreateFn.mock.calls[0][0];

      expect(createdAccount.status).toBe(AccountStatus.LOGIN_REQUIRED);
      expect(createdAccount.email.equals(mockEmail1())).toBe(true);
      expect(createdAccount.thirdPartyAccountId!.equals(mockThirdPartyAccountId1())).toBe(true);
      expect(createdAccount.thirdPartyAccountService!.equals(mockThirdPartyAccountService1())).toBe(
        true
      );
    });
  });
});
