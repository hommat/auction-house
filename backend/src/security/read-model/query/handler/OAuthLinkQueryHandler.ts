import { OAuthLinkFactory } from '@security/domain/factory';
import { OAuthLinkQuery } from '@security/read-model/query';
import { OAuthLinkQueryOutput } from '@security/read-model/query/output';
import { IQueryHandler } from '@shared-kernel/cqrs/query';

export class OAuthLinkQueryHandler implements IQueryHandler<OAuthLinkQuery, OAuthLinkQueryOutput> {
  public async execute(query: OAuthLinkQuery): Promise<OAuthLinkQueryOutput> {
    const { oAuthMethod } = query;
    const oAuthLink = OAuthLinkFactory.create(oAuthMethod);

    return new OAuthLinkQueryOutput(oAuthLink.toUrl().value);
  }
}
