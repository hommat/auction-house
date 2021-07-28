import { Login } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MaxLengthSpecification } from '@shared-kernel/specification/string';

export class LoginMaxLengthSpecification extends CompositeSpecification<Login> {
  private maxLengthSpecification = new MaxLengthSpecification(10);

  public isSatisfiedBy(candidate: Login): boolean {
    return this.maxLengthSpecification.isSatisfiedBy(candidate.value);
  }
}
