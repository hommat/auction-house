import { Password } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MaxLengthSpecification } from '@shared-kernel/specification/string';

export class PasswordMaxLengthSpecification extends CompositeSpecification<Password> {
  private maxLengthSpecification = new MaxLengthSpecification(10);

  public isSatisfiedBy(candidate: Password): boolean {
    return this.maxLengthSpecification.isSatisfiedBy(candidate.value);
  }
}
