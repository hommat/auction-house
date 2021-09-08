import { INotifyService } from '@account/application/service/notify-service';

export class TempNotifyService implements INotifyService {
  public async sendAccountActivationMessage(): Promise<void> {}
  public async sendRemindPasswordMessage(): Promise<void> {}
}
