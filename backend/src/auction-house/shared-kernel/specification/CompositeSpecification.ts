import {
  AndSpecification,
  ICompositeSpecification,
  NotSpecification,
  OrSpecification,
} from '@shared-kernel/specification';

export abstract class CompositeSpecification<T> implements ICompositeSpecification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  public and(other: ICompositeSpecification<T>): ICompositeSpecification<T> {
    return new AndSpecification<T>(this, other);
  }

  public or(other: ICompositeSpecification<T>): ICompositeSpecification<T> {
    return new OrSpecification<T>(this, other);
  }

  public not(): ICompositeSpecification<T> {
    return new NotSpecification<T>(this);
  }
}
