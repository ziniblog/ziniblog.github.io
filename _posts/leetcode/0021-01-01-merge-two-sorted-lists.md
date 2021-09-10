---
layout: post
title: "21. Merge Two Sorted Lists"
updated: 2021-09-10
tags: [leetcode,graph]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

오름차순으로 정렬되어 있는 두개의 연결리스트가 주어졌을 때, 오름차순 정렬된 상태로 하나의 연결리스트로 만드는 문제다.

새로운 연결리스트를 생성한 뒤, 두개의 연결리스트의 값을 비교해가면서 연결리스트를 만들어가는 방법을 떠올릴 수 있으나, 연결리스트의 노드들은 독립적으로 존재하고, 이 노드들을 참조로 연결하고 있을뿐이므로, 연결 순서를 조정하는 것만으로 문제를 해결할 수 있다. 실제로 이 문제의 베스트 답안들은 이렇게 해결하고 있다.

문제의 예시 케이스라면, 아래와 같이 연결하면 된다. (오름차순만 보장된다면 다르게 연결할 수도 있다.)

```plaintext
l1 ---> Node      +--> Node      +--> Node
        + val=1   |    + val=2   |    + val=4
        + next ---+    + next ---+    + next ---> None



l2 ---> Node      +--> Node      +--> Node
        + val=1   |    + val=3   |    + val=4
        + next ---+    + next ---+    + next ---> None
        
                    ||
                    ||  
                   \  /
                    \/ 
                    
l1 ---> Node      +--> Node           Node
        + val=1   |    + val=2        + val=4
        + next    |    + next         + next ---> None
          |       |      |                ^
          |       |      |                |
          v       |      v                +-----+
l2 ---> Node      |    Node      +--> Node      |
        + val=1   |    + val=3   |    + val=4   |
        + next ---+    + next ---+    + next ---+
```
{:pseudo}

## 반복문으로 연결 재조정

l1 과 l2 가 모두 None 이 아니라면, 값을 비교하면서 연결을 조정하다가, 한쪽이 None 에 다다르면, 다른 남은쪽을 모두 붙이면 된다.

```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        merged = n = ListNode()
        
        while l1 and l2:
            if l1.val < l2.val:
                n.next, l1 = l1, l1.next
            else:
                n.next, l2 = l2, l2.next
            n = n.next
            
        n.next = l1 or l2
        
        return merged.next
```
{:.python}

결과를 리턴하기 위한 더미 노드 merged 를 생성하고, l1 과 l2 가 모두 None 이 아닐동안은 while 반복으로 l1.val, l2.val 값을 비교, 현재의 노드 n 을 어느 노드와 연결할지 결정하면서 진행한다.

while 반복이 끝나면, l1, l2 둘 중의 하나는 None 에 다다랐다는 의미이므로, `l1 or l2` 구문으로 None 이 아닌 다른쪽을 현재노드 n 의 다음에 통째로 붙인다.

위에서는 if 문으로, `l1.val < l2.val` 일때 l1 을, 아닐때 l2 를 연결하지만, 값에 따라 l1, l2 를 스왑해서 l1 으로만 연결하는 풀이도 인기가 있었다.

## 재귀호출로 연결 재조정

위와 같은 연결순서 재조정을 재귀호출로 해결할 수도 있다. 반복문보다 어려울 수 있지만, 찬찬히 코드를 따라가면 다들 충분히 이해할 수 있는 코드다.

```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        if l1 and l2:
            if l1.val < l2.val:
                l1.next = self.mergeTwoLists(l1.next, l2)
                return l1
            else:
                l2.next = self.mergeTwoLists(l1, l2.next)
                return l2
        else:
            return l1 or l2