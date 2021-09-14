---
layout: post
title: "1. Two Sum"
updated: 2021-09-14
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들로 채워진 nums 배열이 주어질 때, nums 안의 임의의 두 요소 x, y 의 합이 target 이 되는 케이스를 찾아, x 와 y 의 인덱스를 리턴하는 문제다.

문제를 자세히 읽어보면, `x + y == target` 이 되는 케이스는 반드시 유일하게 존재한다고 하며, 시간복잡도가 O(n^2) 보다 작은 해법을 찾아보라 제안하고 있다.

가장 간단하게 생각할 수 있는 방법은 이중루프 구현이다. nums 를 x 로 순회하는 도중에, nums 중 x 가 아닌 수를 다시 y 로 순회하여 `x + y == target` 이 되는 케이스를 찾으면 된다. 하지만 이와 같은 방식은 시간복잡도가 O(n^2) 이다. 문제에서 제안하는 해법이 아니다.

## Hash Table 저장소 사용

Hash Table 과 같은 별도의 저장소를 사용한다. nums 를 x 로 순회하면서, `target - x` 에 해당하는 값을 구한다. 그리고 그 값이 저장소에 없다면 현재의 x 와 그 인덱스 i 를 별도의 저장소에 저장해 둔다.

계속 순회를 하다보면 `target - x` 에 해당하는 값을 언젠가는 저장소에서 찾을 수 있게 된다. 두 요소의 합이 target 이 되는 케이스가 반드시 존재하기 때문에, nums 를 끝까지 순회하기 전에 마주칠 수밖에 없다.

이 점을 이용하면, 단 한번의 루프구성 만으로 해법을 구할 수 있으며, 시간복잡도는 O(n) 이 된다.

```js
var twoSum = function(nums, target) {
    var d = new Map();
    
    for(var [i, x] of nums.entries()) {
        if(d.has(y = target-x)) return [d.get(y), i];
        else d.set(x, i);
    }
};
```
{:.javascript}

d 라는 Map 자료형을 준비하여 저장소로 사용한다. nums 배열을 i 인덱스, x 요소로 순회하는 동안, d 안에 `target - x` 값이 없다면 언젠가는 쓰일지 모르는 현재의 요소 x 와 인덱스 i 를 저장해두고, 있다면 저장된 값을 현재 순회하는 인덱스와 함께 리턴하는 구조다.

이론적으로 Hash Table 에 대한 접근은 시간복잡도가 O(1) 이다. 따라서 전체적인 시간복잡도는 O(n) 이 된다.