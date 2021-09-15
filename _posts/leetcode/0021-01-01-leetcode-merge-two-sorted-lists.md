---
layout: post
title: "21. Merge Two Sorted Lists"
updated: 2021-09-15
tags: [leetcode,graph,linked_list,recursion]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

오름차순으로 정렬되어 있는 두개의 연결리스트 l1, l2 를, 하나의 오름차순 연결리스트로 만들어 리턴하는 문제다.

연결리스트는 각각의 값을 지닌 노드들이 독립되어 있고, 각 노드를 참조로 연결한 자료구조다. 새로운 연결리스트를 만드는 해법도 가능하겠지만, 노드 자체가 독립되어있기에 연결 순서를 재조정하는 식으로도 해결할 수 있다. 예를들어 아래와 같이 만들면 된다. (문제에서 요구하고 있는 오름차순만 보장된다면 다른 방식의 연결도 물론 가능하다.)

```plaintext
l1 ------> NODE        +-----> NODE        +-----> NODE
           + val = 1   |       + val = 2   |       + val = 4
		   + next -----+       + next -----+       + next ------> None
		   
		   
		   
		   
l2 ------> NODE        +-----> NODE        +-----> NODE
           + val = 1   |       + val = 3   |       + val = 4
		   + next -----+       + next -----+       + next ------> None

		            	      ||
							 _||_
						 	 \  /
						  	  \/

l3 ------> NODE           +--> NODE                NODE
           + val = 1      |    + val = 2           + val = 4
		   + next --+     |    + next --+          + next ------> None
		            |     |             |            ^
		   +--------+     |    +--------+            |
		   |              |    |                     +----------+
		   v              |    v                                |
           NODE           |    NODE        +-----> NODE         |
           + val = 1      |    + val = 3   |       + val = 4    |
		   + next --------+    + next -----+       + next ------+
```
{:.pseudo}

## Iterative 방식

연결 순서 재조정은 크게 두 부분으로 나뉜다. l1 과 l2 가 모두 살아있는 경우와, 한 쪽이 끝에 다다라서 다른 한 쪽만 살아있는 경우다.

모두 살아있다면 l1, l2 값을 비교하여, 보다 작은 쪽 노드를 현재의 노드 n 의 다음노드로 연결해주면 되고, n 과 연결당한 l1 또는 l2 는 전진한다.

한 쪽만 살아있다면 굳이 연결 순서 재조정이 필요없다. 살아 남아있는 쪽 연결리스트를 그냥 현재의 노드 n 의 다음노드에 붙여주면 된다.

```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:

        a = n = ListNode()
        
        while l1 and l2:
            if l1.val < l2.val: n.next, l1 = l1, l1.next
            else: n.next, l2 = l2, l2.next
            n = n.next
            
        n.next = l1 or l2
        
        return a.next
```
{:.python}

더미노드 a 를 생성하고, n 이 이를 참조하도록 하였다. 따라서 최종리턴은 더미노드를 제외한 `a.next` 가 된다. 반복문 코드 작성의 편의성 때문인데, 더미노드가 왜 필요한지는 위 코드를 더미노드 없는 형태로 바꿔보려하면 자연스레 알 수 있다.

while 반복문은 l1 과 l2 가 모두 살아있는 노드일 경우의 코드이며, `n.next = l1 or l2` 구문은 살아있는 어느 한 쪽을 n 의 다음노드로 그냥 붙여버리는 코드이다.

## Recursive 방식

Iterative 코드를 Recursive 로 옮겼을 뿐이다. 기본적인 로직은 동일하다.

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
```
{:.python}

Iterative 방식은 앞에서부터 연결 순서를 조정해나가지만, Recursive 방식은 호출은 앞에서부터 이뤄질지라도, 실제로 연결 순서 재조정은 뒤부터 이뤄지게 된다. 이 부분에 차이가 있다.

또한 더미노드도 굳이 필요치 않아 사용하지 않았다.