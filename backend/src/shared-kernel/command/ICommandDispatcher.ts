import { Command } from '@shared-kernel/command';

export interface ICommandDispatcher {
  dispatch(command: Command): Promise<void>;
}
