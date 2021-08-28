import { RemindPasswordCommand } from '@account/application/command';
import { RemindPasswordCommandHandler } from '@account/application/command/handler';
import { RemindPasswordCommandInput } from '@account/application/command/input';
import { Account } from '@account/domain';
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
    describe('email exists', () => {
      let mockSendRemindPasswordMessageFn: jest.Mock;
      let mockSaveFn: jest.Mock;
      let mockSetChangePasswordTokenFn: jest.Mock;

      beforeEach(async () => {
        mockSetChangePasswordTokenFn = jest.fn();
        const account: Partial<Account> = {
          setChangePasswordToken: mockSetChangePasswordTokenFn as any,
        };
        mockSendRemindPasswordMessageFn = jest.fn().mockReturnValue(Promise.resolve());
        mockSaveFn = jest.fn().mockResolvedValue(Promise.resolve());

        const commandHandler = new RemindPasswordCommandHandler(
          mockAccountRepository({
            save: mockSaveFn,
            findByEmail: jest.fn().mockResolvedValue(account),
          }),
          mockNotifyService({ sendRemindPasswordMessage: mockSendRemindPasswordMessageFn })
        );

        await commandHandler.execute(remindPasswordCommand);
      });

      it('should update account change password token', () => {
        expect(mockSetChangePasswordTokenFn.mock.calls.length).toBe(1);
      });

      it('should send remind password message', () => {
        expect(mockSendRemindPasswordMessageFn.mock.calls.length).toBe(1);
      });

      it('should save account', () => {
        expect(mockSaveFn.mock.calls.length).toBe(1);
      });
    });

    describe('email does not exist', () => {
      let mockSendRemindPasswordMessageFn: jest.Mock;
      let mockSaveFn: jest.Mock;

      beforeEach(async () => {
        mockSendRemindPasswordMessageFn = jest.fn().mockReturnValue(Promise.resolve());
        mockSaveFn = jest.fn().mockResolvedValue(Promise.resolve());

        const commandHandler = new RemindPasswordCommandHandler(
          mockAccountRepository({
            save: mockSaveFn,
            findByEmail: jest.fn().mockResolvedValue(null),
          }),
          mockNotifyService({ sendRemindPasswordMessage: mockSendRemindPasswordMessageFn })
        );

        await commandHandler.execute(remindPasswordCommand);
      });

      it('should not send remind password message', () => {
        expect(mockSendRemindPasswordMessageFn.mock.calls.length).toBe(0);
      });

      it('should not save account', () => {
        expect(mockSaveFn.mock.calls.length).toBe(0);
      });
    });
  });
});
