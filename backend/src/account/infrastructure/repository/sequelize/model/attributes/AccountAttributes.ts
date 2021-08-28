import { AccountStatus } from '@account/domain';

export interface AccountCreationAttributes {
  activationToken: string | null;
  changePasswordToken: string | null;
  email: string;
  login: string;
  password: string;
  status: AccountStatus;
}

export interface AccountAttributes extends AccountCreationAttributes {
  id: string;
}
