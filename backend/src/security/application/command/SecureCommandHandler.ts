import { CommandAccessDeniedException } from '@security/application/command/exception';
import { Command, ICommandHandler } from '@shared-kernel/command';

export abstract class SecureCommandHandler<CommandType extends Command>
  implements ICommandHandler<CommandType>
{
  abstract executeSecure(command: CommandType): Promise<void>;
  abstract hasAccess(command: CommandType): Promise<boolean>;

  public async execute(command: CommandType): Promise<void> {
    if (this.isAccessDenied(command)) {
      throw new CommandAccessDeniedException();
    }

    this.executeSecure(command);
  }

  private isAccessDenied(command: CommandType): boolean {
    return !this.hasAccess(command);
  }
}
