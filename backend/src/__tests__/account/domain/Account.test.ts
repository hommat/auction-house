import { Account } from '@account/domain';
import { mockAccountId1, mockEmail1, mockLogin1, mockHashedPassword1 } from '@mocks/account';

describe('Account', () => {
  describe('getters', () => {
    describe('accountId', () => {
      it('should return AccountId given while creating', () => {
        const accountId = mockAccountId1();
        const account = new Account(accountId, mockEmail1(), mockLogin1(), mockHashedPassword1());

        expect(account.accountId).toBe(accountId);
      });
    });

    describe('email', () => {
      it('should return email given while creating', () => {
        const email = mockEmail1();
        const account = new Account(mockAccountId1(), email, mockLogin1(), mockHashedPassword1());

        expect(account.email).toBe(email);
      });
    });

    describe('login', () => {
      it('should return Login given while creating', () => {
        const login = mockLogin1();
        const account = new Account(mockAccountId1(), mockEmail1(), login, mockHashedPassword1());

        expect(account.login).toBe(login);
      });
    });

    describe('password', () => {
      it('should return HashedPassword given while creating', () => {
        const hashedPassword = mockHashedPassword1();
        const account = new Account(mockAccountId1(), mockEmail1(), mockLogin1(), hashedPassword);

        expect(account.password).toBe(hashedPassword);
      });
    });
  });
});
