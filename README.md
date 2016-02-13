# Functionizer
Small Javascript node library for converting methods into performant functions.

```js
const functionizer = require('functionizer');

const slice = functionizer(Array.prototype.slice);

slice([1, 2, 3], 2) === [3]
slice("abc", 0, 2) === ['a', 'b']
```

Functionizing a method allows it to be used and passed around as a true function, without having to `.call` it.

The library provides helpers to create functions that take `this` as either an explicit first or last parameter:

```js
const post_slice = functionizer.post(Array.prototype.slice);

post_slice(2, [1, 2, 3]) === [3]
post_slice(0, 2, "abc") === ['a', 'b']
```

The library allows you to choose between more generic behavior and a more performant implementation, with some of the resulting functions having [overhead comparable to a handwritten method-to-function implementation][benchmark].


## Documentation

#### `functionizer(method)`
#### `functionizer.pre(method)`
Convert `method` into a function that takes `this` as a first argument. Forwards all other arguments to `method`.

```js
const slice = functionizer.pre(Array.prototype.slice);

slice([1, 2, 3], 2) === [3]
slice([1, 2, 3], 0, 2) === [1, 2]
```

This is usually the slowest implementation. Try using `pre$` for better performance if perfect forwarding is not needed.

`pre` is also the top level export of the package:

```js
functionizer(Array.prototype.slice) === functionizer.pre(Array.prototype.slice)
```

#### `functionizer.pre$(method [, arity])`
Same as `pre` but for methods with a fixed number of arguments.

`arity` is the number of arguments that `method` expects. If `arity` is not provided, it is inferred from `method.length`.

```js
// infers `arity === 2` from `Array.prototype.slice.length`.
const slice = functionizer.pre$(Array.prototype.slice);

slice([1, 2, 3], 2) === [3]
slice([1, 2, 3], 0, 2) === [1, 2]
```

This is usually much faster than `pre`, but cannot forward arbitrary argument sets like `pre` can.

#### `functionizer.dynamic_pre(methodName)`
Same general behavior as `pre` but looks up a method by name on the `this` argument. This means that the actual method implementation is not known until the function is invoked:

```js
const toString = functionizer.dynamic_pre('toString');

toString([1, 2, 3]) === "1,2,3"
toString({}) === "[object Object]"
toString({ toString: () => "bla" }) === 'bla'
```
#### `functionizer.dynamic_pre$(methodName, arity)`
Fixed argument version of `dynamic_pre`.

Unlike `pre$`, since there is no method object to worth with here, the `arity` must be provided in order to gain any performance over regular `dynamic_pre`.

*****

#### `functionizer.post(method)`
Convert `method` into a function that takes `this` as a last argument. Forwards all other arguments to `method`.

```js
const slice_post = functionizer.post(Array.prototype.slice);

slice_post(2, [1, 2, 3]) === [3]
slice_post(0, 2, "abc") === ['a', 'b']
```

This is usually the slowest implementation. Try using `post$` for better performance if perfect forwarding is not needed.

#### `functionizer.post$(method [, arity])`
Same as `post` but for methods with a fixed number of arguments.

`arity` is the number of arguments that `method` expects.

```js
// infers `arity === 2` from `Array.prototype.slice.length`.
const slice_post = functionizer.post$(Array.prototype.slice);

slice_post(2, [1, 2, 3]) === [3]
slice_post(0, 2, "abc") === ['a', 'b']
```

Unlike `pre$` however, the `this` argument is always at index `arity`, even if you invoke the function with less than the number of expected arguments.

This is usually much faster than `post`, but cannot forward arbitrary argument sets like `post` can.

#### `functionizer.dynamic_post(methodName)`
Same general behavior as `post` but looks up a method by name on the `this` argument. See `dynamic_pre`.

#### `functionizer.dynamic_post$(methodName, arity)`
Fixed argument version of `dynamic_post`.


[benchmark]: https://jsperf.com/free-function-forward-cost/6
