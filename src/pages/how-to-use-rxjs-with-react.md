---
title: Rxjs explained and how to use with React
date: '2019-07-25'
author: 'tal avissar'
spoiler: We will talk about subjects, observables and observers and rxjs integration with react 
---

### What is rxjs
Knowing what RxJS is and how it helps is the most significant part of learning. Lets have a look at some definitions we get from google. 


> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.

RxJS is one of the hottest libraries in web development today. Offering a powerful, functional approach for dealing with events and with integration points into a growing number of frameworks, libraries, and utilities, the case for learning Rx has never been more appealing. Couple this with the ability to utilize your knowledge across nearly any language, having a solid grasp on reactive programming and what it can offer seems like a no-brainer.


One of the cool features of rxjs is that the core functionality of redux can be minimalised to one line of code with RxJS Observables. so here is an example of such one liner:

```jsx
action$.scan(reducer).subscribe(renderer)  
```
so simplifying the idea, the whole reduction and state management provided to you weighing in to a grand total of around one line of code and best of all there is no magic (assuming you are comfortable with the way streams work).



Let's start with a simple example:
```jsx
import React from 'react';  
import ReactDOM from 'react-dom';  
import { Subject } from 'rxjs/Subject';

// First let's create a subject which is cab be thought of observable an observer
const actionSubject$ = new Subject();

// Initial State
const initState = { name: 'Tal' };

// Plain Redux reducer
const reducer = (state, action) => {  
  switch(action.type) {
    case 'NAME_CHANGED':
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}

// Redux simplification
const store$ = actionSubject$  
    .startWith(initState)
    .scan(reducer);

// Higher order function to send actions to the stream
const actionDispatcher = (func) => (...args) =>  
  action$.next(func(...args));

// Example action function
// changing the name trigge's the subject that emits next valur
const changeName = actionDispatcher((payload) => ({  
  type: 'NAME_CHANGED',
  payload
}));

// React view component 
const App = (props) => {  
  const { name } = props;
  return (
    <div>
      <h1>{ name }</h1>
      <button onClick={() => changeName('David')} >David</button>
      <button onClick={() => changeName('Josh')} >Josh</button>
    </div>
  );
}

// subscribe and render the view
const dom =  document.getElementById('app');  
store$.subscribe((state) =>  {
    ReactDOM.render(<App {...state} />, dom)
});

```


### what is a subject?
An RxJS Subject is a special type of Observable that allows values to be multi casted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
very simple example:

```jsx
// RxJS v6+
import { Subject } from 'rxjs';

const sub = new Subject();

sub.next(1);
sub.subscribe(console.log);
sub.next(2); // OUTPUT => 2
sub.subscribe(console.log);
sub.next(3); // OUTPUT => 3,3 (logged from both subscribers)
```

behavior subject example:

```jsx
const subject = new Rx.BehaviorSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random());
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());

console.log(subject.value)

```

simple async subject example:

```jsx
// RxJS v6+
import { AsyncSubject } from 'rxjs';

const sub = new AsyncSubject();

sub.subscribe(console.log);

sub.next(123); //nothing logged

sub.subscribe(console.log);

sub.next(456); //nothing logged
sub.complete(); //456, 456 logged by both subscribers
```

Here is a very good video for beginners

'https://www.youtube.com/watch?v=PhggNGsSQyg`