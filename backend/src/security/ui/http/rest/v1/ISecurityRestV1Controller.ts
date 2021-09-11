import { FastifyRequest, FastifyReply } from 'fastify';

export interface ISecurityRestV1Controller {
  loginWithOAuth(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  loginWithOAuthCallback(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
