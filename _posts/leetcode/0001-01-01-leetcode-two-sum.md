---
layout: post
title: "1. Two Sum"
updated: 2021-09-08
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

숫자들로 이뤄진 nums 배열 안에서, 두 숫자를 골랐을 때 합이 target 이 되는 케이스를 찾아, 그 두 숫자의 인덱스를 리턴하는 문제다.

반드시 합이 target 이 되는 케이스가 존재하며, 이는 유일하다고 한다. 그리고 문제 말미를 보면 O(n^2) 보다 더 효율적인 시간복잡도로 풀어낼 수 있는지를 묻고 있다.

가장 단순하게 생각하면, nums 를 숫자 x 로 순회하고, 다시 다른 숫자들을 y 로 순회하면서 `x+y == target` 인 케이스를 찾아내면 된다. 하지만 이 방법은, nums 를 x 와 y 로 중첩하여 순회하는 이중루프를 구현하게 되는바, 시간복잡도가 O(n^2) 이 된다. 실제로 이 방식으로 풀어낼 수는 있지만, 문제가 의도하는 진정한 풀이는 아닐 것이다.

## 순회 정보를 기억하는 저장소를 사용하여 1 번 순회로 풀기

nums 를 순회하면서 거쳐온 숫자 x 와 그 인덱스 i 를 별도로 마련한 d 딕셔너리에 기억해둔다. 그리고, 계속 순회를 진행하면서 `y = target-x` 를 구해서 y 값이 d 딕셔너리 안에 있는지를 탐색한다.

합이 target 이 되는 케이스는 반드시 존재하므로, 순회 중간에 y 값이 d 안에 있는 케이스가 반드시 나오게 되며, 그 때 결과를 리턴하면 된다. 단 1 번의 순회만으로 결과를 리턴할 수 있으므로 시간복잡도는 O(n) 이 된다.

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d = {}
        
        for i, x in enumerate(nums):
            y = target-x
            
            if y in d:
                return [d[y], i]
            else:
                d[x] = i
```
{:.python}

저장을 위한 d 딕셔너리를 생성했다. 이론적으로 Hash Table 과 같은 딕셔너리 안의 값을 탐색할 땐 시간복잡도는 O(1) 이라 한다.

for 반복문 내부를 보면, y 를 구해서, 그 값이 d 안에 있는지를 살펴본다. 있다면 결과를 리턴하고, 없다면 `{x: i}` 형태로 d 안에 저장해둔다.