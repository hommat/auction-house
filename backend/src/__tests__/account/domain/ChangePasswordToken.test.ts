import { mockChangePasswordToken1, mockChangePasswordToken2 } from '@mocks/account';

describe('ChangePasswordToken', () => {
  describe('equals', () => {
    it('should return true when uuids are the same', () => {
      expect(mockChangePasswordToken1().equals(mockChangePasswordToken1())).toBe(true);
    });

    it('should return false when uuids are not the same', () => {
      expect(mockChangePasswordToken1().equals(mockChangePasswordToken2())).toBe(false);
    });
  });
});
