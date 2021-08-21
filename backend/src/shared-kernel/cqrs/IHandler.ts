export interface IHandler<Resource, Response> {
  execute(resource: Resource): Promise<Response>;
}
