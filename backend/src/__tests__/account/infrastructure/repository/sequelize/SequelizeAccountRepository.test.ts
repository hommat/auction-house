import { Repository, Sequelize } from 'sequelize-typescript';

import { SequelizeAccountRepository } from '@account/infrastructure/repository/sequelize';
import { AccountConverter } from '@account/infrastructure/repository/sequelize/converter';
import { Account } from '@account/infrastructure/repository/sequelize/model';
import {
  mockAccount1,
  mockAccount2,
  mockAccountId1,
  mockActivationToken1,
  mockChangePasswordToken1,
  mockChangePasswordToken2,
  mockDeactivatedAccount2,
  mockEmail2,
  mockLogin2,
} from '@mocks/account';
import { clear, connect } from '@scripts/db';

let sequelize: Sequelize;
let accountRepo: Repository<Account>;
let sequelizeAccountRepo: SequelizeAccountRepository;

beforeAll(async () => {
  sequelize = await connect();
});

beforeEach(async () => {
  accountRepo = sequelize.getRepository(Account);
  sequelizeAccountRepo = new SequelizeAccountRepository(sequelize);
});

afterEach(async () => {
  await clear(sequelize);
});

afterAll(async () => {
  await sequelize.close();
});

describe('SequelizeAccountRepository', () => {
  describe('create', () => {
    it('should create account', async () => {
      await sequelizeAccountRepo.create(mockAccount1());

      const accounts = await accountRepo.findAll();

      expect(accounts.length).toBe(1);
      expect(accounts[0].id).toBe(mockAccountId1().uuid.value);
    });
  });

  describe('save', () => {
    it('updates account data', async () => {
      await accountRepo.create(AccountConverter.toPersist(mockAccount1()));

      const account = mockAccount1();
      account.setChangePasswordToken(mockChangePasswordToken1());

      await sequelizeAccountRepo.save(account);

      const [savedAccount] = await accountRepo.findAll();

      expect(savedAccount.changePasswordToken).toBe(mockChangePasswordToken1().uuid.value);
    });
  });

  describe('findByActivationToken', () => {
    it('returns account with given activation token', async () => {
      const account1 = mockAccount1();
      const deactivatedAccount2 = mockDeactivatedAccount2();

      await accountRepo.bulkCreate([
        AccountConverter.toPersist(account1),
        AccountConverter.toPersist(deactivatedAccount2),
      ]);

      const accountWithActivationToken = await sequelizeAccountRepo.findByActivationToken(
        deactivatedAccount2.activationToken!
      );

      expect(accountWithActivationToken?.accountId.equals(deactivatedAccount2.accountId)).toBe(
        true
      );
    });

    it('returns null when account with given activation token does not exist', async () => {
      const account1 = mockAccount1();

      await accountRepo.create(AccountConverter.toPersist(account1));

      const accountWithActivationToken = await sequelizeAccountRepo.findByActivationToken(
        mockActivationToken1()
      );

      expect(accountWithActivationToken).toBe(null);
    });
  });

  describe('findByChangePasswordToken', () => {
    it('returns account with given change password token', async () => {
      const account1 = mockAccount1();
      const account2 = mockAccount2();

      account1.setChangePasswordToken(mockChangePasswordToken1());

      await accountRepo.bulkCreate([
        AccountConverter.toPersist(account1),
        AccountConverter.toPersist(account2),
      ]);

      const accountWithChangePasswordToken = await sequelizeAccountRepo.findByChangePasswordToken(
        account1.changePasswordToken!
      );

      expect(accountWithChangePasswordToken?.accountId.equals(account1.accountId)).toBe(true);
    });

    it('returns null when account with given change password token does not exist', async () => {
      const account1 = mockAccount1();

      account1.setChangePasswordToken(mockChangePasswordToken2());

      await accountRepo.create(AccountConverter.toPersist(account1));

      const accountWithChangePasswordToken = await sequelizeAccountRepo.findByChangePasswordToken(
        mockChangePasswordToken1()
      );

      expect(accountWithChangePasswordToken).toBe(null);
    });
  });

  describe('findByEmail', () => {
    it('returns account with given email', async () => {
      const account1 = mockAccount1();
      const account2 = mockAccount2();

      await accountRepo.bulkCreate([
        AccountConverter.toPersist(account1),
        AccountConverter.toPersist(account2),
      ]);

      const accountWithEmail = await sequelizeAccountRepo.findByEmail(account1.email);

      expect(accountWithEmail?.accountId.equals(account1.accountId)).toBe(true);
    });

    it('returns null when account with given email does not exist', async () => {
      const account1 = mockAccount1();

      await accountRepo.create(AccountConverter.toPersist(account1));

      const accountWithEmail = await sequelizeAccountRepo.findByEmail(mockEmail2());

      expect(accountWithEmail).toBe(null);
    });
  });

  describe('findByLoginOrEmail', () => {
    it('returns account with given login or email', async () => {
      const account1 = mockAccount1();
      const account2 = mockAccount2();

      await accountRepo.bulkCreate([
        AccountConverter.toPersist(account1),
        AccountConverter.toPersist(account2),
      ]);

      const accountsWithLoginOrEmail = await sequelizeAccountRepo.findByLoginOrEmail(
        account1.login,
        account2.email
      );

      expect(accountsWithLoginOrEmail.length).toBe(2);
      expect(accountsWithLoginOrEmail.some((a) => a.login.equals(account1.login))).toBe(true);
      expect(accountsWithLoginOrEmail.some((a) => a.email.equals(account2.email))).toBe(true);
    });

    it('returns empty array when accounts with login or email do not exist', async () => {
      const account1 = mockAccount1();

      await accountRepo.create(AccountConverter.toPersist(account1));

      const accountsWithLoginOrEmail = await sequelizeAccountRepo.findByLoginOrEmail(
        mockLogin2(),
        mockEmail2()
      );

      expect(accountsWithLoginOrEmail.length).toBe(0);
    });
  });
});
