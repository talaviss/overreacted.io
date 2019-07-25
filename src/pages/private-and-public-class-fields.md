---
title: Public and private class fields
date: '2018-12-25'
spoiler: new private public fields is coming in v8
---

Several proposals expand the existing JavaScript class syntax with new functionality. This article explains the new public class fields syntax in V8 v7.2 and Chrome 72, as well as the upcoming private class fields syntax.

Here’s a code example that creates an instance of a class named IncreasingCounter:

```jsx
const counter = new IncreasingCounter()
counter.value
// logs 'Getting the current value!'
// → 0
counter.increment()
counter.value
// logs 'Getting the current value!'
// → 1
```

Note that accessing the value executes some code (i.e., it logs a message) before returning the result. Now ask yourself, how would you implement this class in JavaScript? 🤔

#### ES2015 class syntax

Here’s how IncreasingCounter could be implemented using ES2015 class syntax:

```jsx
class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('Getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

The \_count property is now nicely declared at the top of the class. We no longer need a constructor just to define some fields. Neat!

However, the \_count field is still a public property. In this particular example, we want to prevent people from accessing the property directly.

#### Private class fields

That’s where private class fields come in. The new private fields syntax is similar to public fields, except [you mark the field as being private by using #](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md). You can think of the # as being part of the field name:

```jsx
class IncreasingCounter {
  #count = 0
  get value() {
    console.log('Getting the current value!')
    return this.#count
  }
  increment() {
    this.#count++
  }
}
```

Private fields are not accessible outside of the class body:

```jsx
const counter = new IncreasingCounter();
counter.#count;
// → SyntaxError
counter.#count = 42;
// → SyntaxError
```

#### Public and static properties

Class fields syntax can be used to create public and private static properties and methods as well:

```jsx
class FakeMath {
  // `PI` is a static public property.
  static PI = 22 / 7; // Close enough.

  // `#totallyRandomNumber` is a static private property.
  static #totallyRandomNumber = 4;

  // `#computeRandomNumber` is a static private method.
  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  // `random` is a static public method (ES2015 syntax)
  // that consumes `#computeRandomNumber`.
  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI;
// → 3.142857142857143
FakeMath.random();
// logs 'I heard you like random numbers…'
// → 4
FakeMath.#totallyRandomNumber;
// → SyntaxError
FakeMath.#computeRandomNumber();
// → SyntaxError
```

#### Simpler subclassing

The benefits of the class fields syntax become even clearer when dealing with subclasses that introduce additional fields.
Imagine the following base class Animal:

```jsx
class Animal {
  constructor(name) {
    this.name = name
  }
}
```

To create a `Cat` subclass that introduces an additional instance property,
you’d previously have to call super() to run the constructor of the `Animal` base class before creating the property:

```jsx
class Cat extends Animal {
  constructor(name) {
    super(name)
    this.likesBaths = false
  }
  meow() {
    console.log('Meow!')
  }
}
```

That’s a lot of boilerplate just to indicate that cats don’t enjoy taking baths.
Luckily, the class fields syntax removes the need for the whole constructor, including the awkward `super()` call:

```jsx
class Cat extends Animal {
  likesBaths = false
  meow() {
    console.log('Meow!')
  }
}
```

#### Conclusion

Public class fields are shipping in V8 v7.2 and Chrome 72.
