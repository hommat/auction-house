import { Id } from '@shared-kernel/domain';
import {
  IdDataTypeSpecification,
  IdMinValueSpecification,
} from '@shared-kernel/domain/specification/id';
import { ValidationField } from '@shared-kernel/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class IdValidator extends ValueObjectValidator<Id> {
  protected _validator = new Validator(ValidationField.ID, this._id);
  protected _specifications = [new IdDataTypeSpecification(), new IdMinValueSpecification()];

  constructor(private _id: Id) {
    super();
  }
}
