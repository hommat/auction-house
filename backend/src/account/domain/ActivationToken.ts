import { Uuid } from '@shared-kernel/domain';

export class ActivationToken {
  constructor(private _uuid: Uuid) {}

  public equals(anotherActivationToken: ActivationToken): boolean {
    return this._uuid.equals(anotherActivationToken.uuid);
  }

  public get uuid(): Uuid {
    return this._uuid;
  }
}
