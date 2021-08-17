import { CompositeSpecification } from '@shared-kernel/specification';

export class StringSpecification extends CompositeSpecification<string> {
  public isSatisfiedBy(candidate: string): boolean {
    return Object.prototype.toString.call(candidate) === '[object String]';
  }
}
