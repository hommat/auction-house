import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandHandler } from '@account/application/command-handler';
import {
  EmailAlreadyInUseException,
  LoginAlreadyInUseException,
} from '@account/application/exception';
import { TempPasswordHashingService } from '@account/application/service/password-hashing-service/implementation/TempPasswordHashingService';
import { Account, AccountId, HashedPassword } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
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

class TestAccountRepo implements Partial<IAccountRepository> {
  constructor(
    private mockFindWithLoginOrEmailFn: jest.Mock<Account[]> = jest.fn(() => []),
    private mockCreateAccountFn = jest.fn(),
    private mockGenerateIdFn = jest.fn()
  ) {}

  public async findWithLoginOrEmail(): Promise<Account[]> {
    return this.mockFindWithLoginOrEmailFn();
  }

  public async generateId(): Promise<AccountId> {
    this.mockGenerateIdFn();

    return mockAccountId1();
  }

  public async create(account: Account): Promise<void> {
    this.mockCreateAccountFn(account);
  }
}

let createAccountCommand: CreateAccountCommand;

beforeEach(() => {
  createAccountCommand = CreateAccountCommand.create(
    mockEmail1().value,
    mockLogin1().value,
    mockPassword1().value
  );
});

describe('CreateAccountCommandHandler', () => {
  describe('execute', () => {
    it('should throw LoginAlreadyInUseException when login is already in use', async () => {
      const mockFindWithLoginOrEmailFn = jest.fn(() => [
        new Account(mockAccountId2(), mockEmail2(), mockLogin1(), mockHashedPassword2()),
      ]);
      const mockCreateAccountFn = jest.fn();

      const commandHandler = new CreateAccountCommandHandler(
        new TestAccountRepo(mockFindWithLoginOrEmailFn, mockCreateAccountFn),
        new TempPasswordHashingService()
      );

      await expect(commandHandler.execute(createAccountCommand)).rejects.toThrow(
        LoginAlreadyInUseException
      );

      expect(mockCreateAccountFn.mock.calls.length).toBe(0);
    });

    it('should throw EmailAlreadyInUseException when email is already in use', async () => {
      const mockFindWithLoginOrEmailFn = jest.fn(() => [
        new Account(mockAccountId2(), mockEmail1(), mockLogin2(), mockHashedPassword2()),
      ]);
      const mockCreateAccountFn = jest.fn();

      const commandHandler = new CreateAccountCommandHandler(
        new TestAccountRepo(mockFindWithLoginOrEmailFn, mockCreateAccountFn),
        new TempPasswordHashingService()
      );

      await expect(commandHandler.execute(createAccountCommand)).rejects.toThrow(
        EmailAlreadyInUseException
      );

      expect(mockCreateAccountFn.mock.calls.length).toBe(0);
    });

    it('should create Account with given credentials', async () => {
      const mockCreateAccountFn = jest.fn();
      const mockGenerateIdFn = jest.fn();

      const commandHandler = new CreateAccountCommandHandler(
        new TestAccountRepo(
          jest.fn(() => []),
          mockCreateAccountFn,
          mockGenerateIdFn
        ),
        new TempPasswordHashingService()
      );

      await commandHandler.execute(createAccountCommand);

      expect(mockGenerateIdFn.mock.calls.length).toBe(1);
      expect(mockCreateAccountFn.mock.calls.length).toBe(1);

      const createdAccount: Account = mockCreateAccountFn.mock.calls[0][0];

      expect(createdAccount.accountId.equals(mockAccountId1())).toBe(true);
      expect(createdAccount.email.equals(mockEmail1())).toBe(true);
      expect(createdAccount.login.equals(mockLogin1())).toBe(true);
      expect(createdAccount.password.equals(new HashedPassword(mockPassword1().value))).toBe(true);
    });
  });
});
