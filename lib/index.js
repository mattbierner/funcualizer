"use strict";
const apply = Function.prototype.apply;

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.
*/
const funcualizer = (method) =>
    (self, ...args) =>
        method.apply(self, args);
funcualizer.pre = funcualizer;

/**
    Fixed arity version of `pre`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `pre`.
*/
funcualizer.pre$ = (method, arity) => {
    switch (arity === undefined ? method.length : arity) {
    case 0: return (self) => method.call(self);
    case 1: return (self, a) => method.call(self, a);
    case 2: return (self, a, b) => method.call(self, a, b);
    case 3: return (self, a, b, c) => method.call(self, a, b, c);
    case 4: return (self, a, b, c, d) => method.call(self, a, b, c, d);
    case 5: return (self, a, b, c, d, e) => method.call(self, a, b, c, d, e);
    case 6: return (self, a, b, c, d, e, f) => method.call(self, a, b, c, d, e, f);
    case 7: return (self, a, b, c, d, e, f, g) => method.call(self, a, b, c, d, e, f, g);
    case 8: return (self, a, b, c, d, e, f, g, h) => method.call(self, a, b, c, d, e, f, g, h);
    default: return funcualizer.pre(method);
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.

    The `this` parameter cannot be falsy.
*/
funcualizer.dynamic_pre = methodName =>
    (self, ...args) =>
        self[methodName].apply(self, args);

/**
    Fixed arity version of `dynamic_pre`.
*/
funcualizer.dynamic_pre$ = (methodName, arity) => {
    switch (arity) {
    case 0: return (self) => self[methodName]();
    case 1: return (self, a) => self[methodName](a);
    case 2: return (self, a, b) => self[methodName](a, b);
    case 3: return (self, a, b, c) => self[methodName](a, b, c);
    case 4: return (self, a, b, c, d) => self[methodName](a, b, c, d);
    case 5: return (self, a, b, c, d, e) => self[methodName](a, b, c, d, e);
    case 6: return (self, a, b, c, d, e, f) => self[methodName](a, b, c, d, e, f);
    case 7: return (self, a, b, c, d, e, f, g) => self[methodName](a, b, c, d, e, f, g);
    case 8: return (self, a, b, c, d, e, f, g, h) => self[methodName](a, b, c, d, e, f, g, h);
    default: return funcualizer.dynamic_pre(methodName);
    }
};

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.
*/
funcualizer.post = method =>
    (...args) =>
        method.apply(args.pop(), args);

/**
    Fixed arity version of `post`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `post`.
*/
funcualizer.post$ = (method, arity) => {
    switch (arity === undefined ? method.length : arity) {
    case 0: return (self) => method.call(self);
    case 1: return (a, self) => method.call(self, a);
    case 2: return (a, b, self) => method.call(self, a, b);
    case 3: return (a, b, c, self) => method.call(self, a, b, c);
    case 4: return (a, b, c, d, self) => method.call(self, a, b, c, d);
    case 5: return (a, b, c, d, e, self) => method.call(self, a, b, c, d, e);
    case 6: return (a, b, c, d, e, f, self) => method.call(self, a, b, c, d, e, f);
    case 7: return (a, b, c, d, e, f, g, self) => method.call(self, a, b, c, d, e, f, g);
    case 8: return (a, b, c, d, e, f, g, h, self) => method.call(self, a, b, c, d, e, f, g, h);
    default: return funcualizer.post(method)
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.

    @see `dynamic_pre`
*/
funcualizer.dynamic_post = methodName =>
    (...args) => {
        const self = args.pop();
        return self[methodName].apply(self, args);
    };

/**
    Fixed arity version of `dynamic_post`.
*/
funcualizer.dynamic_post$ = (methodName, arity) => {
    switch (arity) {
    case 0: return (self) => self[methodName]();
    case 1: return (a, self) => self[methodName](a);
    case 2: return (a, b, self) => self[methodName](a, b);
    case 3: return (a, b, c, self) => self[methodName](a, b, c);
    case 4: return (a, b, c, d, self) => self[methodName](a, b, c, d);
    case 5: return (a, b, c, d, e, self) => self[methodName](a, b, c, d, e);
    case 6: return (a, b, c, d, e, f, self) => self[methodName](a, b, c, d, e, f);
    case 7: return (a, b, c, d, e, f, g, self) => self[methodName](a, b, c, d, e, f, g);
    case 8: return (a, b, c, d, e, f, g, h, self) => self[methodName](a, b, c, d, e, f, g, h);
    default: return funcualizer.dynamic_post(methodName);
    }
};

module.exports = funcualizer;
