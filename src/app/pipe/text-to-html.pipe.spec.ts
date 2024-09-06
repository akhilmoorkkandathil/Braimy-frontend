import { TextToHtmlPipe } from './text-to-html.pipe';

describe('TextToHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new TextToHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
