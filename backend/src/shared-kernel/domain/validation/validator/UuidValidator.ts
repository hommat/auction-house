import { Uuid } from '@shared-kernel/domain';
import {
  UuidDataTypeSpecification,
  UuidFormatSpecification,
} from '@shared-kernel/domain/specification/uuid';
import { ValidationField } from '@shared-kernel/domain/validation';
import { ValueObjectValidator, Validator } from '@shared-kernel/validation';

export class UuidValidator extends ValueObjectValidator<Uuid> {
  protected _validator = new Validator(ValidationField.UUID, this._uuid);
  protected _specifications = [new UuidDataTypeSpecification(), new UuidFormatSpecification()];

  constructor(private _uuid: Uuid) {
    super();
  }
}
