import { Account } from '@account/domain';
import {
  mockAccountId1,
  mockAccountId2,
  mockActivationToken1,
  mockActivationToken2,
  mockEmail1,
  mockEmail2,
  mockHashedPassword1,
  mockHashedPassword2,
  mockLogin1,
  mockLogin2,
} from '@mocks/account';

export const mockAccount1 = (): Account =>
  Account.createActivated(mockAccountId1(), mockEmail1(), mockLogin1(), mockHashedPassword1());
export const mockAccount2 = (): Account =>
  Account.createActivated(mockAccountId2(), mockEmail2(), mockLogin2(), mockHashedPassword2());

export const mockDeactivatedAccount1 = (): Account =>
  Account.createDeactivated(
    mockAccountId1(),
    mockEmail1(),
    mockLogin1(),
    mockHashedPassword1(),
    mockActivationToken1()
  );
export const mockDeactivatedAccount2 = (): Account =>
  Account.createDeactivated(
    mockAccountId2(),
    mockEmail2(),
    mockLogin2(),
    mockHashedPassword2(),
    mockActivationToken2()
  );
