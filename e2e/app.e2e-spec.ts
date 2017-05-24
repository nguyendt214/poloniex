import { Poloniex2Page } from './app.po';

describe('poloniex2 App', function() {
  let page: Poloniex2Page;

  beforeEach(() => {
    page = new Poloniex2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
