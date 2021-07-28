import { CompositeSpecification, ICompositeSpecification } from '@shared-kernel/specification';

export class OrSpecification<T> extends CompositeSpecification<T> {
  constructor(public left: ICompositeSpecification<T>, public right: ICompositeSpecification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}
