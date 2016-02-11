"use strict";

var apply = Function.prototype.apply;

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.
*/
var functionalizer = function functionalizer(method) {
    return function (self) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return method.apply(self, args);
    };
};
functionalizer.pre = functionalizer;

/**
    Fixed arity version of `pre`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `pre`.
*/
functionalizer.pre$ = function (method, arity) {
    switch (arity === undefined ? method.length : arity) {
        case 0:
            return function (self) {
                return method.call(self);
            };
        case 1:
            return function (self, a) {
                return method.call(self, a);
            };
        case 2:
            return function (self, a, b) {
                return method.call(self, a, b);
            };
        case 3:
            return function (self, a, b, c) {
                return method.call(self, a, b, c);
            };
        case 4:
            return function (self, a, b, c, d) {
                return method.call(self, a, b, c, d);
            };
        case 5:
            return function (self, a, b, c, d, e) {
                return method.call(self, a, b, c, d, e);
            };
        case 6:
            return function (self, a, b, c, d, e, f) {
                return method.call(self, a, b, c, d, e, f);
            };
        case 7:
            return function (self, a, b, c, d, e, f, g) {
                return method.call(self, a, b, c, d, e, f, g);
            };
        case 8:
            return function (self, a, b, c, d, e, f, g, h) {
                return method.call(self, a, b, c, d, e, f, g, h);
            };
        default:
            return functionalizer.pre(method);
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the first argument of the function.

    The `this` parameter cannot be falsy.
*/
functionalizer.dynamic_pre = function (method_name) {
    return function (self) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        return self[method_name].apply(self, args);
    };
};

/**
    Fixed arity version of `dynamic_pre`.
*/
functionalizer.dynamic_pre$ = function (method_name, arity) {
    switch (arity) {
        case 0:
            return function (self) {
                return self[method_name]();
            };
        case 1:
            return function (self, a) {
                return self[method_name](a);
            };
        case 2:
            return function (self, a, b) {
                return self[method_name](a, b);
            };
        case 3:
            return function (self, a, b, c) {
                return self[method_name](a, b, c);
            };
        case 4:
            return function (self, a, b, c, d) {
                return self[method_name](a, b, c, d);
            };
        case 5:
            return function (self, a, b, c, d, e) {
                return self[method_name](a, b, c, d, e);
            };
        case 6:
            return function (self, a, b, c, d, e, f) {
                return self[method_name](a, b, c, d, e, f);
            };
        case 7:
            return function (self, a, b, c, d, e, f, g) {
                return self[method_name](a, b, c, d, e, f, g);
            };
        case 8:
            return function (self, a, b, c, d, e, f, g, h) {
                return self[method_name](a, b, c, d, e, f, g, h);
            };
        default:
            return functionalizer.dynamic_pre(method);
    }
};

/**
    Create a function that invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.
*/
functionalizer.post = function (method) {
    return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return method.apply(args.pop(), args);
    };
};

/**
    Fixed arity version of `post`.

    Infers `arity` from `method.length` if `arity` is not provided.

    Usually faster than `post`.
*/
functionalizer.post$ = function (method, arity) {
    switch (arity === undefined ? method.length : arity) {
        case 0:
            return function (self) {
                return method.call(self);
            };
        case 1:
            return function (a, self) {
                return method.call(self, a);
            };
        case 2:
            return function (a, b, self) {
                return method.call(self, a, b);
            };
        case 3:
            return function (a, b, c, self) {
                return method.call(self, a, b, c);
            };
        case 4:
            return function (a, b, c, d, self) {
                return method.call(self, a, b, c, d);
            };
        case 5:
            return function (a, b, c, d, e, self) {
                return method.call(self, a, b, c, d, e);
            };
        case 6:
            return function (a, b, c, d, e, f, self) {
                return method.call(self, a, b, c, d, e, f);
            };
        case 7:
            return function (a, b, c, d, e, f, g, self) {
                return method.call(self, a, b, c, d, e, f, g);
            };
        case 8:
            return function (a, b, c, d, e, f, g, h, self) {
                return method.call(self, a, b, c, d, e, f, g, h);
            };
        default:
            return functionalizer.post(method);
    }
};

/**
    Create a function that looks up and invokes a method on a `this` argument.
    The `this` argument is taken as the last argument of the function.

    @see `dynamic_pre`
*/
functionalizer.dynamic_post = function (method_name) {
    return function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        var self = args.pop();
        return self[method_name].apply(self, args);
    };
};

/**
    Fixed arity version of `dynamic_post`.
*/
functionalizer.dynamic_post$ = function (method_name, arity) {
    switch (arity) {
        case 0:
            return function (self) {
                return self[method_name]();
            };
        case 1:
            return function (a, self) {
                return self[method_name](a);
            };
        case 2:
            return function (a, b, self) {
                return self[method_name](a, b);
            };
        case 3:
            return function (a, b, c, self) {
                return self[method_name](a, b, c);
            };
        case 4:
            return function (a, b, c, d, self) {
                return self[method_name](a, b, c, d);
            };
        case 5:
            return function (a, b, c, d, e, self) {
                return self[method_name](a, b, c, d, e);
            };
        case 6:
            return function (a, b, c, d, e, f, self) {
                return self[method_name](a, b, c, d, e, f);
            };
        case 7:
            return function (a, b, c, d, e, f, g, self) {
                return self[method_name](a, b, c, d, e, f, g);
            };
        case 8:
            return function (a, b, c, d, e, f, g, h, self) {
                return self[method_name](a, b, c, d, e, f, g, h);
            };
        default:
            return functionalizer.dynamic_post(method);
    }
};

module.exports = functionalizer;
//# sourceMappingURL=index.js.map
