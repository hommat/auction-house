import { AccountId } from '@account/domain';
import { Uuid } from '@shared-kernel/domain';

export class ChangePasswordToken {
  constructor(private _accountId: AccountId, private _uuid: Uuid) {}

  public get accountId(): AccountId {
    return this._accountId;
  }

  public get uuid(): Uuid {
    return this._uuid;
  }
}
