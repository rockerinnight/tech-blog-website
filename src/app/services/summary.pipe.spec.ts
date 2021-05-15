import { SummaryPipe } from '../helpers/summary.pipe';

describe('SummaryPipe', () => {
  it('create an instance', () => {
    const pipe = new SummaryPipe();
    expect(pipe).toBeTruthy();
  });
});
