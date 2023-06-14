# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Here's a video explanation:
<https://www.loom.com/share/5bcd3f16879c427ab9ab5c24ab1d0c69?sid=5f32981c-5a5a-4209-95ca-3245535708ee>

And a written one:

I believe I improved the code's readability by incorporating pipe functionality similar to what you see in Elixir. Piping, in my opinion, allows for easier sequential processing and reduces working memory strain when deciphering a function or program.

Each pure function has an early return, changing only specific elements as needed before returning the updated candidate. This enhances readability and simplifies understanding of each step I beleive.

Finally, I moved `pipe` and `createHash` into a utils directory to extract out what seemed to make sense and what might be used elsewhere.
