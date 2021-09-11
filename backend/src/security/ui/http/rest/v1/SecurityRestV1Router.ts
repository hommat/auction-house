import { FastifyInstance, FastifyReply } from 'fastify';

import { ISecurityRestV1Controller } from '@security/ui/http/rest/v1';
import { HttpMethod } from '@ui/http';
import { IHttpErrorHandler } from '@ui/http/rest';
import { HttpRestV1Router } from '@ui/http/rest/v1';

export class SecurityRestV1Router extends HttpRestV1Router {
  protected _baseUrl = '/security';

  private _loginWithOAuth = '/login-with-oauth';
  private _loginWithOAuthCallback = '/login-with-oauth-callback';

  constructor(
    server: FastifyInstance,
    errorHandler: IHttpErrorHandler<FastifyReply>,
    private _controller: ISecurityRestV1Controller
  ) {
    super(server, errorHandler);
  }

  public registerRoutes(): void {
    this.registerRoute(
      this._loginWithOAuth,
      HttpMethod.GET,
      this._controller.loginWithOAuth.bind(this._controller)
    );

    this.registerRoute(
      this._loginWithOAuthCallback,
      HttpMethod.GET,
      this._controller.loginWithOAuthCallback.bind(this._controller)
    );
  }
}
