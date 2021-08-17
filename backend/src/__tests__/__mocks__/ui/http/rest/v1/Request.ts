import { FastifyRequest } from 'fastify';

export const mockRequest = (body: any): FastifyRequest => ({ body } as any);
