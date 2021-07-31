import { Password } from '@account/domain';
import { CompositeSpecification } from '@shared-kernel/specification';
import { MinLengthSpecification } from '@shared-kernel/specification/string';

export class PasswordMinLengthSpecification extends CompositeSpecification<Password> {
  private minLengthSpecification = new MinLengthSpecification(5);

  public isSatisfiedBy(candidate: Password): boolean {
    return this.minLengthSpecification.isSatisfiedBy(candidate.value);
  }
}
