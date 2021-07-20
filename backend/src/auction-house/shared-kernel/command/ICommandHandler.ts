import { Command } from '@shared-kernel/command';

export interface ICommandHandler<CommandType extends Command> {
  execute(command: CommandType): Promise<void>;
}
