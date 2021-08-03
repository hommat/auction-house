import { ICompositeSpecification } from '@shared-kernel/specification';
import { Validator } from './Validator';
import { IValidable } from './IValidable';

export abstract class ValueObjectValidator<ValueObject> {
  protected abstract _validator: Validator<ValueObject>;
  protected abstract _specifications: Array<ICompositeSpecification<ValueObject> & IValidable>;

  public validate(): void {
    this._specifications.forEach(this._validator.validate, this._validator);
    this._validator.throwExceptionIfValidationFailed();
  }
}
