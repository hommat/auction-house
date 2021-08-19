import { v4 } from 'uuid';

import { Uuid } from '@shared-kernel/domain';

export class UuidGenerator {
  public static generate(): Uuid {
    return Uuid.createWithoutValidation(v4());
  }
}
