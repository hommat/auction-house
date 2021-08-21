import { ActivateAccountCommand } from '@account/application/command';
import { ActivateAccountCommandHandler } from '@account/application/command/handler';
import { ActivateAccountCommandInput } from '@account/application/command/input';
import { AccountNotFoundException } from '@account/application/exception';
import { Account } from '@account/domain';
import { mockDeactivatedAccount1 } from '@mocks/account';
import { mockAccountRepository } from '@mocks/account/repository';
import { mockUuid1 } from '@mocks/shared-kernel';

let activateAccountCommand: ActivateAccountCommand;

beforeEach(() => {
  activateAccountCommand = ActivateAccountCommand.create(
    new ActivateAccountCommandInput(mockUuid1().value)
  );
});

describe('ActivateAccountCommandHandler', () => {
  describe('execute', () => {
    it('should throw AccountNotFoundException when account does not exists', async () => {
      const mockFindByActivationTokenFn = jest.fn().mockResolvedValue(null);
      const mockSaveFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new ActivateAccountCommandHandler(
        mockAccountRepository({
          findByActivationToken: mockFindByActivationTokenFn,
          save: mockSaveFn,
        })
      );

      await expect(commandHandler.execute(activateAccountCommand)).rejects.toThrow(
        AccountNotFoundException
      );

      expect(mockSaveFn.mock.calls.length).toBe(0);
    });

    it('should call activate function on account', async () => {
      const mockActivateFn = jest.fn().mockReturnValue(Promise.resolve());
      const account: Partial<Account> = { activate: mockActivateFn };
      const mockFindByActivationTokenFn = jest.fn().mockResolvedValue(account);

      const commandHandler = new ActivateAccountCommandHandler(
        mockAccountRepository({ findByActivationToken: mockFindByActivationTokenFn })
      );

      await commandHandler.execute(activateAccountCommand);

      expect(mockActivateFn.mock.calls.length).toBe(1);
    });

    it('should save account', async () => {
      const mockSaveFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new ActivateAccountCommandHandler(
        mockAccountRepository({
          findByActivationToken: jest.fn().mockResolvedValue(mockDeactivatedAccount1()),
          save: mockSaveFn,
        })
      );

      await commandHandler.execute(activateAccountCommand);
      expect(mockSaveFn.mock.calls.length).toBe(1);
    });
  });
});
