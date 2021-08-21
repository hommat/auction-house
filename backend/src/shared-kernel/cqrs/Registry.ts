import { IHandler, Resource } from '@shared-kernel/cqrs';
import {
  HandlerAlreadyRegisteredException,
  HandlerNotRegisteredException,
} from '@shared-kernel/cqrs/exception';

export class Registry {
  private _registeredHandlers = new Map<string, IHandler<Resource, any>>();

  public register<ConcreteResource extends Resource>(
    name: string,
    handler: IHandler<ConcreteResource, any>
  ): void {
    if (this._registeredHandlers.has(name)) {
      throw new HandlerAlreadyRegisteredException();
    }

    this._registeredHandlers.set(name, handler);
  }

  public getHandler<ConcreteResource extends Resource>(
    resource: ConcreteResource
  ): IHandler<ConcreteResource, any> {
    if (!this._registeredHandlers.has(resource.name)) {
      throw new HandlerNotRegisteredException();
    }

    return this._registeredHandlers.get(resource.name) as IHandler<ConcreteResource, any>;
  }
}
