import { Uuid } from '@shared-kernel/domain';

export class Id {
  constructor(private _uuid: Uuid) {}

  public equals(anotherId: Id): boolean {
    return this._uuid.equals(anotherId.uuid);
  }

  public get uuid(): Uuid {
    return this._uuid;
  }
}
