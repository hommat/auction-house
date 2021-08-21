import { IDispatcher } from '@shared-kernel/cqrs';
import { Command } from '@shared-kernel/cqrs/command';

export interface ICommandDispatcher extends IDispatcher<Command, void> {}
