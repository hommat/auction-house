import { Account } from '@account/domain';

export interface INotifyService {
  sendAccountActivationMessage(account: Account): Promise<void>;
}
