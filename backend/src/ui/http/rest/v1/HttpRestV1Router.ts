import { FastifyInstance, FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';

import { HttpMethod } from '@ui/http';
import { IHttpRestRouter } from '@ui/http/rest';
import { IHttpV1ErrorHandler, HttpRestV1ErrorHandler } from '@ui/http/rest/v1';

export abstract class HttpRestV1Router implements IHttpRestRouter<FastifyRequest, FastifyReply> {
  protected _baseUrl = '';

  constructor(
    private _server: FastifyInstance,
    private _httpErrorHandler: IHttpV1ErrorHandler = new HttpRestV1ErrorHandler()
  ) {}

  public abstract registerRoutes(): void;

  public registerRoute(url: string, method: HttpMethod, handler: RouteHandlerMethod): void {
    this._server.route({
      url: '/api/v1' + this._baseUrl + url,
      method,
      handler: this.handleRouteSecure(handler),
    });
  }

  private handleRouteSecure(handler: RouteHandlerMethod): RouteHandlerMethod {
    return async (req: FastifyRequest, rep: FastifyReply) => {
      try {
        await handler.call(this._server, req, rep);
      } catch (err) {
        this._httpErrorHandler.handle(err, rep);
      }
    };
  }
}
