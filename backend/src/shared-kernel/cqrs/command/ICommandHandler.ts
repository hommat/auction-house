import { IHandler } from '@shared-kernel/cqrs';
import { Command } from '@shared-kernel/cqrs/command';

export interface ICommandHandler<ConcreteCommand extends Command>
  extends IHandler<ConcreteCommand, void> {}
