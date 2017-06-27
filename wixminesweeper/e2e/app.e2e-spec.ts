import { MineSweeperPage } from './app.po';

describe('wixminesweeper App', function() {
  let page: MineSweeperPage;

  beforeEach(() => {
    page = new MineSweeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
