import { ValidationError } from './ValidationError';

export interface IValidable {
  validationError(): ValidationError;
}
