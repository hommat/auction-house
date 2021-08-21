export interface IDispatcher<Resource, Response> {
  dispatch(resource: Resource): Promise<Response>;
}
