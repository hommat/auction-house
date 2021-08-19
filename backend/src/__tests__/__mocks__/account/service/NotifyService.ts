import { INotifyService } from '@account/application/service/notify-service';
import { mockService } from '@mocks/utils';

export const mockNotifyService = mockService<INotifyService>({
  sendAccountActivationMessage: jest.fn().mockReturnValue(Promise.resolve()),
  sendRemindPasswordMessage: jest.fn().mockReturnValue(Promise.resolve()),
});
