import { FastifyInstance, FastifyReply } from 'fastify';

import { IAccountRestV1Controller } from '@account/ui/http/rest/v1';
import { HttpMethod } from '@ui/http';
import { IHttpErrorHandler } from '@ui/http/rest';
import { HttpRestV1Router } from '@ui/http/rest/v1';

export class AccountRestV1Router extends HttpRestV1Router {
  protected _baseUrl = '/account';

  private _createAccountUrl = '/create';

  constructor(
    server: FastifyInstance,
    errorHandler: IHttpErrorHandler<FastifyReply>,
    private _controller: IAccountRestV1Controller
  ) {
    super(server, errorHandler);
  }

  public registerRoutes(): void {
    this.registerRoute(
      this._createAccountUrl,
      HttpMethod.POST,
      this._controller.createAccount.bind(this._controller)
    );
  }
}
