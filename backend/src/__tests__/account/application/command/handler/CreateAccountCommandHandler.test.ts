import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandHandler } from '@account/application/command/handler';
import { CreateAccountCommandInput } from '@account/application/command/input';
import {
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import { Account, AccountStatus } from '@account/domain';
import {
  mockAccountId1,
  mockAccountId2,
  mockEmail1,
  mockEmail2,
  mockLogin1,
  mockLogin2,
  mockPassword1,
  mockHashedPassword2,
} from '@mocks/account';
import { mockAccountRepository } from '@mocks/account/repository';
import { mockNotifyService, mockPasswordHashingService } from '@mocks/account/service';

let createAccountCommand: CreateAccountCommand;

beforeEach(() => {
  createAccountCommand = CreateAccountCommand.create(
    new CreateAccountCommandInput(mockEmail1().value, mockLogin1().value, mockPassword1().value)
  );
});

describe('CreateAccountCommandHandler', () => {
  describe('execute', () => {
    it('should throw LoginAlreadyInUseException when login is already in use', async () => {
      const mockFindWithLoginOrEmailFn = jest
        .fn()
        .mockResolvedValue([
          Account.createActivated(
            mockAccountId2(),
            mockEmail2(),
            mockLogin1(),
            mockHashedPassword2()
          ),
        ]);

      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());
      const mockSendAccountActivationMessageFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new CreateAccountCommandHandler(
        mockAccountRepository({
          findByLoginOrEmail: mockFindWithLoginOrEmailFn,
          create: mockCreateFn,
        }),
        mockNotifyService({ sendAccountActivationMessage: mockSendAccountActivationMessageFn }),
        mockPasswordHashingService()
      );

      await expect(commandHandler.execute(createAccountCommand)).rejects.toThrow(
        LoginAlreadyInUseException
      );

      expect(mockCreateFn.mock.calls.length).toBe(0);
      expect(mockSendAccountActivationMessageFn.mock.calls.length).toBe(0);
    });

    it('should throw EmailAlreadyInUseException when email is already in use', async () => {
      const mockFindWithLoginOrEmailFn = jest
        .fn()
        .mockResolvedValue([
          Account.createActivated(
            mockAccountId2(),
            mockEmail1(),
            mockLogin2(),
            mockHashedPassword2()
          ),
        ]);
      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());
      const mockSendAccountActivationMessageFn = jest.fn().mockReturnValue(Promise.resolve());

      const commandHandler = new CreateAccountCommandHandler(
        mockAccountRepository({
          findByLoginOrEmail: mockFindWithLoginOrEmailFn,
          create: mockCreateFn,
        }),
        mockNotifyService({ sendAccountActivationMessage: mockSendAccountActivationMessageFn }),
        mockPasswordHashingService()
      );

      await expect(commandHandler.execute(createAccountCommand)).rejects.toThrow(
        EmailAlreadyInUseException
      );

      expect(mockCreateFn.mock.calls.length).toBe(0);
      expect(mockSendAccountActivationMessageFn.mock.calls.length).toBe(0);
    });

    it('should hash password', async () => {
      const hashedPassword = mockHashedPassword2();
      const mockHashFn = jest.fn().mockResolvedValue(hashedPassword);
      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());
      const commandHandler = new CreateAccountCommandHandler(
        mockAccountRepository({ create: mockCreateFn }),
        mockNotifyService(),
        mockPasswordHashingService({ hash: mockHashFn })
      );

      await commandHandler.execute(createAccountCommand);

      expect(mockHashFn.mock.calls.length).toBe(1);

      const createdAccount: Account = mockCreateFn.mock.calls[0][0];
      expect(createdAccount.password).toBe(hashedPassword);
    });

    it('should create deactivated Account with given credentials', async () => {
      const mockCreateFn = jest.fn().mockReturnValue(Promise.resolve());
      const mockGenerateIdFn = jest.fn().mockReturnValue(Promise.resolve(mockAccountId1()));

      const commandHandler = new CreateAccountCommandHandler(
        mockAccountRepository({
          create: mockCreateFn,
          generateId: mockGenerateIdFn,
        }),
        mockNotifyService(),
        mockPasswordHashingService()
      );

      await commandHandler.execute(createAccountCommand);

      expect(mockGenerateIdFn.mock.calls.length).toBe(1);
      expect(mockCreateFn.mock.calls.length).toBe(1);

      const createdAccount: Account = mockCreateFn.mock.calls[0][0];

      expect(createdAccount.status).toBe(AccountStatus.DEACTIVATED);
      expect(createdAccount.accountId.equals(mockAccountId1())).toBe(true);
      expect(createdAccount.email.equals(mockEmail1())).toBe(true);
      expect(createdAccount.login.equals(mockLogin1())).toBe(true);
    });

    it('should send account activation message', async () => {
      const mockSendAccountActivationMessageFn = jest.fn().mockReturnValue(Promise.resolve());
      const commandHandler = new CreateAccountCommandHandler(
        mockAccountRepository(),
        mockNotifyService({ sendAccountActivationMessage: mockSendAccountActivationMessageFn }),
        mockPasswordHashingService()
      );

      await commandHandler.execute(createAccountCommand);

      expect(mockSendAccountActivationMessageFn.mock.calls.length).toBe(1);
    });
  });
});
