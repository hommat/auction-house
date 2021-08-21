import { Command } from '@shared-kernel/cqrs/command';
import { SecureCommandHandler } from '@security/application/secure-command';
import { CommandAccessDeniedException } from '@security/application/secure-command/exception';

class TestCommand extends Command {}

class TestCommandHandler extends SecureCommandHandler<TestCommand> {
  constructor(private hasCommandAccess: boolean, private mockFn: jest.Mock) {
    super();
  }

  public async executeSecure(command: TestCommand): Promise<void> {
    this.mockFn(command);
  }

  public async hasAccess(): Promise<boolean> {
    return this.hasCommandAccess;
  }
}

describe('SecureCommandHandler', () => {
  describe('execute', () => {
    it('should throw CommandAccessDeniedException when access is not granted', async () => {
      const mockFn = jest.fn();
      const commandHandler = new TestCommandHandler(false, mockFn);

      await expect(commandHandler.execute(new TestCommand())).rejects.toThrow(
        CommandAccessDeniedException
      );
      expect(mockFn.mock.calls.length).toBe(0);
    });

    it('should execute command when access is granted', async () => {
      const mockFn = jest.fn();
      const commandHandler = new TestCommandHandler(true, mockFn);

      await commandHandler.execute(new TestCommand());
      expect(mockFn.mock.calls.length).toBe(1);
    });
  });
});
