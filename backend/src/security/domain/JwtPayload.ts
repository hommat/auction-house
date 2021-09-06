import { UserId } from '@security/domain';

export class JwtPayload {
  constructor(private _userId: UserId) {}

  public equals(anotherJwtPayload: JwtPayload): boolean {
    return anotherJwtPayload.userId.equals(this._userId);
  }

  public get userId(): UserId {
    return this._userId;
  }
}
