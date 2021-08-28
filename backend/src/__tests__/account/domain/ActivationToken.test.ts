import { mockActivationToken1, mockActivationToken2 } from '@mocks/account';

describe('ActivationToken', () => {
  describe('equals', () => {
    it('should return true when uuids are the same', () => {
      expect(mockActivationToken1().equals(mockActivationToken1())).toBe(true);
    });

    it('should return false when uuids are not the same', () => {
      expect(mockActivationToken1().equals(mockActivationToken2())).toBe(false);
    });
  });
});
