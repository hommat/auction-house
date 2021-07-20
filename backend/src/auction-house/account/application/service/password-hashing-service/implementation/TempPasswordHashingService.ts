import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { HashedPassword, Password } from '@account/domain';

export class TempPasswordHashingService implements IPasswordHashingService {
  public async hash(password: Password): Promise<HashedPassword> {
    return new HashedPassword(password.value);
  }
}
