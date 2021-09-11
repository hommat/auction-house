import { CreateThirdPartyAccountCommandInput } from '@account/application/command/input';
import {
  Email,
  ThirdPartyAccountId,
  ThirdPartyAccountService,
  ThirdPartyAccountServiceType,
} from '@account/domain';
import { Command } from '@shared-kernel/cqrs/command';

export class CreateThirdPartyAccountCommand extends Command {
  public static create(i: CreateThirdPartyAccountCommandInput): CreateThirdPartyAccountCommand {
    const [email, emailValidationErr] = this.createSafe(() => Email.create(i.email));
    const [thirdPartyAccountId, thirdPartyAccountIdValidationErr] = this.createSafe(() =>
      ThirdPartyAccountId.create(i.thirdPartyAccountId)
    );
    const [thirdPartyAccountService, thirdPartyAccountServiceValidationErr] = this.createSafe(() =>
      ThirdPartyAccountService.create(i.thirdPartyAccountService as ThirdPartyAccountServiceType)
    );

    this.throwInvalidInputExceptionIfNeeded(
      emailValidationErr,
      thirdPartyAccountIdValidationErr,
      thirdPartyAccountServiceValidationErr
    );

    return new CreateThirdPartyAccountCommand(
      email!,
      thirdPartyAccountId!,
      thirdPartyAccountService!
    );
  }

  private constructor(
    private _email: Email,
    private _thirdPartyAccountId: ThirdPartyAccountId,
    private _thirdPartyAccountService: ThirdPartyAccountService
  ) {
    super();
  }

  public get email(): Email {
    return this._email;
  }

  public get thirdPartyAccountId(): ThirdPartyAccountId {
    return this._thirdPartyAccountId;
  }

  public get thirdPartyAccountService(): ThirdPartyAccountService {
    return this._thirdPartyAccountService;
  }
}
