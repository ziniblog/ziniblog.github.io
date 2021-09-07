---
layout: post
title: "연결리스트 (Linked List) 생성, 탐색, 삽입/삭제, 방향 뒤집기"
updated: 2021-09-07
tags: [algorithm,graph]
---

## 연결리스트 구조와 특성

연결리스트는 하나의 데이터를 하나의 노드로 구성하고, 데이터 간의 연속성을 노드 간 연결로 구현한 자료구조이다.

```plaintext
head --> NODE     ┌--> NODE     ┌--> NODE
         + val    |    + val    |    + val
         + next --┘    + next --┘    + next --> None
```
{:.pseudo}
         
노드는 데이터와 다음 노드를 가리키는 정보를 저장할 개체다. val 속성에 데이터를, next 속성에 다음 노드를 할당한다. 그림을 보면 head 가 첫 노드를 가리키고 있으며, 노드의 next 속성이 다음 노드를 순차적으로 가리키고 있다. 제일 마지막의 next 속성은 None 을 가리킨다.

메모리 위에 연속되어있는 자료구조 (대표적으로 배열) 에 비해, 순차적으로 순회하지 않으면 안되므로 특정 노드의 검색은 용이하지않으나, 노드의 삽입/삭제는 쉬운편이라 알려져 있다.

next 속성 외 prev 속성을 추가하여 prev 가 직전의 노드를 가리키도록 하면, 양방향 연결리스트를 구현할 수도 있다.

## 노드의 정의

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```
{:.python}

연결리스트의 노드는 개체이므로, Python 에서 개체를 표현하기에 가장 적합한 클래스로 구현하였다. val, next 두 속성을 가지며, 디폴트로 val 과 next 는 각각 0 과 None 을 가리킨다.

## 연결리스트 생성

배열을 인수로 넘겨받으면 연결리스트를 만들어, 처음 데이터가 담긴 노드 (즉 head 가 가리키는 노드) 를 리턴하는 함수로 구현하였다.

```python
def create_linkedlist(arr):
    dummy = n = ListNode()
    
    for x in arr:
        n.next = ListNode(x)
        n = n.next
    
    return dummy.next
```
{:.python}

연결리스트의 노드가 되는 ListNode 클래스가 사전에 정의되어 있어야 한다.

먼저 가상의 노드를 생성하고 dummy 와 n 이 이를 가리키도록 한다. n 은 현재의 노드를 가리키는 변수고, dummy 는 나중에 리턴할 값을 위해 그 위치를 보존하는 변수다.

핵심 부분은 for 반복문으로, 인수로 넘겨받은 arr 을 x 로 순회하면서 노드를 만들어 간다. `ListNode(x)` 구문으로 x 를 데이터로 가지는 노드를 생성하고, 현재 노드 n 의 next 속성이 이를 가리키도록 한다. 노드가 연결되었으므로, n 은 이제 다음노드를 가리킨다.

마지막에는 dummy.next 를 리턴하는데, dummy 가 가리키는 노드는 처음에 코딩편의를 위해 임의로 만든 노드이고, 실제 데이터는 dummy.next 부터 시작하기 때문이다.

0, 1, 2, 3, 4 라는 데이터를 순서대로 저장할 연결리스트를 생성한다. head 는 연결리스트의 첫 노드를 가리키고, n 은 현재 참조하고 있는 노드를 가리킨다. 초기값으로 `ListNode(0)` 으로 0 데이터를 가지는 노드를 생성한 뒤, head 와 n 이 가리키도록 하고, for 반복문으로 next 속성에 다음 노드를 생성하여 가리키도록 하고, n 은 다음노드를 가리키도록 한다.

순회를 위해 다시 n 이 head 와 같은 노드를 가리키도록 한 뒤, while 반복문으로 n 이 존재하면 (즉 None 이 아니라면) 노드를 제대로 가리키고 있다는 의미이므로, val 속성이 가리키는 값을 출력하고, n 은 다음노드를 가리키도록 한다.

## 특정 노드의 탐색

연결리스트 안에서 어떤 특정 데이터를 품은 노드를 찾는다고 해보자. head 부터 출발하여, 반복문으로 계속 노드를 따라가다가, 특정 데이터를 발견하면 반복문을 나오면 된다.

```python
def findnode(node, v):
    n = node

    while n:
        if n.val == v: return n
        n = n.next
        
    return None
```
{:.python}

노드 node 와 찾을 값 v 를 인수로 받는다. n 이 node 를 가리키도록 한 뒤, None 이 아니라면 while 반복을 통해 n.val 이 찾는 값 v 인지 확인해 나간다.

찾는 값이 있다면, 그 때의 노드를 가리키는 n 을 리턴하고, 끝까지 순회했는데도 없다면 None 을 리턴한다.
    
## 노드 삽입/삭제

TBD

## 방향 뒤집기

TBD