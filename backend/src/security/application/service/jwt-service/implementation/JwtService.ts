import { sign, verify } from 'jsonwebtoken';

import { IJwtService } from '@security/application/service/jwt-service';
import { Jwt, JwtPayload, UserId } from '@security/domain';
import { Uuid } from '@shared-kernel/domain';

interface IPlainPayload {
  userId: string;
}

export class JwtService implements IJwtService {
  private secret = process.env.JWT_SECRET!;

  public sign(payload: JwtPayload): Jwt {
    const plainPayload: IPlainPayload = { userId: payload.userId.uuid.value };
    const jwt = sign(plainPayload, this.secret, {
      expiresIn: '2h',
    });

    return new Jwt(jwt);
  }

  public verify(jwt: Jwt): JwtPayload | null {
    try {
      const payload = verify(jwt.value, this.secret) as IPlainPayload;

      return new JwtPayload(new UserId(new Uuid(payload.userId)));
    } catch (e) {
      return null;
    }
  }
}
