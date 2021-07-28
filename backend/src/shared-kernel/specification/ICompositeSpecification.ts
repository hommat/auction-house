import { ISpecification } from '@shared-kernel/specification';

export interface ICompositeSpecification<T> extends ISpecification<T> {
  and(other: ICompositeSpecification<T>): ICompositeSpecification<T>;
  or(other: ICompositeSpecification<T>): ICompositeSpecification<T>;
  not(): ICompositeSpecification<T>;
}
