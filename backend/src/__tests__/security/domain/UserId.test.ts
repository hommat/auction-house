import { UserId } from '@security/domain';
import { UserIdMinValueException } from '@security/domain/exception/user-id';

describe('UserId', () => {
  describe('create', () => {
    it('should throw UserIdMinValueException when value is less or equal 0', () => {
      expect(() => UserId.create(0)).toThrow(UserIdMinValueException);
      expect(() => UserId.create(-1)).toThrow(UserIdMinValueException);
    });

    it('should return UserId with given value when is valid', () => {
      const userId = UserId.create(1);

      expect(userId.value).toBe(1);
    });
  });
});
