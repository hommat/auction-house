import { Login } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinLengthSpecification } from '@shared-kernel/specification/string';

export class LoginMinLengthSpecification extends CompositeSpecification<Login> {
  private minLengthSpecification = new MinLengthSpecification(5);

  public isSatisfiedBy(candidate: Login): boolean {
    return this.minLengthSpecification.isSatisfiedBy(candidate.value);
  }
}
