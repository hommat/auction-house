import { Command, CommandRegistry } from '@shared-kernel/command';

export class CommandDispatcher {
  constructor(private _commandRegistry: CommandRegistry) {}

  public async dispatch(command: Command): Promise<void> {
    const commandHandler = this._commandRegistry.getHandler(command);

    if (command.isAsync) {
      commandHandler.execute(command);
    } else {
      await commandHandler.execute(command);
    }
  }
}
