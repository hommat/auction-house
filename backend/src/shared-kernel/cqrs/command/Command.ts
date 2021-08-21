import { Resource } from '@shared-kernel/cqrs';

export class Command extends Resource {
  constructor(private _isAsync: boolean = false) {
    super();
  }

  public get isAsync(): boolean {
    return this._isAsync;
  }
}
