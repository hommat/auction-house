import { AccountStatus } from '@account/domain';

export interface AccountAttributes {
  id: string;
  activationToken: string | null;
  changePasswordToken: string | null;
  email: string;
  login: string;
  password: string;
  status: AccountStatus;
}
