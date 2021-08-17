import { CompositeSpecification } from '@shared-kernel/specification';

export class FormatSpecification extends CompositeSpecification<string> {
  constructor(private _regexp: RegExp) {
    super();
  }

  public isSatisfiedBy(candidate: string): boolean {
    return this._regexp.test(candidate);
  }
}
