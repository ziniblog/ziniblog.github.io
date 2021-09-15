---
layout: post
title: "20. Valid Parentheses"
updated: 2021-09-14
tags: [leetcode,seq,string,stack]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대 괄호만으로 이뤄진 s 문자열이, 올바른 괄호로 이뤄져있는지를 검사하는 문제다. 올바른 괄호란, 동일한 모양의 열린괄호 닫힌괄호 한쌍씩을 계속해서 제거해나갈 때, 결국은 빈 문자열이 되는 케이스를 의미한다. `(({})[])` 같은 케이스가 올바른 괄호 케이스이며, `{(})` 와 같은 케이스가 올바르지 못한 케이스이다.

## 반복문으로 열린/닫힌 괄호 쌍을 계속 제거

위에서 언급한 올바른 괄호의 정의를 그대로 적용한 해법이다.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        import re
        
        while 1:
            p = s
            s = re.sub(r'\(\)|\{\}|\[\]', '', s)
            if len(p) == len(s): break
                
        return s == ''
```
{:.python}

while 구문으로 반복하면서, 정규식으로 s 에서 `()`, `{}`, `[]` 문자를 계속 제거해간다. 제거 전인 p 와 제거 후인 s 의 길이가 같다면 더이상 제거할 수 있는 괄호 쌍이 없다는 의미이므로 반복문을 탈출한다. 마지막에는 s 문자열이 비어있는지를 판단하여 리턴한다.

정규식 대신 `s = s.replace('()', '').replace('{}', '').replace('[]', '')` 을 사용해도 된다. 개인적으로 투박하게 느껴졌지만 속도는 정규식보다 월등히 빨랐다.

## Stack 을 사용

s 문자열을 x 로 반복하면서 여는괄호라면 Stack 에 쌓는다. 닫는괄호라면 스택의 제일 마지막 요소를 Pop 하여 동일한 모양의 닫는괄호인지를 판단한다. x 가 닫는괄호인데도 Stack 이 비어있거나, 여는괄호와 닫는괄호의 모양이 일치하지 않으면 올바른 괄호가 아니므로 즉시 False 를 리턴하면 된다. 반복문을 종료했을 때 Stack 이 비어있는지 여부를 판단하여 최종리턴한다.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        d = {')': '(', '}': '{', ']': '['}
        
        for x in s:
            if x in d.keys():
                if stack and stack.pop() == d[x]: pass
                else: return False
            else:
                stack.append(x)
        
        return stack == []
```
{:.python}

Stack 자료형을 나타낼 stack 리스트와 여는괄호와 닫는괄호의 올바른 쌍을 나타낸 d 딕셔너리를 상정했다. s 문자열을 x 로 순회하하면서 앞서 언급한 비교를 수행한다. 순회를 마친 이후에는 stack 이 비어있는지 여부를 최종리턴한다.