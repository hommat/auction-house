import { Account, AccountStatus } from '@account/domain';
import {
  AccountNotDeactivatedException,
  InvalidActivationTokenException,
} from '@account/domain/exception/account';
import {
  mockAccountId1,
  mockEmail1,
  mockLogin1,
  mockHashedPassword1,
  mockActivationToken1,
  mockActivationToken2,
} from '@mocks/account';

describe('Account', () => {
  describe('createActivated', () => {
    it('should create account with status activated', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      expect(account.status).toBe(AccountStatus.ACTIVATED);
    });
  });

  describe('createDeactivated', () => {
    it('should create account with status activated', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      expect(account.status).toBe(AccountStatus.DEACTIVATED);
    });
  });

  describe('activate', () => {
    it('should throw AccountNotDeactivatedException when account is not deactivated', () => {
      const account = Account.createActivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1()
      );

      expect(() => account.activate(mockActivationToken1())).toThrow(
        AccountNotDeactivatedException
      );
    });

    it('should throw InvalidActivationTokenException when token is not valid', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      expect(() => account.activate(mockActivationToken2())).toThrow(
        InvalidActivationTokenException
      );
    });

    it('should change account status to activated', () => {
      const account = Account.createDeactivated(
        mockAccountId1(),
        mockEmail1(),
        mockLogin1(),
        mockHashedPassword1(),
        mockActivationToken1()
      );

      account.activate(mockActivationToken1());

      expect(account.status).toBe(AccountStatus.ACTIVATED);
    });
  });
});
