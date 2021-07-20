import { CompositeSpecification } from '@shared-kernel/specification';

export class MinValueSpecification extends CompositeSpecification<number> {
  constructor(private _minValue: number) {
    super();
  }

  public isSatisfiedBy(candidate: number): boolean {
    return candidate >= this._minValue;
  }
}
