import { Jwt, JwtPayload } from '@security/domain';

export interface IJwtService {
  sign(payload: JwtPayload): Jwt;
  verify(jwt: Jwt): JwtPayload | null;
}
