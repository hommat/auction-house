import { Uuid } from '@shared-kernel/domain';

export class ChangePasswordToken {
  constructor(private _uuid: Uuid) {}

  public equals(anotherChangePasswordToken: ChangePasswordToken): boolean {
    return this._uuid.equals(anotherChangePasswordToken.uuid);
  }

  public get uuid(): Uuid {
    return this._uuid;
  }
}
