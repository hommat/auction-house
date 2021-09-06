import {
  JwtDataTypeSpecification,
  JwtFormatSpecification,
} from '@security/domain/specification/jwt';
import { ValidationField } from '@security/domain/validation';
import { JwtValidator } from '@security/domain/validation/validator';
import { mockJwt1 } from '@mocks/security';
import { mockSpecificationOnce } from '@mocks/utils';
import { ValidationFailedException } from '@shared-kernel/validation';

let jwtValidator: JwtValidator;

beforeEach(() => {
  jwtValidator = new JwtValidator(mockJwt1());
});

describe('JwtValidator', () => {
  describe('validate', () => {
    it('should throw ValidationFailedException with jwt field name', () => {
      mockSpecificationOnce(JwtDataTypeSpecification, false);

      try {
        jwtValidator.validate();
        expect(true).toBe(false);
      } catch (e) {
        expect(e.field).toBe(ValidationField.JWT);
      }
    });

    it('should throw ValidationFailedException when JwtDataTypeSpecification is not satisfied', () => {
      mockSpecificationOnce(JwtDataTypeSpecification, false);

      expect(() => jwtValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should throw ValidationFailedException when JwtFormatSpecification is not satisfied', () => {
      mockSpecificationOnce(JwtFormatSpecification, false);

      expect(() => jwtValidator.validate()).toThrow(ValidationFailedException);
    });

    it('should not throw when every specification is satisfied', () => {
      mockSpecificationOnce(JwtDataTypeSpecification, true);
      mockSpecificationOnce(JwtFormatSpecification, true);

      expect(() => jwtValidator.validate()).not.toThrow();
    });
  });
});
