"use strict";
const functionizer = require('../index');
const assert = require('chai').assert;

describe('post$', () => {
    it('should lookup and invoke differnt arity functions', () => {
        const args = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const method = function() { return [this.x].concat([].slice.call(arguments)); };
        for (let i = 0 ; i < 8; ++i) {
            const a = args.slice(0, i);
            const f = functionizer.post$(method, i);

            assert.strictEqual(i + 1, f.length);
            assert.deepEqual([3].concat(args.slice(0, i)), f.apply(null, a.concat({ x: 3 })));
            assert.deepEqual([5].concat(args.slice(0, i)), f.apply(null, a.concat({ x: 5 })));
        }
    });
});
