import { IHandler } from '@shared-kernel/cqrs';
import { Query } from '@shared-kernel/cqrs/query';

export interface IQueryHandler<ConcreteQuery extends Query, Response>
  extends IHandler<ConcreteQuery, Response> {}
