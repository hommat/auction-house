import { FastifyRequest, FastifyReply } from 'fastify';

export interface IAccountRestV1Controller {
  createAccount(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
