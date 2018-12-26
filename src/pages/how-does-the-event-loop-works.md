---
title: Tasks, microtasks and queues
date: '2018-12-26'
spoiler: We talk about queues, tasks & micro tasks
---

The workings of the JavaScript dispatch queue are more subtle and interesting than you might think. Far from just being a queue of events, there are tasks and then there are sub-tasks.

Lets look on this Javascript code

### Tasks and Microtasks
Our earlier description of the event or dispatch queue is slightly over-simplified. Now that we have explored many of the possible ways of working with the queue it is time to find out some finer points of how it works.

It is clear that each thread of execution gets its own queue. All of the windows from a single origin share the same queue, and this is used by the postMessage method to allow them to communicate.

Tasks are originally the only thing placed in the event queue, but modern JavaScript and browsers also now support microtasks.

The event loop takes tasks one at a time and allows the task to run to completion before the next task is serviced. Tasks can also be preferentially dequeued according to their source. This allows the system to prioritize some tasks.

A subtle, but sometimes important point is that the browser may render updates to the page between servicing tasks. This is important because if your code makes changes to the page you will generally only see these changes if you allow the UI thread to service the queue and there has to be a task waiting for it to perform the update.

Microtasks were introduced partly as a lightweight version of the task, but more to introduce a new class of task that was guaranteed to be executed before the next task starts i.e. as soon as possible

### Tasks and Microtasks

Consider following code:

```jsx
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

In what order should the logs appear?

The correct answer: script start, script end, promise1, promise2, setTimeout, but it's really depends on the type of browser you're using.

Microsoft Edge, Firefox 40, iOS Safari and desktop Safari 8.0.8 log setTimeout before promise1 and promise2 - although it appears to be a race condition. This is really weird, as Firefox 39 and Safari 8.0.7 get it consistently right.

To be continued ....