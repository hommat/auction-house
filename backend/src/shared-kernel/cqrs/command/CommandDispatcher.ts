import { Registry } from '@shared-kernel/cqrs';
import { Command, ICommandDispatcher } from '@shared-kernel/cqrs/command';

export class CommandDispatcher implements ICommandDispatcher {
  constructor(private _commandRegistry: Registry) {}

  public async dispatch(command: Command): Promise<void> {
    await this._commandRegistry.getHandler(command).execute(command);
  }
}
