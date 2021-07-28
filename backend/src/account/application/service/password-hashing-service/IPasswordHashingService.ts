import { HashedPassword, Password } from '@account/domain';

export interface IPasswordHashingService {
  hash(password: Password): Promise<HashedPassword>;
}
