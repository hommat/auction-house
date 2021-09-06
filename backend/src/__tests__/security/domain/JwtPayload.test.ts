import { JwtPayload } from '@security/domain';
import { mockUserId1, mockUserId2 } from '@mocks/security';

describe('JwtPayload', () => {
  describe('equals', () => {
    it('should return true when user ids are the same', () => {
      const payload = new JwtPayload(mockUserId1());

      expect(payload.equals(new JwtPayload(mockUserId1()))).toBe(true);
    });

    it('should return false when user ids are not the same', () => {
      const payload = new JwtPayload(mockUserId1());

      expect(payload.equals(new JwtPayload(mockUserId2()))).toBe(false);
    });
  });
});
