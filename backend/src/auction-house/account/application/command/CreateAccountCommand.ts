import { Command } from '@shared-kernel/command';

export class CreateAccountCommand extends Command {
  constructor(private _login: string, private _password: string) {
    super();
  }

  public get login(): string {
    return this._login;
  }

  public get password(): string {
    return this._password;
  }
}
