import { HttpMethod } from '@ui/http';
import { HttpRestV1Router, IHttpV1ErrorHandler } from '@ui/http/rest/v1';

class MockHttpRestV1Router extends HttpRestV1Router {
  protected _baseUrl = '/some-base-url';

  public route: any;

  constructor(
    private url: string,
    private method: HttpMethod,
    private handler: () => void,
    errorHandler: IHttpV1ErrorHandler
  ) {
    super(
      {
        route: (r: any) => {
          this.route = r;
        },
      } as any,
      errorHandler
    );
  }

  public registerRoutes() {
    this.registerRoute(this.url, this.method, this.handler);
  }
}

describe('HttpRestV1Router', () => {
  describe('registerRoute', () => {
    it('should call error handler when error occurs', () => {
      const concreteErr = new Error();
      const mockRouteHandler = jest.fn(() => {
        throw concreteErr;
      });

      const mockHandleErrorFn = jest.fn();
      const mockErrorHandler: IHttpV1ErrorHandler = {
        handle: mockHandleErrorFn,
      };

      const router = new MockHttpRestV1Router(
        '/test-url',
        HttpMethod.GET,
        mockRouteHandler,
        mockErrorHandler
      );

      router.registerRoutes();
      router.route.handler();

      expect(mockRouteHandler.mock.calls.length).toBe(1);

      expect(mockHandleErrorFn.mock.calls.length).toBe(1);
      expect(mockHandleErrorFn.mock.calls[0][0]).toBe(concreteErr);
    });

    it('should not call error handler when error do not occur', () => {
      const mockRouteHandler = jest.fn();
      const mockHandleErrorFn = jest.fn();
      const mockErrorHandler: IHttpV1ErrorHandler = {
        handle: mockHandleErrorFn,
      };

      const router = new MockHttpRestV1Router(
        '/test-url',
        HttpMethod.GET,
        mockRouteHandler,
        mockErrorHandler
      );

      router.registerRoutes();
      router.route.handler();

      expect(mockRouteHandler.mock.calls.length).toBe(1);
      expect(mockHandleErrorFn.mock.calls.length).toBe(0);
    });

    it('should register route with added apiUrl and baseUrl to route url', () => {
      const mockRouteHandler = jest.fn();
      const mockErrorHandler: IHttpV1ErrorHandler = {
        handle: jest.fn(),
      };

      const router = new MockHttpRestV1Router(
        '/test-url',
        HttpMethod.GET,
        mockRouteHandler,
        mockErrorHandler
      );

      router.registerRoutes();

      expect(router.route.url).toBe('/api/v1/some-base-url/test-url');
    });

    it('should register route with given http method', () => {
      const mockRouteHandler = jest.fn();
      const mockErrorHandler: IHttpV1ErrorHandler = {
        handle: jest.fn(),
      };

      const router = new MockHttpRestV1Router(
        '/test-url',
        HttpMethod.GET,
        mockRouteHandler,
        mockErrorHandler
      );

      router.registerRoutes();

      expect(router.route.method).toBe(HttpMethod.GET);
    });
  });
});
