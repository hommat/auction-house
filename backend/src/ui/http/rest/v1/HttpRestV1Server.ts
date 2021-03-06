import Fastify from 'fastify';

import {
  AccountRestV1Controller,
  AccountRestV1ErrorHandler,
  AccountRestV1Router,
} from '@account/ui/http/rest/v1';
import {
  SecurityRestV1Controller,
  SecurityRestV1ErrorHandler,
  SecurityRestV1Router,
} from '@security/ui/http/rest/v1';
import { ICommandDispatcher } from '@shared-kernel/cqrs/command';
import { IQueryDispatcher } from '@shared-kernel/cqrs/query';
import { IHttpServer } from '@ui/http';
import { HttpRestV1Router } from '@ui/http/rest/v1';

export class HttpRestV1Server implements IHttpServer {
  private _server = Fastify();

  constructor(
    private _commandDispatcher: ICommandDispatcher,
    private _queryDispatcher: IQueryDispatcher,
    private _address: string,
    private _port: number
  ) {}

  public run(): void {
    this.registerRoutes();

    this._server.listen(this._port, this._address, this.handleListenCallback.bind(this));
  }

  private registerRoutes(): void {
    const routers: HttpRestV1Router[] = [
      new AccountRestV1Router(
        this._server,
        new AccountRestV1ErrorHandler(),
        new AccountRestV1Controller(this._commandDispatcher)
      ),
      new SecurityRestV1Router(
        this._server,
        new SecurityRestV1ErrorHandler(),
        new SecurityRestV1Controller(this._queryDispatcher)
      ),
    ];

    routers.forEach((router) => router.registerRoutes());
  }

  private handleListenCallback(err: unknown): void {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`HTTP rest server v1 is listening on port ${this._port}...`);
  }
}
