---
layout: post
title: "70. Climbing Stairs"
updated: 2021-09-11
tags: [leetcode,design]
---

## 문제

[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/)

계단을 1 계단씩 또는 2 계단씩 오를 수 있다고 할 때, n 개의 계단을 오를 수 있는 가짓수를 구하는 문제다.

계단이 1 개라면, 계단을 오르는 방법은 1 개다. 계단을 1 계단 오르는 방법밖에 없기 때문이다. (즉 `f(1) = 1`) 계단이 2 개라면, 1 계단 + 1 계단 오르는 방법과, 2 계단을 한번에 오르는 2 가지 방법이 있다. (즉 `f(2) = 2`)

n 계단이라면 어떨까? 결론부터 말하자면 `f(n) = f(n-2) + f(n-1)` 이다. n-2 계단을 오르는 여러 방법에 마지막으로 2 계단을 오르는 방법이 있고, n-1 계단을 오르는 여러 방법에 마지막으로 1 계단을 오르는 방법이 있기 때문이다.

이렇게 다이나믹 프로그래밍으로 풀어낼 수 있다. (그리고 어딘가 [피보나치 수열](https://namu.wiki/w/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98%20%EC%88%98%EC%97%B4)을 닮았다는 것도 알 수 있다.)

초기값과 일반항으로 나타내면 아래와 같다.

```plaintext
f(1), f(2) = 1, 2
f(n) = f(n-2) + f(n-1)
```
{:.pseudo}

## Bottom-Up 다이나믹 프로그래밍으로 풀기

위 의사코드에 있는 초기값, 일반항 공식을 그대로 옮기면 된다.

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        f = {}
        
        f[1] = 1
        f[2] = 2
        
        for i in range(3, n+1):
            f[i] = f[i-2] + f[i-1]
            
        return f[n]
```
{:.python}

n 계단을 오르는 가짓수를 f 딕셔너리 나타내고 있다. 초기값 대입 뒤, for 반복문으로 일반항을 구해간다. 아래서부터 위로 구해내가는 Bottom-Up 방식의 다이나믹 프로그래밍이다.

## 메모이제이션 활용한 재귀호출로 풀기

초기값과 일반항이 있는 다이나믹 프로그래밍은 재귀호출로도 구할 수 있다. n 계단 오르는 가짓수 구하기도 아래와 같이 재귀함수로 구현할 수 있다.

```python
def f(n):
    if n < 2: return n
    
    return f(n-2) + f(n-1)
```
{:.python}

하지만 n 이 늘어날수록 함수호출도 지나치게 늘어난다. 예를들어 f(20) 을 구한다고 한다면, f(18) 과 f(19) 를 알아야 한다. f(18) 을 구했다면, 이젠 f(19) 를 구해야하는데, f(19) 를 구할 땐 또 f(18) 을 알아야한다.

즉 한번했던 계산을 또 해야하기 때문에 함수호출도 늘어나고 비효율적인 것이다. 참고로 이와 비슷한 구조인 피보나치 수열의 시간복잡도는 O(2^n) 으로 알려져있다. n 이 늘어날수록 복잡도도 기하급수적으로 늘어난다.

따라서 첫 계산에만 재귀호출을 하여 그 값을 저장해놓고, 다시 계산해야할 때는 저장된 값을 사용하는 메모이제이션을 접목한 재귀호출로 풀었다.

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        def memoize(f):
            cache = {}
            
            def wrapper(n):
                if n not in cache: cache[n] = f(n)
                return cache[n]
            
            return wrapper
        
        @memoize
        def f(n):
            if n < 3: return n
            
            return f(n-2) + f(n-1)
        
        return f(n)
```
{:.python}

Python 의 데코레이션 문법을 사용했다. memoize 함수가 f 함수를 감싸서, 기본적으로 cache 안에 저장된 f(n) 의 결과값을 사용하고, 저장되어있지 않을 때만 재귀호출하는 구조다.

Python 은 functools 모듈에 메모이제이션을 위한 lru_cache 함수를 제공한다. `from functools import lru_cache` 구문으로 함수를 사용할 준비를 하고, `@memomize` 대신 `@lru_cache` 라고만 하면 된다.