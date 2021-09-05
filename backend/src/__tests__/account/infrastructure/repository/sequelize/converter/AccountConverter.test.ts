import { Account, AccountStatus } from '@account/domain';
import { AccountConverter } from '@account/infrastructure/repository/sequelize/converter';
import { Account as AccountModel } from '@account/infrastructure/repository/sequelize/model';
import { AccountAttributes } from '@account/infrastructure/repository/sequelize/model/attributes';

import {
  mockAccountId1,
  mockActivationToken1,
  mockChangePasswordToken1,
  mockDeactivatedAccount1,
  mockEmail1,
  mockHashedPassword1,
  mockLogin1,
} from '@mocks/account';

describe('AccountConverter', () => {
  describe('toDomain', () => {
    let domainAccount: Account;

    beforeEach(() => {
      const dbAccount = {
        activationToken: mockActivationToken1().uuid.value,
        changePasswordToken: mockChangePasswordToken1().uuid.value,
        email: mockEmail1().value,
        id: mockAccountId1().uuid.value,
        login: mockLogin1().value,
        password: mockHashedPassword1().value,
        status: AccountStatus.ACTIVATED,
      } as AccountModel;

      domainAccount = AccountConverter.toDomain(dbAccount);
    });

    it('should convert activation token', () => {
      expect(domainAccount.activationToken?.equals(mockActivationToken1())).toBe(true);
    });

    it('should convert change password token', () => {
      expect(domainAccount.changePasswordToken?.equals(mockChangePasswordToken1())).toBe(true);
    });

    it('should convert email', () => {
      expect(domainAccount.email.equals(mockEmail1())).toBe(true);
    });

    it('should convert id', () => {
      expect(domainAccount.accountId.equals(mockAccountId1())).toBe(true);
    });

    it('should convert login', () => {
      expect(domainAccount.login.equals(mockLogin1())).toBe(true);
    });

    it('should convert password', () => {
      expect(domainAccount.password.equals(mockHashedPassword1())).toBe(true);
    });

    it('should convert status', () => {
      expect(domainAccount.status).toBe(AccountStatus.ACTIVATED);
    });
  });

  describe('toPersist', () => {
    let dbAccount: AccountAttributes;

    beforeEach(() => {
      const account = mockDeactivatedAccount1();
      account.setChangePasswordToken(mockChangePasswordToken1());
      dbAccount = AccountConverter.toPersist(account);
    });

    it('should convert id', () => {
      expect(dbAccount.id).toBe(mockAccountId1().uuid.value);
    });

    it('should convert activation token', () => {
      expect(dbAccount.activationToken).toBe(mockActivationToken1().uuid.value);
    });

    it('should convert change password token', () => {
      expect(dbAccount.changePasswordToken).toBe(mockChangePasswordToken1().uuid.value);
    });

    it('should convert email', () => {
      expect(dbAccount.email).toBe(mockEmail1().value);
    });

    it('should convert login', () => {
      expect(dbAccount.login).toBe(mockLogin1().value);
    });

    it('should convert password', () => {
      expect(dbAccount.password).toBe(mockHashedPassword1().value);
    });

    it('should convert status', () => {
      expect(dbAccount.status).toBe(AccountStatus.DEACTIVATED);
    });
  });
});
