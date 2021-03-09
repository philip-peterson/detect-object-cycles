const { findCycles } = require('./main');

describe("findCycles", () => {
  it("should detect cycles properly", () => {
    const cyclic = {
        this: {
            is: {
                a: {
                    cycle: null,
                    noncycle: [1, 2, 3],
                    second_cycle: [1, 3, 3, 7],
                }
            },
            isnt: {
                a: {
                    cycle: 'foo',
                    dog: [2, 2, 1],
                }
            }
        }
    };
    cyclic.this.is.a.cycle = cyclic;
    cyclic.this.is.a.second_cycle[1] = cyclic.this;
    const cycles = findCycles(cyclic);
    expect(cycles).toEqual([['this', 'is', 'a', 'cycle'], ['this', 'is', 'a', 'second_cycle', '1']]);
  });
});
