import { WixminesweeperPage } from './app.po';

describe('wixminesweeper App', function() {
  let page: WixminesweeperPage;

  beforeEach(() => {
    page = new WixminesweeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
