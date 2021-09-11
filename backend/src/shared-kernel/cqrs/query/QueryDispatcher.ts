import { Registry } from '@shared-kernel/cqrs';
import { Query, IQueryDispatcher } from '@shared-kernel/cqrs/query';

export class QueryDispatcher implements IQueryDispatcher {
  constructor(private _commandRegistry: Registry) {}

  public async dispatch<T>(query: Query): Promise<T> {
    return await this._commandRegistry.getHandler(query).execute(query);
  }
}
