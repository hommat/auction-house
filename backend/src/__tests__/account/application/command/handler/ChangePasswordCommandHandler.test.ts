import { ChangePasswordCommand } from '@account/application/command';
import { ChangePasswordCommandHandler } from '@account/application/command/handler';
import { ChangePasswordCommandInput } from '@account/application/command/input';
import { AccountNotFoundException } from '@account/application/exception';
import { Account } from '@account/domain';
import { mockHashedPassword1, mockPassword1 } from '@mocks/account';
import { mockAccountRepository } from '@mocks/account/repository';
import { mockPasswordHashingService } from '@mocks/account/service';
import { mockUuid1 } from '@mocks/shared-kernel';

let changePasswordCommand: ChangePasswordCommand;

beforeEach(() => {
  changePasswordCommand = ChangePasswordCommand.create(
    new ChangePasswordCommandInput(mockUuid1().value, mockPassword1().value)
  );
});

describe('ChangePasswordCommandHandler', () => {
  describe('execute', () => {
    it('should throw AccountNotFoundException when account does not exists', async () => {
      const mockFindByChangePasswordTokenFn = jest.fn().mockResolvedValue(null);
      const mockSaveFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new ChangePasswordCommandHandler(
        mockAccountRepository({
          findByChangePasswordToken: mockFindByChangePasswordTokenFn,
          save: mockSaveFn,
        }),
        mockPasswordHashingService()
      );

      await expect(commandHandler.execute(changePasswordCommand)).rejects.toThrow(
        AccountNotFoundException
      );

      expect(mockFindByChangePasswordTokenFn.mock.calls.length).toBe(1);
      expect(mockSaveFn.mock.calls.length).toBe(0);
    });

    it('should call changePassword function on account with hashed password', async () => {
      const hashedPassword = mockHashedPassword1();
      const mockChangePasswordFn = jest.fn();
      const account: Partial<Account> = { changePassword: mockChangePasswordFn };
      const mockFindByChangePasswordTokenFn = jest.fn().mockResolvedValue(account);
      const mockHashFn = jest.fn().mockResolvedValue(hashedPassword);

      const commandHandler = new ChangePasswordCommandHandler(
        mockAccountRepository({
          findByChangePasswordToken: mockFindByChangePasswordTokenFn,
        }),
        mockPasswordHashingService({ hash: mockHashFn })
      );

      await commandHandler.execute(changePasswordCommand);

      expect(mockChangePasswordFn.mock.calls.length).toBe(1);
      expect(mockChangePasswordFn.mock.calls[0][1]).toBe(hashedPassword);
    });

    it('should save account', async () => {
      const mockSaveFn = jest.fn().mockReturnValue(Promise.resolve());
      const account: Partial<Account> = { changePassword: jest.fn() };
      const mockFindByChangePasswordTokenFn = jest.fn().mockResolvedValue(account);

      const commandHandler = new ChangePasswordCommandHandler(
        mockAccountRepository({
          save: mockSaveFn,
          findByChangePasswordToken: mockFindByChangePasswordTokenFn,
        }),
        mockPasswordHashingService()
      );

      await commandHandler.execute(changePasswordCommand);
      expect(mockSaveFn.mock.calls.length).toBe(1);
    });
  });
});
