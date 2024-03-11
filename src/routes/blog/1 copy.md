---
slug: gcd-euclid-and-efficient-algorithms
date: '2024-03-04'
title: "GCD, Euclid and Efficient Algorithms"
template: "post"
draft: false
preview: "This is a continuation of the my series on algorithms — see previous post to catch up where we looked at scrambled eggs and algorithm basics. This is a short introduction to algorithms, why they are…"
category: [Algorithms,Coding,Web Development,Programming,Computing Science]
tags: [Algorithms,Coding,Web Development,Programming,Computing Science]
---

### GCD, Euclid and Efficient Algorithms

This is a continuation of the my series on algorithms — see [previous post to catch up](https://medium.com/@timrooke1991/mmmm-algorithms-c3580097680a) where we looked at scrambled eggs and algorithm basics. This is a short introduction to algorithms, why they are useful and how we can analyse them. To reiterate the disclaimer, I have no computer science background or any education in Maths or Science beyond school, so this will very much be the ramblings of a complete beginner.

As a Web Developer, I always thought of algorithms as largely theoretical and abstract. While at a basic level I do use and write algorithms in my day job, but _proper_  algorithms that churn through millions of web pages and petabytes of data are not my game. They’re for the scientists and engineers. Therefore, given that I was only using very basic, simplistic algorithms learning and understanding them is probably a waste of time, right? Wrong! Algorithms — even at a simplistic level — can be valuable to a development in any discipline. The thought-process behind designing an algorithm is a methodology that can benefit the engineer crawling a billion web pages or indeed a web developer simply iterating over an array to extract a particular value.

In this post, we will look at a couple of very common, simple coding problems and how the solutions can vary greatly in performance depending on how the solutions are designed.

### Greatest Common Divisor

For simplicity, we’ll focus on one particular problem in this post. Let’s look at the Greatest Common Divisor problem, and try and design a simple algorithm to solve this.

The Greatest Common Divisor is a common mathematical conundrum. What we want to do is pass our algorithm two integers and then have our algorithm return the largest integer that divides both inputs. For example, if we pass our algorithm `10` and `30`, we want our algorithm to return `10` (as this is the biggest number that goes into both of our inputs). Does this sound familiar? You might remember this from primary school maths — it’s almost certain that you did this. Well guess what, now it’s back to haunt you!

Now that you’ve had an intro let’s look at another example. What’s the greatest common divisor of `24` and `32`? Can you figure it out…? It’s `8`! Simple enough. Why do we need an algorithm for this? Well, do you know the greatest common divisor for `1245308024` and `118210400`…? No? Okay, me either, so we may need a computer to help us out here.

Right, let’s look at crafting an algorithm then! As mentioned, both the inputs and output will only be integers, so not floats or decimals. Also, all inputs will be positive — no negativity here, thank you very much!

```python
def gcd_algorithm(a, b):
    # set gcd as 1 - as 1 goes into everything!
    gcd = 1

    # min(a, b) + 1 has to be used because the upper bound of range is not inclusive!
    for i in range(2, min(a, b) + 1):
        if a % i  == 0 and b % i == 0:
            gcd = i

    return gcd
```

Okay, so we’ve got a working algorithm. This is pretty straight forward. We’ve got a variable, `gcd`, which stores our greatest common divisor. `gcd` starts off as `1`. Then, we use a for loop to iterate over the numbers `2` to the minimum of `a` and `b` (the greatest common divisor has to be smaller than both the inputs). We annoyingly have to use `min(a, b) + 1` in python because the upper bound of range is not inclusive. For every iteration, we check if `i` goes into **_both_** `a` and `b`. If it is, we update `gcd` with `i`. The loop runs until we get to the minimum of `a` and `b`. The algorithm return the `gcd` value. Simple.

Let’s look at that with real numbers, rather than abstract letters. We have two inputs: `5` and `15`. `gcd` is initially set to `1`. Standard! We then loop from `2` to `5`. `5` because it is the smaller of our two inputs. Therefore, `i` is equal to `2` on the first iteration, then it’s equal to `3`, and then `4` and lastly `5`. For each iteration, we check if `i` goes into **_both_** `5` and `15`. If it is, we update the value to `gcd`. As result, `gcd` gets updated to `3` — as `3` goes into both `5` and `15`. And on the final iteration gcd is updated to `5` — as `5` goes into both `5` and `15`. The algorithm returns `5` as its output.

Simple enough. This does the job in most cases. However, there are some inefficiencies with our algorithm. Our first example using `3` and `5` was pretty simple. Small fry for this algorithm.

Let’s step it up a bit and see the performance of our algorithm with some bigger integers. Let’s try with 600 and 1280.

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-0.png)

<figcaption>The output for 600 and 1280 from our algorithm</figcaption></figure>

This is the console output. In the algorithm, I’ve put some useful measures that will help us evaluate the efficiency of our algorithm. `Loops executed` should be self-explanatory — the number of iterations our algorithm does before returning the greatest common divisor. And `Elapsed Time` — the time the function to run in seconds. And lastly, and most importantly, the `output`, the greatest common divisor. We seen in this example using `600` and `1280`: the greatest common divisor is `60`, the algorithm runs `599` loops and the time taken to execute is `0.0002` seconds. So far, so good.

Let’s push the algorithm a little further using inputs of `28851538` and `1183019`.

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-1.png)

<figcaption>The output for 28851538 and 1183019 from our algorithm</figcaption></figure>

We have the same information as before: output, number of loops and elapsed time. We see the number of loops is `1183018`, which is simply the minimum input minus one. In the last example, our number of loops was 599 because our minimum input was 600. This tells us something about our input. The bigger our minimum input, the less inefficient our algorithm will be because it will have to go through more loop iterations. This a major scaling issue for our algorithm. We see this displayed in the elapsed, which now stands at `0.25` seconds. This may seem small, but that’s pretty long in computing. If you consider this algorithm might be part of an entire web application that is executing a whole bunch of commands, fetching data and running tasks — to spend `0.25` seconds **_just_** on this one bit of analysis is really inefficient.

Let me hammer the point home now — let’s use some even larger inputs, `253102380` and `3402918274`.

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-2.png)

<figcaption>The output for 288515380 and 3402918274 from our algorithm</figcaption></figure>

Two much bigger numbers, which are really stretching our algorithm’s capabilities. As expected, the bigger integers decrease performance drastically. Now, elapsed time is nearly 55 seconds! This is far too long. The other interesting point about this particular example is that the greatest common divisor of these two huge inputs is only 2! Despite this, our algorithm still runs through 253,102,379 iterations —that’s right, over a quarter of a billion loop iterations!

One of the real inefficiencies of our algorithm was incrementing our loop by one each time. A lot of these loop iterations are pointless. For example, if you were calculating the greatest common division of two simple numbers like `40` and `200`. You probably wouldn’t start at `1` and work up. You’re looking for the **_greatest_** common divisor, so it makes sense to start at `40` and work down. More often than not, this will be less work. In this particularly case, starting at `40` makes perfect sense as `40` goes into both `40` and `200`, so you get your greatest common divisor in your first attempt.

Checking through every number seems very inefficient if only there was a more efficient way! _Hmmm…_

### Euclidean algorithm

The Euclidean algorithm was devised by ancient Greek mathematician Euclid around 300 B.C. The Euclidean algorithm is an extremely efficient method of calculating the greatest common divisor of two number — even two enormous numbers!

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-3.jpeg)

</figure>

The proposition for Euclid’s algorithm comes from a basic observation of what greatest common divisor have in common. The Euclidean Algorithm works on the premise that if a number divides by both `a` and `b`, then that same number must divide their sum. And therefore, by extension, this number must also divide their difference. Let’s look at an example.

```
def gcd_euclid(a, b):
    
    while b:
        # helper variable to remember the original value of b
        store_b = b
        b = a % b
        a = store_b
      
    return a 
```

This is an iterative example of Euclid’s algorithm — most implementations will probably use recursion, but that’s the subject of another blog post. An iterative solution just means that we’re using a loop. In our example here, if `b` is _truthy_ (i.e. not zero), we enter a while loop until `b = 0`. In this loop, we create a variable to remember the value of `b`, we set `b` to the remainder of `a % b` and set `a` to the value of `b` at the beginning of the iteration. We continue this process until `b` is `0`, which means we’ve found a value that divides with a remainder of `0`.

Let’s look at this with some numbers. If our input are `18` and `24`, `b` is assigned `24` and `a` is assigned `18`. Since `b` is `24` and not `0`, we enter the while loop. Our helper variable, `b_store`, is assigned the value of `b`, `24`. `b` is set to `18 % 24`, which is `6`. Lastly, `a` is set to the original value of `b` at the beginning of the loop iteration, which in this case is `24`. Now (after the first loop iteration), our values for `a` and `b` are: `24` and `6` respectively. We run through the loop again — `store_b` becomes `6`, `b` becomes `0` (since 6 goes into 24 four times) and `a` is set to `6`. Since `b` now is _falsy_ as it is equal to `0` — we exit the while loop and our algorithm returns `6` — the value of `a` — as our greatest common divisor. Clever, right!

Let’s have a look at how this performs.

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-4.png)

</figure>

Here, we’re plotting the two algorithms against one another for the same set of inputs, `100` and `100,000`. The elapsed times of both are trivial, though Euclid is faster. The point worth noting is the number of loops executed. Our Naive Algorithm starts from 1 and works all the way up a 100. Therefore, executing 99 loops. However, the Euclid algorithm only executes 2 loops. It starts from 100 — and therefore after only a couple of steps know that 100 will be the greatest common divisor, so iterating any further would not be beneficial.

Next, let’s try it on some numbers. Let’s use `288515380` and `3402918274` again. This took nearly `55` seconds with when we ran it against our Naive Algorithm.

<figure>

![](/media/gcd-euclid-and-efficient-algorithms-5.png)

</figure>

The results are in! Our Naive Algorithm performs woefully as expected — this time producing an elapsed time of `68.5` seconds! Too slow for any application. And as discussed before, iterates through a mammoth `288515379` loops. On the other hand, our Euclidean Algorithm performs much better. Despite these two huge indices, our Euclidean Algorithm returns the correct output of `2` in only `23` loop iterations and in a fraction of a second, `0.000035` seconds to be precise! Pretty cool, huh?!

### Conclusion

In this post, we have built up our knowledge of algorithms by looking at a real-life algorithm, Euclid’s algorithm, and contrasting its efficiency with a naive and far less efficient algorithm, which solves the same problem. This example shows that even performing relatively simple computation tasks such as finding the greatest common divisor of two inputs via inefficient methods can push your slick, new, fancy Macbook over the edge and beyond its capabilities. And with the introduction of Euclid’s algorithm, it has emphasised the vast benefits and time-savings between a naive solution and a more sophisticated solution to a problem. In the real world, the Euclidean algorithm is relied on extensively for solving computational tasks in a very efficient manner — it can be used for reducing large fractions to their simplest measure and is a key component in the RSA encryption method. I have included some additional resources below (that are beginner friendly) on Euclid’s algorithm for those that are interested.

Thanks for reading. This is the second post in a series on algorithms designed for newcomers — of which I am one — that aims to lift the lid (just a little!) on algorithms, what they are and how they work. You can read the [first post here.](https://medium.com/@timrooke1991/mmmm-algorithms-c3580097680a)

Get in touch on [Twitter](http://twitter.com/timrooke1991) or in the comments if you have any thoughts!
