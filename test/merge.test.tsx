import mergeDeepRight from '../src/mergeDeepRight';

describe('it', () => {
  it('renders without crashing', () => {
    const r = mergeDeepRight(
      { alpha: 'ALPHA', merge: { a: 'A', nested: ['tag'] } },
      { beta: 'BETA', merge: { b: 'B', nested: ['tag2'] } }
    );

    const expected = {
      alpha: 'ALPHA',
      merge: { a: 'A', b: 'B' },
      beta: 'BETA',
    };
    expect(r).toMatchObject(expected);
  });
});
