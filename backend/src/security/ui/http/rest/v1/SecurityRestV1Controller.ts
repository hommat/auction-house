import { FastifyRequest, FastifyReply } from 'fastify';

import { OAuthLinkQuery } from '@security/read-model/query';
import { OAuthLinkQueryInput } from '@security/read-model/query/input';
import { OAuthLinkQueryOutput } from '@security/read-model/query/output';
import { ISecurityRestV1Controller } from '@security/ui/http/rest/v1';
import {
  LoginWithOAuthInputDTO,
  LoginWithOAuthCallbackInputDTO,
} from '@security/ui/http/rest/v1/dto';
import { IQueryDispatcher } from '@shared-kernel/cqrs/query';
import { HttpStatusCode } from '@ui/http/';

export class SecurityRestV1Controller implements ISecurityRestV1Controller {
  constructor(private _queryDispatcher: IQueryDispatcher) {}

  public async loginWithOAuth(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    const { method } = req.query as LoginWithOAuthInputDTO;

    const queryOutput = (await this._queryDispatcher.dispatch(
      OAuthLinkQuery.create(new OAuthLinkQueryInput(method))
    )) as OAuthLinkQueryOutput;

    rep.redirect(HttpStatusCode.FOUND, queryOutput.link);
  }

  public async loginWithOAuthCallback(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    const { code } = req.query as LoginWithOAuthCallbackInputDTO;
  }
}
