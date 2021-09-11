---
layout: post
title: "53. Maximum Subarray"
updated: 2021-09-11
tags: [leetcode,design]
---

## 문제

[https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)

숫자들로 채워진 nums 리스트 안에서, 연속된 숫자들 합계의 최대치 (최대부분합) 를 구하는 문제다. 문제에서는 시간복잡도 O(n) 으로 풀거나, 분할정복으로 풀어보라 하고있다.

가장 단순하게 생각하면 이중루프를 구현하면 된다. nums 를 x 로 순회하면서, x 이후의 숫자들을 y 로 다시 순회, 부분합의 모든 케이스를 구한 뒤 가장 큰 값을 골라내면 된다. 하지만 이중루프로 인해 시간복잡도는 O(n^2) 이 된다. 다른 알고리즘을 생각해야 한다.

## 다이나믹 프로그래밍으로 풀기

고등학교 수학 때 배웠던 점화식으로 생각해볼 수 있다. a 리스트를 상정하는데, `a[i]` 값은 nums 리스트의 i 인덱스까지의 최대부분합을 값으로 가진다고 한다. 이때, a 의 초기값과 일반항은 아래와 같이 나타낼 수 있다.

```plaintext
a[0] = nums[0]
a[i] = max(a[i-1]+nums[i], nums[i])
```
{:.pseudo}

위 점화식에서 `a[i]` 부분만 이해할 수 있다면 쉽다. i 인덱스 까지의 최대부분합이 `a[i]` 이므로, 전체 nums 의 최대부분합은 `max(a)` 로 구할 수 있다.

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        a = [0]*len(nums)
        
        for i in range(len(nums)):
            a[i] = max(a[i-1]+nums[i], nums[i]) if i else nums[i]
            
        return max(a)
```
{:.python}

## 분할정복으로 풀기

분할정복은 리스트를 둘로 계속 쪼갠 뒤, 조립하는 방법이다. 조립과정 구현이 어려운데 차근차근 이해해보자. 

두 개의 리스트 L, R 을 조립해보자. 조립된 리스트를 L+R 이라 했을 때, L+R 의 최대부분합은 `max(L 의 최대부분합, R 의 최대부분합, L 과 R 을 이어붙인 부분의 최대부분합)` 이 된다. L 의 최대부분합을 lm, R 의 최대부분합을 rm 이라 하자. 이해가 어려운 부분은 "L 과 R 을 이어붙인 부분의 최대부분합" 인데 아래와 같이 이해하자.

```plaintext
L = [l1, l2, ... , ln]
R = [r1, r2, ... , rn]

L+R = [l1, l2, ..., ln, r1, r2, ... , rn]
                     |   |
                     |   |
             lr <----+   +----> rl
            /                     \
           /                       \
L 의 가장 오른쪽 요소가             R 의 가장 왼쪽 요소가
포함된 상태에서의 최대부분합         포함된 상태에서의 최대부분합

==> L 과 R 을 이어붙인 부분의 최대부분합 == lr + rl

==> L+R 의 최대부분합 == max(lm, rm, lr+rl)
```
{:.pseudo}

결국 L+R 의 최대부분합을 구하려면 lr 과 rl 도 미리 알고 있어야 한다. 이 값들도 이전 조립과정에서 계산되어 넘어온 값이고, L+R 리스트의 경우도 계산해서 다음 조립과정에 넘겨야한다. 즉 L+R 의 가장 오른쪽 요소가 포함된 상태의 최대부분합과, 가장 왼쪽 요소가 포함된 상태의 최대부분합을 계산해야 한다. 아래와 같이 이해하자.

```plaintext
                   L 의 가장 왼쪽 요소가 
                /  포함된 상태에서의 최대부분합    
       +----> ll  
       |            
       |
L+R = [l1, l2, ... , ln, r1, r2, ... , rn]
       |              |  |    
       |              |  |
       +----- lt -----+  +----> rl
             /
     L 의 전체 요소합

==> L+R 의 가장 왼쪽 요소가 포함된 상태에서의 최대부분합 == max(ll, lt+rl)


          R 의 가장 왼쪽 요소가 
     포함된 상태에서의 최대부분합  \ 
                                rr <----+
                                        |
                                        |
L+R = [l1, l2, ... , ln, r1, r2, ... , rn]
                      |  |              |
                      |  |              |
              lr <----+  +----- rt -----+
                                  \
                                   R 의 전체 요소합

==> L+R 의 가장 오른쪽 요소가 포함된 상태에서의 최대부분합 == max(lr+rt, rr)
```
{:.pseudo}

이젠 이들 계산에서는 lt, rt 가 사용된다. L+R 의 전체 요소합은 단순히 `lt+rt` 로 계산할 수 있다.

이 로직을 반영한 전체 코드는 아래와 같다.

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def dac(A):
            if len(A) == 1: return A[0], A[0], A[0], A[0]
            
            ll, lm, lr, lt = dac(A[:len(A)//2])
            rl, rm, rr, rt = dac(A[len(A)//2:])
            
            return max(ll, lt+rl), max(lm, rm, lr+rl), max(lr+rt, rr), lt+rt
        
        return dac(nums)[1]
```
{:.python}

A 리스트를 받아서, 이를 좌/우로 쪼갠 리스트를 재귀호출, 그 결과를 위에서 언급한 변수들로 받고, 다시 조립하여 리턴한다. 재귀호출을 마치면 최종적으로는 최대부분합에 해당한는 부분을 리턴한다.