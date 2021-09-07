---
layout: post
title: "연결리스트 (Linked List) 생성과 노드 순회"
updated: 2021-09-07
tags: [algorithm,graph]
---

## 연결리스트 구조와 특성

연결리스트는 하나의 데이터를 하나의 노드로 구성하고, 데이터 간의 연속성을 노드 간 연결로 구현한 자료구조이다.

```plaintext
head --> NODE    ┌--> NODE    ┌--> NODE
         |val    |    |val    |    |val
         |next --┘    |next --┘    |next --> None
```
{:.pseudo}
         
노드는 데이터와 다음 노드를 가리키는 정보를 저장할 개체다. val 속성에 데이터를, next 속성에 다음 노드를 할당한다. 그림을 보면 head 가 첫 노드를 가리키고 있으며, 노드의 next 속성이 다음 노드를 순차적으로 가리키고 있다. 제일 마지막의 next 속성은 None 을 가리킨다.

메모리 위에 연속되어있는 자료구조 (대표적으로 배열) 에 비해, 순차적으로 순회하지 않으면 안되므로 특정 노드의 검색은 용이하지않으나, 노드의 삽입/삭제는 쉬운편이라 알려져 있다.

next 속성 외 prev 속성을 추가하여 prev 가 직전의 노드를 가리키도록 하면, 양방향 연결리스트를 구현할 수도 있다.

## 연결리스트 생성과 순회

```python
# 노드 정의
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
# 연결리스트 생성
head = n = ListNode(0)
for i in range(1, 5):
    n.next = ListNode(i)
    n = n.next
    
# 노드 순회
n = head
while n:
    print(n.val)
    n = n.next
    
# output : 0, 1, 2, 3, 4
```
{:.python}

연결리스트를 구성할 각 노드는 ListNode 클래스로 구현된다. val, next 두 속성을 가진다.

0, 1, 2, 3, 4 라는 데이터를 순서대로 저장할 연결리스트를 생성한다. head 는 연결리스트의 첫 노드를 가리키고, n 은 현재 참조하고 있는 노드를 가리킨다. 초기값으로 `ListNode(0)` 으로 0 데이터를 가지는 노드를 생성한 뒤, head 와 n 이 가리키도록 하고, for 반복문으로 next 속성에 다음 노드를 생성하여 가리키도록 하고, n 은 다음노드를 가리키도록 한다.

순회를 위해 다시 n 이 head 와 같은 노드를 가리키도록 한 뒤, while 반복문으로 n 이 존재하면 (즉 None 이 아니라면) 노드를 제대로 가리키고 있다는 의미이므로, val 속성이 가리키는 값을 출력하고, n 은 다음노드를 가리키도록 한다.