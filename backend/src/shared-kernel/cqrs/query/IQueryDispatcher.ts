import { IDispatcher } from '@shared-kernel/cqrs';
import { Query } from '@shared-kernel/cqrs/query';

export interface IQueryDispatcher extends IDispatcher<Query, any> {}
