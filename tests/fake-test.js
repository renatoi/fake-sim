import test from 'tape';
import fake from '../src/Fake.js';

// due to lack of time, I did not add here selenium webdriver tests

test('returns an array of variations', function(t) {
  t.plan(1);
  const expected = [1,2,3,4,5];

  // TODO: mock get variations here
  fake.install("abc");
  fake.getVariations(function(variations) {
    t.deepEqual(variations, expected);
  });
});