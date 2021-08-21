import { IHandler } from '@shared-kernel/cqrs';
import { Command } from '@shared-kernel/cqrs/command';

export interface ICommandHandler<CommandType extends Command> extends IHandler<CommandType, void> {}
