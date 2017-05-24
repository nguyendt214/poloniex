import { PoloniexPage } from './app.po';

describe('poloniex App', function() {
  let page: PoloniexPage;

  beforeEach(() => {
    page = new PoloniexPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
