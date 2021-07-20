import { CompositeSpecification, ICompositeSpecification } from '@shared-kernel/specification';

export class AndSpecification<T> extends CompositeSpecification<T> {
  constructor(public left: ICompositeSpecification<T>, public right: ICompositeSpecification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}
