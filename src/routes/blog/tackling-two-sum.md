---
title: Solving Two Sum
date: '2025-02-13'
readingTime: 7
theme: algorithms
categories:
  - 'algorithms'
  - 'leetcode'
preview: "Two Sum is one of those classic algorithm problems that appear simple but can teach you a lot about optimising solutions. Here's how I went from a brute force attempt to a highly efficient solution."
---

### Tackling Two Sum

The ["Two Sum" problem](https://leetcode.com/problems/two-sum/description/) on LeetCode is a quintessential entry-level problem that introduces concepts of algorithm design and optimisation. While the task itself is straightforward—find two numbers in an array that add up to a given target—it opens the door to discussions about brute force approaches versus optimised solutions.

Here, I’ll walk you through my journey of solving this problem, from my initial naive attempt to a final, optimised implementation that significantly improved performance.

### Problem Recap

Given an array of integers, `nums`, and an integer, `target`, we need to return the indices of two numbers such that their sum equals `target`. Each input is guaranteed to have exactly one solution, and we can’t use the same element twice.

For example:

```markdown
<!-- Examples -->

Input: nums = [2,7,11,15], target = 9
Output: [0, 1]

Input: nums = [3,2,4], target = 6
Output: [1, 2]

Input: nums = [3,3], target = 6
Output: [0, 1]
```

### Initial Brute Force Approach

When I first approached this problem, my instinct was to use a nested loop to iterate through all pairs of numbers in the array and check if they added up to the target. This approach is simple and works, but it’s <span class="squiggly-red">computationally expensive</span>.

```javascript
var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length; i++) {
		let firstNumber = nums[i];

		for (let k = i + 1; k < nums.length; k++) {
			let secondNumber = nums[k];

			if (firstNumber + secondNumber === target) {
				return [i, k];
			}
		}
	}
};
```

<script>
import Callout from '$lib/components/Callout.svelte'
let analysis = [
    {
        value: 'Time Complexity',
        subvalue: "O(n^2)"
    },
    {
        value: 'Space Complexity',
        subvalue: "O(1)"
    }
]
let sec_analysis = [
    {
        value: 'Time Complexity',
        subvalue: "O(n)"
    },
    {
        value: 'Space Complexity',
        subvalue: "O(n)"
    }
    ]
</script>

<Callout items={analysis} />

While functional, this solution took 157ms and beat only 5% of submissions—not exactly ideal. It’s clear that this approach won’t scale well for larger arrays. This was problem was classed as easy, so the test cases were not too stringent on performance parameters.

### Optimised Approach

To improve, I turned to a more efficient solution using a hash map. The key idea is to store each number’s index as we iterate through the array and check if the second required number to equal the target (i.e., `target - number`) already exists in the map. This eliminates the need for a nested loop, which is a key performance gain.

```javascript
var twoSum = function (nums, target) {
	const valueIndexMap = {};

	for (let i = 0; i < nums.length; i++) {
		let number = nums[i];

		if (Number.isInteger(valueIndexMap[number])) {
			valueIndexMap[`duplicate_${number}`] = i;
		} else {
			valueIndexMap[number] = i;
		}
	}

	for (let i = 0; i < nums.length; i++) {
		let firstNumber = nums[i];
		let secondRequiredNum = target - firstNumber;
		let secondNumberIndex = valueIndexMap[secondRequiredNum];

		if (firstNumber === secondRequiredNum) {
			if (!Number.isInteger(valueIndexMap[`duplicate_${secondRequiredNum}`])) {
				continue;
			}

			return [valueIndexMap[firstNumber], valueIndexMap[`duplicate_${secondRequiredNum}`]];
		}

		if (secondNumberIndex) {
			return [valueIndexMap[firstNumber], secondNumberIndex];
		}
	}
};
```

<Callout items={sec_analysis} />

This solution ran in 1ms and beat 90.25% of submissions—a huge improvement over the brute force attempt.

### Refactoring After Some Research

I was initially pleased with my optimised solution, but I hit a roadblock when the input included duplicate numbers. Consider the following example:

```javascript
Input: (nums = [5, 5]), (target = 10);
Output: [1, 2];
```

My original approach used a hash map to track numbers and their indices, but it failed here because the second occurrence of `5` overwrote the index of the first. This led to incorrect outputs like `[2, null]`. To address this, I added logic to handle duplicates using a `valueIndexMap[‘duplicate_${number}’]` key. While functional, this felt hacky, as it introduced additional logic to track duplicates and a separate branch of code for handling them. Here’s an excerpt of the additional complexity it introduced:

```javascript
// Handling duplicates
if (firstNumber === secondRequiredNum) {
    if (!Number.isInteger(valueIndexMap[`duplicate_${secondRequiredNum}`])) {
        continue;
    }
    return [
        valueIndexMap[firstNumber],
        valueIndexMap[`duplicate_${secondRequiredNum}`]
    ];
}
```

This approach worked, but it was cumbersome to maintain and over-complicated the solution.

#### A Cleaner Solution

While researching, I discovered a simpler and more elegant way to handle duplicates. Instead of creating special keys for duplicates, the solution leverages the `i` value—ensuring that the indices of the two numbers are distinct. Here’s how it works:

```javascript
Input: (nums = [1, 5, 3, 5]), (target = 10);
Output: [1, 3];
```

When iterating through the array, the hash map stores the latest index of each number. By checking that the index of the required number (`valueIndexMap[secondRequiredNum]`) is not the same as the current index (`i`), we ensure the solution is valid without requiring any additional storage for duplicates. Here’s the updated code:

```javascript
function twoSum(nums, target) {
	const valueIndexMap = {};

	for (let i = 0; i < nums.length; i++) {
		let number = nums[i];
		valueIndexMap[number] = i;
	}

	for (let i = 0; i < nums.length; i++) {
		let firstNumber = nums[i];
		let secondRequiredNum = target - firstNumber;

		if (valueIndexMap[secondRequiredNum] && valueIndexMap[secondRequiredNum] !== i) {
			return [i, valueIndexMap[secondRequiredNum]];
		}
	}
}
```

This method eliminates the need for complex duplicate handling and simplifies the logic, making it easier to read and maintain. It’s a great example of how refining a solution can lead to both improved performance and clarity.

### Lessons Learned

- <strong class="yellow">Start Simple, Then Optimise</strong> - My initial brute force solution wasn’t efficient, but it helped me understand the problem. Starting simple often gives you clarity before diving into more complex approaches.
- <strong class="yellow"> Hash Maps Are Powerful</strong> - Using a hash map allowed me to trade a bit of space for a lot of time efficiency. This trade-off is common in algorithm design and is worth considering when performance matters.
- <strong class="yellow">Iterative Improvement</strong> - It’s okay if your first solution isn’t perfect. Algorithm challenges are as much about the process as the result. Refining my approach and seeing measurable improvements was incredibly rewarding.
- <strong class="yellow">Research for Further Optimisation</strong> - Taking time to research after solving a problem can uncover opportunities for further improvement. Instead of rushing to the next question, exploring how others approached the problem or identifying alternative techniques can lead to cleaner, more efficient solutions and deepen your understanding.

### Conclusion

The "Two Sum" problem reinforced the importance of thinking critically about efficiency. While my initial solution worked, iterating on it and comparing it to researched approaches led to a cleaner, more efficient result. It’s a valuable reminder of the power of both experimentation and research in problem-solving.

As I continue with the Neetcode 150 challenge, I’ll aim to apply these lessons to each new problem—starting simple, optimising thoughtfully, and enjoying the process of learning. Stay tuned for more updates as I tackle the next set of challenges!
