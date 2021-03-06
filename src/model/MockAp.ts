import MockApConfluence from "./MockApConfluence";
import {IAp} from "./IAp";

const CONTRACT: any = {
  customContent: {method: 'get', URL: /\/rest\/api\/content\/(\d+)/},
  createCustomContent: { method: 'post', URL: /\/rest\/api\/content/}
};

const matchContract = (request: any, api: string): any => {
  const contract = CONTRACT[api];
  return contract && request.type.toLowerCase() === contract.method && request.url.match(contract.URL);
};

interface RequestHandler {
  match(request: any): boolean,
  handle(request: any): any
}

export default class MockAp implements IAp {
  public confluence: any
  public request: any
  public navigator: any
  public user: any;

  private readonly contentId: any
  private requestHandlers: Array<RequestHandler> = []

  constructor(pageId: any = null) {
    console.warn('MockAp is used. This should be used on non-confluence pages only.')
    this.user = {
      getCurrentUser: function (cb: any) {
        cb({
          atlassianAccountId: 'fake:user-account-id',
        })
      }
    }
    this.confluence = new MockApConfluence();
    this.navigator = {
      getLocation: (_: any) => {}
    }
    this.contentId = pageId;
    this.navigator = {
      getLocation: (cb: any) => cb({
          context: { contentId: this.contentId, spaceKey: 'fake-space' }
        }
      )
    };
    // @ts-ignore
    this.requestHandlers.push({match: r => {
        const result = matchContract(r, 'createCustomContent');
        return !!result;
      }, handle: r => ({body: JSON.stringify({id: 1234, body: {raw: {value: JSON.stringify('content')}}})})});
    this.request = (request: any) => {
      const handler = this.requestHandlers.find(h => h.match(request));
      if(handler) {
        return handler.handle(request);
      }
    };
  }

  setCustomContent(customContentId: any, content: any) {
    this.requestHandlers.push({match: r => {
      const result = matchContract(r, 'customContent');
      if(result && result.length > 1) {
        return result[1] === String(customContentId);
      }
      return undefined;
    }, handle: r => ({body: JSON.stringify({body: {raw: {value: JSON.stringify(content)}}})})} as RequestHandler);
  }

  events = {
    onPublic: () => {},
  }

  context = {
    getContext: async () => {
      return {
        confluence: {
          space: {
            key: 'fake-space'
          }
        }
      }
    }
  }

  dialog = {
    create: async (args: any) => {
      console.warn('Creating dialog from MocAp with args ', args);
    }
  }
}