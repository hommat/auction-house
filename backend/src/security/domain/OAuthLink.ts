import { Url } from '@shared-kernel/domain';

export class OAuthLink {
  constructor(
    private _rootUrl: Url,
    private _redirectUri: Url,
    private _clientId: string,
    private _accessType: string,
    private _responseType: string,
    private _prompt: string,
    private _scope: Url[]
  ) {}

  public toUrl(): Url {
    const searchParams = new URLSearchParams();

    searchParams.set('redirect_uri', this._redirectUri.value);
    searchParams.set('client_id', this._clientId);
    searchParams.set('access_type', this._accessType);
    searchParams.set('response_type', this._responseType);
    searchParams.set('prompt', this._prompt);
    searchParams.set('scope', this._scope.map((s) => s.value).join(' '));

    return new Url(`${this._rootUrl.value}?${searchParams.toString()}`);
  }
}
