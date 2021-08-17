import Fastify from 'fastify';

import {
  AccountRestV1Controller,
  AccountRestV1ErrorHandler,
  AccountRestV1Router,
} from '@account/ui/http/rest/v1';
import { ICommandDispatcher } from '@shared-kernel/command';
import { IHttpServer } from '@ui/http';
import { HttpRestV1Router } from '@ui/http/rest/v1';

export class HttpRestV1Server implements IHttpServer {
  private _server = Fastify();

  constructor(private _commandDispatcher: ICommandDispatcher, private _port: number) {}

  public async run(): Promise<void> {
    this.registerRoutes();

    return this._server
      .listen(this._port)
      .then(this.handleServerRunSuccess.bind(this), this.handleServerRunFailure.bind(this));
  }

  private registerRoutes(): void {
    const routers: HttpRestV1Router[] = [
      new AccountRestV1Router(
        this._server,
        new AccountRestV1ErrorHandler(),
        new AccountRestV1Controller(this._commandDispatcher)
      ),
    ];

    routers.forEach((router) => router.registerRoutes());
  }

  private handleServerRunSuccess(): void {
    this._server.log.info(`HTTP rest server v1 is listening on port ${this._port}...`);
  }

  private handleServerRunFailure(err: unknown): void {
    this._server.log.error(err);
    process.exit(1);
  }
}
