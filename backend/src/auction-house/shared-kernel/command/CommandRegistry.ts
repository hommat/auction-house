import { Command, ICommandHandler } from '@shared-kernel/command';
import {
  CommandAlreadyRegisteredException,
  CommandNotRegisteredException,
} from '@shared-kernel/command/exception';

export class CommandRegistry {
  private _registeredCommands = new Map<string, ICommandHandler<Command>>();

  public register<CommandType extends Command>(
    commandName: string,
    commandHandler: ICommandHandler<CommandType>
  ): void {
    if (this._registeredCommands.has(commandName)) {
      throw new CommandAlreadyRegisteredException();
    }

    this._registeredCommands.set(commandName, commandHandler);
  }

  public getHandler<CommandType extends Command>(
    command: CommandType
  ): ICommandHandler<CommandType> {
    if (!this._registeredCommands.has(command.name)) {
      throw new CommandNotRegisteredException();
    }

    return this._registeredCommands.get(command.name) as ICommandHandler<CommandType>;
  }
}
