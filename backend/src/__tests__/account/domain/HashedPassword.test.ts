import { HashedPassword } from '@account/domain';
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

  describe('getters', () => {
    describe('value', () => {
      it('should return value given while creating', () => {
        const value = mockHashedPassword1().value;
        const hashedPassword = new HashedPassword(value);

        expect(hashedPassword.value).toBe(value);
      });
    });
  });
});
