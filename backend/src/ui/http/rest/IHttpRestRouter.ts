import { HttpMethod } from '../';

export interface IHttpRestRouter<Request, Response> {
  registerRoute(
    url: string,
    method: HttpMethod,
    handler: (req: Request, res: Response) => void
  ): void;
}
