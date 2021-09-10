---
layout: post
title: "20. Valid Parentheses"
updated: 2021-09-10
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대괄호로만 이뤄진 문자열이 주어졌을 때, 열린괄호와 닫힌괄호가 올바르게 구성되어있는지를 묻는 문제다.

올바른 구성이 되려면, 동일한 모양의 열린괄호와 닫힌괄호가 한 쌍으로 붙어있어야 하며, 이런 동일한 모양의 괄호 한 쌍씩을 계속해서 제거할 수 있어야 한다. 마지막에는 모든 괄호들이 제거되고 아무런 괄호도 남아있지 않게 된다.

## 반복문으로 더이상 불가능할 때까지 괄호를 계속 제거

위에서 언급한 올바른 구성이 되기 위한 방법을 반복문으로 계속 적용해나가는 방식이다. 주어진 문자열 s 가 최종적으로 빈 문자열이 되면 올바른 괄호 구성이 된다.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        while 1:
            p = s
            s = s.replace('()', '').replace('{}', '').replace('[]', '')
            if len(s) == len(p): break
        
        return s == ''
```
{:.python}

while 반복문으로 replace 함수를 사용, 동일한 모양의 열린괄호와 닫힌괄호 한 쌍을 계속 제거한다. 제거하기 전 문자열 p 와 제거 후 문자열 s 의 길이가 같다면 더 이상 제거가 불가능하다는 의미이므로 반복문을 탈출한다. 마지막에는 s 가 빈문자열인지 최종리턴한다.

replace 함수 대신 정규식을 사용해도 된다. re 모듈을 import 하고, replace 함수가 사용된 부분을 `s = re.sub(r'\(\)|\{\}|\[\]|', '', s)` 로 바꾸면 된다. 다만 실행속도는 replace 함수보다 느리다.

## Stack 을 사용하여 괄호 제거

문자열 s 를 한글자씩 x 로 순회하면서, 따로 마련한 stack 에 채운다. 만일 stack 의 제일 마지막 요소와 순회하는 글자 x 가 동일한 모양의 열린괄호와 닫힌괄호라면, statck 에서 제거한다. 순회를 마쳤을 때 statck 이 비어있어야 올바른 구성이 된다.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        d = {')': '(', '}': '{', ']': '['}
        
        for x in s:
            if x in d.keys():
                if not(stack and stack.pop() == d[x]): return False
            else:
                stack.append(x)
        
        return stack == []
```
{:.python}

Stack 으로 사용할 stack 리스트와, 올바른 괄호 짝인지 확인하기 위해 `{닫는괄호: 여는괄호}` 형태로 d 딕셔너리를 준비하였다.

문자열 s 를 x 로 순회하면서, x 가 d 의 키라면 (즉 닫힌괄호라면) stack 의 제일 마지막 요소를 가져와서 올바른 짝인지를 확인한다. 아니라면 올바른 괄호 짝이 아니므로 (즉 `(]` 와 같은 형태이므로) 더 이상 순회를 할 필요없이 즉시 False 를 리턴한다. 올바른 짝에 대한 처리는 별도로 할 필요가 없다. 비교를 위해 이미 stack 의 제일 마지막 요소를 pop 했기 때문이다.

x 가 d 의 키가 아니라면 (즉 열린괄호라면) 단순히 stack 에 추가를 하면 된다.

반복을 종료한 뒤에는 stack 이 비어있는지 여부를 최종리턴 한다.