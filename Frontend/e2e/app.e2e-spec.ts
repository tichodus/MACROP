import { MacropPage } from './app.po';

describe('macrop App', () => {
  let page: MacropPage;

  beforeEach(() => {
    page = new MacropPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
