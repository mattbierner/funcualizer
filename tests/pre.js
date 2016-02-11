"use strict";
const functionizer = require('../index');
const assert = require('chai').assert;

describe('pre', () => {
    it('should lookup and invoke 0 arity function', () => {
        const method = function() { return this.x + 10; };

        const f = functionizer.pre(method);
        assert.strictEqual(13, f({ x: 3 }));
        assert.strictEqual(15, f({ x: 5 }));
    });

    it('should be top level export', () => {
        const method = function() { return this.x + 10; };

        const f = functionizer(method);
        assert.strictEqual(13, f({ x: 3 }));
    });


    it('should lookup and invoke differnt arity functions', () => {
        const method = function() {
            return [this.x].concat([].slice.call(arguments));
        };

        for (let i = 0 ; i < 20; ++i) {
            const args = [];
            for (let a = 0; a < i; ++a)
                args.push(a);

            const f = functionizer.pre(method);
            assert.deepEqual([3].concat(args), f.apply(null, [{ x: 3 }].concat(args)));
            assert.deepEqual([5].concat(args), f.apply(null, [{ x: 5 }].concat(args)));
        }
    });

    it('should throw if self is falsy', () => {
        const f = functionizer.pre(function() { return this.x; });
        assert.throw(() => f(null));
        assert.throw(() => f(undefined));
    });

    it('should throw if self is falsy and this is not used', () => {
        const f = functionizer.pre(function() { return 10; });
        assert.strictEqual(10, f(null));
        assert.strictEqual(10, f(undefined));
    });
});
