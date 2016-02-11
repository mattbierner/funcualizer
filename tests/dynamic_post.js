"use strict";
const functionizer = require('../index');
const assert = require('chai').assert;

describe('dynamic_post', () => {
    it('should lookup and invoke 0 arity function', () => {
        const method = function() { return this.x + 10; };

        const f = functionizer.dynamic_post('f');
        assert.strictEqual(13, f({ f: method, x: 3 }));
        assert.strictEqual(15, f({ f: method, x: 5 }));
    });

    it('should lookup and invoke differnt arity functions', () => {
        for (let i = 0 ; i < 10; ++i) {
            const method = function() {
                return [this.x].concat([].slice.call(arguments));
            };

            let args = [];
            for (let a = 0; a < i; ++a)
                args.push(a);

            const f = functionizer.dynamic_post('f');
            assert.deepEqual([3].concat(args), f.apply(null, args.concat({ f: method, x: 3 })));
            assert.deepEqual([5].concat(args), f.apply(null, args.concat({ f: method, x: 5 })));
        }
    });

    it('should throw if self is falsy', () => {
        const f = functionizer.dynamic_post('f');
        assert.throw(() => f(null));
        assert.throw(() => f(undefined));
    });

    it('should throw if method does not exist', () => {
        const f = functionizer.dynamic_post('f');
        assert.throw(() => f({}));
    });
});
