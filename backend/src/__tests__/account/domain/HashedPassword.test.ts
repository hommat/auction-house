import { mockHashedPassword1, mockHashedPassword2 } from '@mocks/account';

describe('HashedPassword', () => {
  describe('equals', () => {
    it('should return true when values are the same', () => {
      expect(mockHashedPassword1().equals(mockHashedPassword1())).toBe(true);
    });

    it('should return false when values are not the same', () => {
      expect(mockHashedPassword1().equals(mockHashedPassword2())).toBe(false);
    });
  });
});
