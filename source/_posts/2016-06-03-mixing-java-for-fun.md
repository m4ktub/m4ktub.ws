---
title: Mixing Java for Fun
categories: projects
tags:
  - java
  - mixins
  - reusability
s: mixing-java-for-fun
date: 2016-06-03Z
thumbnail: /images/java-duke-quack.png
---

While looking at [Platypus][1], a Java mixins framework, I've felt that is was a 
little too complicated inside and not that extensible from the outside. So, behind
the "how simple can it be done", I've started the [Quacking][2] Java mixins
framework. The idea was to keep it simple and have no external dependencies, that 
is, only use standard Java features. Java does not support mixins so the 
framework is obviously limited to [dynamic proxys][3].

It's a bit of a solution for a problem I don't really have. But it was fun to
explore. So the basic idea was:

  1. We add objects into a mixin object,
  2. Obtain an interface from the mixin,
  3. And invoke a method in the interface.

Invoking a method in the interface will invoke a method in one of the objects.
Those objects only need the method signature to match, that is, they don't really
need to implement any interface at all.

```java
public interface Stringable {
    String toString();
}

Mixin mixin = new Mixin();
mixin.mix("Simple toString() redefinition");
mixin.mix(new Object());

System.out.println(mixin.as(Stringable.class).toString());
```

```text output
Simple toString() redefinition
```

The `toString()` method is actually a method at the `Object` level. Since
`Object` is not an interface an `Stringable` was defined. But actually any
interface would do, since they all inherit `Object`. 

The order in which objects are added to the mixin is important to keep the method
redefinition consistent. The first object added will be searched first, the 
second will be searched if the first did not have a matching method, and so on.
In the previous example this means that no invocation would reach that second 
`Object` instance. 

But we can change the order and only bring an object to the front for a 
particular interface. In the next example, the `indexOf(Object)` is actually
provided by the mixed string. The `Object` level methods are provided by the
actual list, so you can put the mixin in an hash table and it will behave like
if you had put the list directly.

```java
Mixin mixin = new Mixin();
mixin.mix(Arrays.asList(1, 2, 3));
mixin.mix("zyx").preferring(List.class);

List<?> mixedList = mixin.as(List.class);
Object x = mixedList.get(mixedList.indexOf((int) 'x'));
Object y = mixedList.get(mixedList.indexOf((int) 'y'));
Object z = mixedList.get(mixedList.indexOf((int) 'z'));

System.out.println(String.format("%s*x^2 + %s*y + %s", x, y, z));
```
```text output
3*x^2 + 2*y + 1
```

All these samples are academic because, like I said, there was not really a 
problem to solve. Still a more partical application would be, for example, to
mix a behavior to a collection that delays the modification of the collection.
You pass the collection to various methods and, instead of making the collection
unmodifiable, you save the changes until all methods finish.

```java
public class DelayedAdd {

    private Collection<Object> collection;
    private List<Object> adding = new ArrayList<Object>();

    @SuppressWarnings("unchecked")
    public DelayedAdd(Collection<? extends Object> collection) {
        this.collection = (Collection<Object>) collection;
    }

    public boolean add(Object o) {
        adding.add(o);
        return false;
    }

    public boolean addAll(Collection<? extends Object> c) {
        adding.addAll(c);
        return false;
    }

    public void updateCollection() {
        for (Object object : adding) {
            this.collection.add(object);
        }
    }
    
    @Override
    public String toString() {
        return this.collection.toString() + " + " + adding;
    }
    
}

List<Integer> list = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
DelayedAdd delayedModification = new DelayedAdd(list);

Mixin mixin = new Mixin();
mixin.mix(delayedModification);
mixin.mix(list);

@SuppressWarnings("unchecked")
List<Integer> mixedList = mixin.as(List.class);

// theses methods could add anything but the second
// method will see the same elements as the first
addElementsA(mixedList);
addElementsB(mixedList);

System.out.println(list);
System.out.println(mixedList);
delayedModification.updateCollection();
System.out.println(list);
```
```text output
[1, 2, 3]
[1, 2, 3] + [4, 5]
[1, 2, 3, 4, 5]
```

The mixing also supports renaming of methods and currying. This allows us to 
make any method without arguments a `Runnable` and methods with at least 1 
argument `Callable` instances. When currying you cannot supress arguments, just 
add more static arguments. You also need to specify the parameter types 
explicitly. This is to avoid resolving the method by name immediatly (there 
could be several), and to deal better with the possibility of renaming. Still,
it's an improvement to consider. Even so, the next example shows some serious
adaptation of objects to `Runnable`.

```java
ExecutorService pool = Executors.newFixedThreadPool(1);
		
Semaphore s = new Semaphore(1);
Runnable acquire = Mixins.mix(s).rename("run", "acquire").as(Runnable.class);
Runnable release = Mixins.mix(s).rename("run", "release").as(Runnable.class);

Runnable print = Mixins.mix(System.out)
    .rename("run", "println")
    .curry("run", new Class<?>[] { Object.class }, new Object[] { s })
    .as(Runnable.class);

pool.submit(print);
pool.submit(acquire);
pool.submit(print); // protected by semaphore
pool.submit(release);
pool.submit(print);

pool.shutdown();
pool.awaitTermination(1, TimeUnit.MINUTES);
```
```text output (sample)
java.util.concurrent.Semaphore@16360268[Permits = 1]
java.util.concurrent.Semaphore@16360268[Permits = 0]
java.util.concurrent.Semaphore@16360268[Permits = 1]
```

And we haven't actually used any really mixing of behaviors. To do that we can 
implement `Mixer` and have objects that go back to the `Mixin` and call other 
interfaces. It must be all interface-based, off course, but it allows stuff 
like the following.

```java
public interface LockingRunnable {
    void runLocked();
}

public class RunLocked implements Mixer, LockingRunnable {

    private Mixin mixin;

    @Override
    public Object in(Mixin mixin) {
        this.mixin = mixin;
        return this;
    }

    public void runLocked() {
        Lock lock = mixin.as(Lock.class);

        lock.lock();
        try {
            mixin.as(Runnable.class).run();
        } finally {
            lock.unlock();
        }
    }

}

// some runnable
final long start = System.currentTimeMillis();
Runnable runnable = new Runnable() {
    
    @Override
    public void run() {
        System.out.println(String.format("%4d executed in %s", 
            System.currentTimeMillis() - start,
            Thread.currentThread().getName()));
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
};

// mix a runnable, a lock, and behavior that combines the two
Mixin mixin = Mixins.create(runnable, 
    new ReentrantLock(), new RunLocked());

// get explicit interface and create a simple runnable out of it
LockingRunnable lockingRunnable = mixin.as(LockingRunnable.class);
Runnable lockingRunnableRunnable = Mixins.mix(lockingRunnable)
        .rename("run", "runLocked").as(Runnable.class);

ExecutorService pool = Executors.newCachedThreadPool();
pool.submit(lockingRunnableRunnable);
pool.submit(lockingRunnableRunnable);
pool.submit(lockingRunnableRunnable);

pool.shutdown();
pool.awaitTermination(Long.MAX_VALUE, TimeUnit.MILLISECONDS);
```
```text output
  10 executed in pool-2-thread-2
1012 executed in pool-2-thread-1
2012 executed in pool-2-thread-3
```

Well, it's a little toy library. The performance is very poor when compared with
the creation of several anonymous `Runnable` classes, for example. Still, not
having to create those anonymous classes or other adaptor classes just to plug
and play methods is nice and sometimes refreshing. 

[1]: https://github.com/ruifigueira/platypus
[2]: https://github.com/m4ktub/quacking
[3]: http://docs.oracle.com/javase/7/docs/api/java/lang/reflect/Proxy.html