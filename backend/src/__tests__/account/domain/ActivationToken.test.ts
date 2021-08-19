import { mockActivationToken1, mockActivationToken2 } from '@mocks/account';

describe('ActivationToken', () => {
  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockActivationToken1().equals(mockActivationToken1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockActivationToken1().equals(mockActivationToken2())).toBe(false);
    });
  });
});
