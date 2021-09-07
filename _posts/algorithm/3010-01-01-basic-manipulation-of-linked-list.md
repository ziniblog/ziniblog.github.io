---
layout: post
title: "연결리스트 (Linked List) 생성, 탐색, 삽입/삭제, 방향 뒤집기"
updated: 2021-09-07
tags: [algorithm,graph]
---

## 연결리스트 구조와 특성

연결리스트는 하나의 데이터를 하나의 노드로 구성하고, 데이터 간의 연속성을 노드 간 연결로 구현한 자료구조이다.

```plaintext
head ──> NODE     ┌──> NODE     ┌──> NODE
         + val    │    + val    │    + val
         + next ──┘    + next ──┘    + next ──> None
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

## 특정 노드의 탐색

연결리스트 안에서 어떤 특정 데이터를 품은 노드를 찾는다고 해보자. 특정 노드로부터 출발하여, 반복문으로 계속 노드를 따라가다가, 특정 데이터를 발견하면 리턴한다.

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
    
## 노드 삽입

n 이 가리키는 노드 뒤쪽으로, 새로운 데이터를 삽입한다고 하자. 새로운 데이터를 담은 노드 m 을 생성한 다음, 노드 연결을 조정하면 된다.

```plaintext
                             m ──┐    
                                 v
                                 NODE                       
                                 + val                     
                                 + next                      
                   n ──┐           (2)                     
                       v
head ──> NODE     ┌──> NODE     ┌──> NODE
         + val    │    + val    │    + val
         + next ──┘    + next ──┘    + next ──> None
                         (1)
```
{:.pseudo}

n 이 가리키는 노드의 뒤로 m 이 가리키는 새로운 노드를 삽입한다고 하면, (1) n.next 는 m 이, (2) m.next 는 n.next 가 가리키던 곳을 가리키면 된다.

연결 조정 후는 아래와 같다.

```plaintext                               
                             m ──┐    
                                 v
                              ┌> NODE                       
                              │  + val                     
                              │  + next ┐                     
                   n ──┐      │    (2)  │                   
                       v      │         v
head ──> NODE     ┌──> NODE   │      NODE
         + val    │    + val  │      + val
         + next ──┘    + next ┘      + next ──> None
                         (1)
```
{:.pseudo}

코드로 옮기면 아래와 같다.

```python
def insertnode(node, v):
    n, m = node, ListNode(v)
    
    n.next, m.next = m, n.next
```

(1), (2) 를 순서대로 적용했을 때, 마지막으로 m.next 를 n.next 가 가리키던 곳에 연결해야하지만, 이미 (1) 의 결과로 n.next 는 다른 곳을 가리키고 있다. 따라서 원래는 더미 변수에 미리 n.next 값을 옮겨뒀어야 하지만, Python 의 다중 할당은 이를 더미 변수 없이 편하게 할 수 있게 해준다.

## 노드 삭제

TBD

## 방향 뒤집기

이전 노드와 현재 노드를 가리키는 p, n 두 개의 변수를 상정한다. 처음에 p 는 None, n 은 연결리스트의 head 를 가리킨다.

```plaintext
p (2)    n (3)
│        │
v        v
None     NODE     ┌──> NODE     ┌──> NODE
         + val    │    + val    │    + val
         + next ──┘    + next ──┘    + next ──> None
           (1)
```
{:.pseudo}

방향을 반대로 하려면, (1) n.next 는 p 가, (2) p 는 n 이, (3) n 은 n.next 가 가리키던 곳을 가리키면 된다. 이를 실행한 뒤의 결과는 아래와 같다.

```plaintext
         p (2)         n (3)
         │             │
         v             v
None     NODE          NODE     ┌──> NODE
^        + val         + val    │    + val
└─────── + next        + next ──┘    + next ──> None
           (1)
```
{:.pseudo}

다시 같은 일을 반복하면 된다. 마지막에는 아래와 같은 상황이 되며, n 이 None 을 가리키게 되는 시점에는 더 이상 진행 가능한 노드가 없드므로, 반복을 종료한다.

```plaintext
                                     p          n
                                     │          │
                                     v          │  
None     NODE <───┐    NODE <───┐    NODE       │
^        + val    │    + val    │    + val      v
└─────── + next   └─── + next   └─── + next     None
```
{:.pseudo}

코드로 옮기면 아래와 같다.

```python
def reverse_linkedlist(head):
    p, n = None, head

    while n:
        n.next, p, n = p, n, n.next

    return p
```
{:.python}

while 반복문 안 내용이 제일 중요한 부분이다. 이 역시 Python 의 다중 할당으로, 더미 변수 없이 편하게 값을 교환할 수 있다.