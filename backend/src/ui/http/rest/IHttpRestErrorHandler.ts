export interface IHttpErrorHandler<Response> {
  handle(error: Error, response: Response): Response;
}
