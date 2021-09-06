import { mockJwtPayload1 } from '@mocks/security';
import { JwtService } from '@security/application/service/jwt-service/implementation';
import { Jwt } from '@security/domain';

describe('JwtService', () => {
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService();
  });

  describe('sign', () => {
    it('should return jwt that can be successfully verified', () => {
      const payload = mockJwtPayload1();
      const jwt = jwtService.sign(payload);
      const payload2 = jwtService.verify(jwt);

      expect(payload.userId.equals(payload2!.userId)).toBe(true);
    });
  });

  describe('verify', () => {
    it('should return payload when token is valid', () => {
      const payload = mockJwtPayload1();
      const jwt = jwtService.sign(payload);
      const payload2 = jwtService.verify(jwt);

      expect(payload.userId.equals(payload2!.userId)).toBe(true);
    });

    it('should return null when token is not valid', () => {
      const payload = jwtService.verify(new Jwt('not-valid-jwt'));

      expect(payload).toBeNull();
    });
  });
});
