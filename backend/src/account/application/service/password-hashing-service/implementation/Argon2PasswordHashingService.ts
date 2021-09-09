import { hash } from 'argon2';

import { IPasswordHashingService } from '@account/application/service/password-hashing-service';
import { HashedPassword, Password } from '@account/domain';

export class Argon2PasswordHashingService implements IPasswordHashingService {
  public async hash(password: Password): Promise<HashedPassword> {
    const hashedPassword = await hash(password.value);

    return new HashedPassword(hashedPassword);
  }
}
