import { CreateAccountCommand } from '@account/application/command';
import { CreateAccountCommandHandler } from '@account/application/command-handler';
import { LoginAlreadyInUseException } from '@account/application/exception';
import { TempPasswordHashingService } from '@account/application/service/password-hashing-service/implementation/TempPasswordHashingService';
import { Account, AccountId, HashedPassword } from '@account/domain';
import { IAccountRepository } from '@account/domain/repository';
import { mockAccountId1, mockLogin1, mockPassword1 } from '@mocks/account';

class TestAccountRepo implements Partial<IAccountRepository> {
  public static create(
    isLoginAlreadyInUseValue: boolean,
    createAccountMock = jest.fn(),
    generateIdMock = jest.fn()
  ): IAccountRepository {
    return new TestAccountRepo(isLoginAlreadyInUseValue, createAccountMock, generateIdMock);
  }

  private constructor(
    private isLoginAlreadyInUseValue: boolean,
    private createAccountMock: jest.Mock,
    private generateIdMock: jest.Mock
  ) {}

  public async isLoginAlreadyInUse(): Promise<boolean> {
    return this.isLoginAlreadyInUseValue;
  }

  public async generateId(): Promise<AccountId> {
    this.generateIdMock();

    return mockAccountId1();
  }

  public async create(account: Account): Promise<void> {
    this.createAccountMock(account);
  }
}

class TestCreateAccountCommand extends CreateAccountCommand {
  constructor() {
    super(mockLogin1().value, mockPassword1().value);
  }
}

describe('CreateAccountCommandHandler', () => {
  describe('execute', () => {
    it('should throw LoginAlreadyInUseException when login is already in use', async () => {
      const createAccountMock = jest.fn();
      const commandHandler = new CreateAccountCommandHandler(
        TestAccountRepo.create(true, createAccountMock),
        new TempPasswordHashingService()
      );

      await expect(commandHandler.execute(new TestCreateAccountCommand())).rejects.toThrow(
        LoginAlreadyInUseException
      );
      expect(createAccountMock.mock.calls.length).toBe(0);
    });

    it('should create Account with given credentials', async () => {
      const createAccountMock = jest.fn();
      const generateIdMock = jest.fn();

      const commandHandler = new CreateAccountCommandHandler(
        TestAccountRepo.create(false, createAccountMock, generateIdMock),
        new TempPasswordHashingService()
      );

      await commandHandler.execute(new TestCreateAccountCommand());

      expect(generateIdMock.mock.calls.length).toBe(1);
      expect(createAccountMock.mock.calls.length).toBe(1);

      const createdAccount: Account = createAccountMock.mock.calls[0][0];

      expect(createdAccount.accountId.equals(mockAccountId1())).toBe(true);
      expect(createdAccount.login.equals(mockLogin1())).toBe(true);
      expect(createdAccount.password.equals(new HashedPassword(mockPassword1().value))).toBe(true);
    });
  });
});
