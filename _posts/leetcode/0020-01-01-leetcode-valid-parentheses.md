---
layout: post
title: "20. Valid Parentheses"
updated: 2021-09-14
tags: [leetcode,seq]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대 괄호만으로 이뤄진 s 문자열이, 올바른 괄호로 이뤄져있는지를 검사하는 문제다. 올바른 괄호란, 동일한 모양의 열린괄호 닫힌괄호 한쌍씩을 계속해서 제거해나갈 때, 결국은 빈 문자열이 되는 케이스를 의미한다. `(({})[])` 같은 케이스가 올바른 괄호 케이스이며, `{(})` 와 같은 케이스가 올바르지 못한 케이스이다.

## 반복문으로 열린/닫힌 괄호 쌍을 계속 제거

위에서 언급한 올바른 괄호의 정의를 그대로 적용한 해법이다.

```js
var isValid = function(s) {
    while(s) {
        var p = s;
        s = s.replace(/\(\)|\{\}|\[\]/g, '');
        if(s.length == p.length) break;
    }
    
    return s === '';
};
```
{:.javascript}

s 문자열을 while 구문으로 반복하면서, 정규식으로 `()`, `{}`, `[]` 문자를 계속 제거해간다. 제거 전인 p 와 제거 후인 s 의 길이가 같다면 더이상 제거할 수 있는 괄호 쌍이 없다는 의미이므로 반복문을 탈출한다.

마지막에는 s 문자열이 비어있는지를 판단하여 리턴한다.

## Stack 을 사용

s 문자열을 x 로 반복하면서 여는괄호라면 Stack 에 쌓는다. 닫는괄호라면 스택의 제일 마지막 요소를 Pop 하여 동일한 모양의 닫는괄호인지를 판단한다. 여는괄호와 닫는괄호의 모양이 일치하지 않으면 올바른 괄호가 아니므로 즉시 false 를 리턴하면 된다. 반복문을 종료했을 때 Stack 이 비어있는지 여부를 판단하여 최종리턴한다.

```js
var isValid = function(s) {
    var stack = [];
    var d = {')': '(', '}': '{', ']': '['};
    
    for(var x of s) {
        if(x in d) {
            if (!(stack.pop() === d[x])) return false;
        } else {
            stack.push(x);
        }
    }
    
    return stack.length === 0;
};
```
{:.javascript}

Stack 자료형을 나타낼 stack 배열과 여는괄호와 닫는괄호의 올바른 쌍을 나타낸 d 객체를 상정했다. for 반복문으로 s 문자열을 x 로 순회하는데, 만일 x 가 닫는괄호라면, stack 의 제일 마지막 요소를 pop 하여, 동일한 모양의 여는괄호인지를 판단한다. 아니라면 올바른 괄호가 될 수 없으므로 즉시 false 를 리턴한다. x 가 닫는괄호가 아니라면 stack 에 계속 쌓아간다.

for 반복문 순회를 마친 이후에는 stack 이 비어있는지 여부를 최종리턴한다.
