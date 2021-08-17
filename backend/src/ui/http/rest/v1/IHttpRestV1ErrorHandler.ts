import { FastifyReply } from 'fastify';

import { IHttpErrorHandler } from '@ui/http/rest';

export interface IHttpV1ErrorHandler extends IHttpErrorHandler<FastifyReply> {}
