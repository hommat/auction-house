import { Account } from '@account/domain';

export interface INotifyService {
  sendAccountActivationMessage(account: Account): Promise<void>;
  sendRemindPasswordMessage(account: Account): Promise<void>;
}
