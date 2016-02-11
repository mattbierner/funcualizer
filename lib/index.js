"use strict";
const apply = Function.prototype.apply;

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.
*/
const functionalizer = (method) =>
    (self, ...args) =>
        method.apply(self, args);
functionalizer.pre = functionalizer;

/**
    Fixed arity version of `pre`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `pre`.
*/
functionalizer.pre$ = (method, arity) => {
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
    default: return functionalizer.pre(method);
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.

    The `this` parameter cannot be falsy.
*/
functionalizer.dynamic_pre = method_name =>
    (self, ...args) =>
        self[method_name].apply(self, args);

/**
    Fixed arity version of `dynamic_pre`.
*/
functionalizer.dynamic_pre$ = (method_name, arity) => {
    switch (arity) {
    case 0: return (self) => self[method_name]();
    case 1: return (self, a) => self[method_name](a);
    case 2: return (self, a, b) => self[method_name](a, b);
    case 3: return (self, a, b, c) => self[method_name](a, b, c);
    case 4: return (self, a, b, c, d) => self[method_name](a, b, c, d);
    case 5: return (self, a, b, c, d, e) => self[method_name](a, b, c, d, e);
    case 6: return (self, a, b, c, d, e, f) => self[method_name](a, b, c, d, e, f);
    case 7: return (self, a, b, c, d, e, f, g) => self[method_name](a, b, c, d, e, f, g);
    case 8: return (self, a, b, c, d, e, f, g, h) => self[method_name](a, b, c, d, e, f, g, h);
    default: return functionalizer.dynamic_pre(method);
    }
};

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.
*/
functionalizer.post = method =>
    (...args) =>
        method.apply(args.pop(), args);

/**
    Fixed arity version of `post`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `post`.
*/
functionalizer.post$ = (method, arity) => {
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
    default: return functionalizer.post(method)
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.

    @see `dynamic_pre`
*/
functionalizer.dynamic_post = method_name =>
    (...args) => {
        const self = args.pop();
        return self[method_name].apply(self, args);
    };

/**
    Fixed arity version of `dynamic_post`.
*/
functionalizer.dynamic_post$ = (method_name, arity) => {
    switch (arity) {
    case 0: return (self) => self[method_name]();
    case 1: return (a, self) => self[method_name](a);
    case 2: return (a, b, self) => self[method_name](a, b);
    case 3: return (a, b, c, self) => self[method_name](a, b, c);
    case 4: return (a, b, c, d, self) => self[method_name](a, b, c, d);
    case 5: return (a, b, c, d, e, self) => self[method_name](a, b, c, d, e);
    case 6: return (a, b, c, d, e, f, self) => self[method_name](a, b, c, d, e, f);
    case 7: return (a, b, c, d, e, f, g, self) => self[method_name](a, b, c, d, e, f, g);
    case 8: return (a, b, c, d, e, f, g, h, self) => self[method_name](a, b, c, d, e, f, g, h);
    default: return functionalizer.dynamic_post(method);
    }
};

module.exports = functionalizer;