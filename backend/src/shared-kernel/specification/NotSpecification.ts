import { CompositeSpecification, ICompositeSpecification } from '@shared-kernel/specification';

export class NotSpecification<T> extends CompositeSpecification<T> {
  constructor(public spec: ICompositeSpecification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}
