import { Validator } from '@shared-kernel/validation';

export function mockValidationSuccess(): void {
  jest.spyOn(Validator.prototype, 'validate').mockImplementation(jest.fn());
}
