import { RemindPasswordCommand } from '@account/application/command';
import { RemindPasswordCommandHandler } from '@account/application/command/handler';
import { RemindPasswordCommandInput } from '@account/application/command/input';
import { mockEmail1 } from '@mocks/account';
import { mockAccountRepository } from '@mocks/account/repository';
import { mockNotifyService } from '@mocks/account/service';

let remindPasswordCommand: RemindPasswordCommand;

beforeEach(() => {
  remindPasswordCommand = RemindPasswordCommand.create(
    new RemindPasswordCommandInput(mockEmail1().value)
  );
});

describe('RemindPasswordCommandHandler', () => {
  describe('execute', () => {
    it('should send remind password message when account with email exists', async () => {
      const mockSendRemindPasswordMessageFn = jest.fn();
      const commandHandler = new RemindPasswordCommandHandler(
        mockAccountRepository(),
        mockNotifyService({ sendRemindPasswordMessage: mockSendRemindPasswordMessageFn })
      );

      await commandHandler.execute(remindPasswordCommand);

      expect(mockSendRemindPasswordMessageFn.mock.calls.length).toBe(1);
    });

    it('should not send remind password message when account with email does not exist', async () => {
      const mockFindByEmailFn = jest.fn().mockResolvedValue(null);
      const mockSendRemindPasswordMessageFn = jest.fn();
      const commandHandler = new RemindPasswordCommandHandler(
        mockAccountRepository({ findByEmail: mockFindByEmailFn }),
        mockNotifyService({ sendRemindPasswordMessage: mockSendRemindPasswordMessageFn })
      );

      await commandHandler.execute(remindPasswordCommand);

      expect(mockSendRemindPasswordMessageFn.mock.calls.length).toBe(0);
    });
  });
});
