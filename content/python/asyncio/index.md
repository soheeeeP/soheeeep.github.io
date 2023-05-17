---
emoji: 💭
title: 파이선에서 asyncio로 비동기 처리하기
date: '2023-05-14 23:33:00'
author: 소희
categories: python
---

## 비동기 프로그래밍과 동작원리

**비동기(asynchronous)** 처리는 현재 실행 중인 작업이 완료되지 않은 상태에서 다른 작업을 처리하도록 요청할 수 있는 방식이다. **동기(synchronous)** 처리와 다르게 여러 작업을 동시에 실행할 수 있다는 장점이 있다. 

파이선에서는 비동기 프로그래밍을 적용하여 동시성을 보장하기 위해 `asyncio`라는 모듈을 사용한다. 

<br>

## Coroutine(코루틴)

특정 함수를 실행할 때, 반복되는 작업을 개별 함수로 분리하고 이를 호출하여 사용할 수 있다. 여기서 호출되어 수행되는 흐름을 `Sub Routine`이라고 한다. `Sub Routine`은 하나의 entry point를 가지고 있으며 호출되는 `Main Routine`에 종속적이라는 특징을 가지고 있다. 

`Coroutine`이란 서브 루틴처럼 특정 함수의 실행에 종속되어 있는 것이 아닌, 대등한 관계를 가지고 서로 순차적으로 호출할 수 있도록 구현된 함수라고 할 수 있다. `Sub Routine`과 달리 여러 개의 entry point와 exit point를 가진다.
`Coroutine`을 이해하기 위해 아래 개념들을 알 필요가 있다.

<br>

### Iterator(이터레이터)
순서대로 값을 리턴할 수 있는 객체이다. 필요한 값을 메모리에 할당하고, 반환하도록 동작하여 메모리를 효율적으로 사용할 수 있다. `iter(object)` 또는 `object.__iter__()`를 사용하여 정의할 수 있고, `object.__next__()` 메소드를 호출하여 객체를 호출될 때마다 다음 값을 리턴하게 구현할 수 있다. 또한 특정 object에 `iter()`함수를 사용할 때마다 새로운 `Iterator` 객체가 생성되고, 각각의 객체들은 서로 독립적인 상태를 가지게 된다.   
이러한 특성을 활용하여 <b>필요한 시점에 객체를 호출하여 여러 작업을 번갈아가면서 수행</b>하도록 구현할 수 있다.
가장 간단하게 for문으로 수행하는 파이선의 `range()` 함수를 예로 들 수 있다. iteratable한 객체, 즉 반복이 가능한 객체를 메모리에 할당하지 않고 순차적으로 사용할 수 있다.
``` python
# 0 ~ 99의 integer를 별도의 메모리 공간에 할당해두지 않고, iteration이 될 때마다 꺼내어서 사용
for i in range(100): 
    sum += i
```
<br>

### Generator(제너레이터)
`__iter__()`를 사용하지 않고도 `Iterator` 객체를 생성할 수 있다. 가장 큰 차이는 `yield`를 사용하여 중단점을 설정하고 작업을 재개할 수 있도록 구현되었다는 점이다. `generator` 객체를 생성한 뒤 `next(object)`를 호출해야 작업이 시작되며, 실행 시마다 값을 메모리에 할당하여 사용한다.  
``` python
def generator(nums):
    for i in nums:
        yield i
``` 
``` bash
print(generator([1, 2, 3, 4, 5]))       # 값들이 메모리에 적재되어 있지 않고, 객체만 생성된 상태
>> <generator object generator at 0x00E35568>
``` 
<br>

`generator`를 호출하는 함수를 `caller`라고 하자. 
`caller`에서 `next(object)`를 호출하면 제어권이 `generator`로 전달되고, 로직에 따라 작업을 수행한다. `yield` 구문을 만나면, 실행 결과를 저장하고 다시 caller쪽으로 제어권을 반환한다. `caller`가 `generator`로 값을 전달할 때는 `object.send(value)` 함수를 사용하면 된다. (아직 시작이 되지 않은 generator에는 `None`값만 전달할 수 있다.  

``` python
def generator_coroutine():
    print('callee 1')
    x = yield 1
    print('callee 2: %d' % x)
    x = yield 2
	
task = generator_coroutine()
i = next(task)    # i = 1 / caller 1 출력
i = task.send(10) # i = 2 / caller 2: 10 출력
``` 
<br>

두 개 이상의 `Generator`가 서로 값을 주고받으면서 교차적으로 수행할 수 있어서 `lightweight coroutine`이라고 표현하기도 한다. 하나의 thread 위에서 여러 실행 흐름이 존재할 수 있도록 구현함으로서 작업들이 동시에 진행되는 것처럼 처리할 수 있다. 

`yield from` 구문을 사용하여 `Coroutine` 내부에서 `Sub Coroutine`을 사용하도록 구현할 수도 있다.
``` python
def generator():
	yield from generator_2()
	yield from generator_3()
``` 
<br>

> **_NOTE:_** 파이선에서는 `yield`를 사용하는 `coroutine`을 `Generator-based coroutine`이라고 부르고, `asyncio` 모듈에서 지원하는 `async/await` 키워드를 사용하여 `coroutine`을 정의하는 방식을 `Native coroutine`이라고 부른다.

<br>

## Event Loop

파이선 `asyncio`에서는 `coroutine`과 `event loop`를 사용하여 비동기 프로그래밍을 지원한다.  

`coroutine` 객체가 생성 및 반환 후에 `coroutine`을 실행해주는 부분이 선언되어 있어야 작업(task)이 개시된다. 여기서 사용되는 개념이 바로 event loop이다. event loop는 하나의 thread에서 등록된 여러 코루틴 사이의 실행권을 가지고 연산을 수행시키는 역할을 한다. 
쉽개 말하면, 무한히 loop를 돌며, loop마다 작업(task)을 하나씩 실행시키는 일종의 로직이다. thread에 event loop를 설정한다는 것은 **"작업, 즉 하나의 coroutine에서 출발하는 하나의 실행 흐름을 수행할 수 로직을 실행할 객체를 생성한 것"**이라고 이해하면 된다.

이 때 전달받은 `coroutine` 객체는 `async def`를 사용하여 정의된 함수여야 한다.

``` python
async def coroutine():
    print('coroutine')
    await asyncio.sleep(0.1)
    return 1

loop = asyncio.get_event_loop()
# 더 이상 수행될 task가 없을때까지 무한히 loop를 돌며 전달받은 coroutine 객체를 처리
loop.run_until_complete(coroutine())
# event loop에 아직 실행이 종료되지 않은 task가 남아있다면, 모두 제거
loop.close()
```

<br>

### Future(퓨쳐)와 Task(테스크)

`coroutine` 내부에서 다른 작업, 즉 `sub coroutine`을 수행하는 경우에는 `Future`, `Task`와 같은 `Awaitable`한 객체(실행을 종료할 때까지 기다릴 객체)를 `await`과 함께 사용해야 한다. 

`Future`는 어떠한 작업의 실행 상태 및 결과를 저장하는 객체로, non-blocking 작업을 리턴한다고 볼 수 있다. *(작업의 실행을 시작하는 역할은 수행하지 않는다.)* `add_done_callback()`으로 완료 시에 호출할 콜백함수를 등록할 수 있고, `result()`로 실행결과를 반환한다. 

`Task`는 `Future`를 상속한 객체로, 작업의 실행 상태 및 결과를 저장한다. `Future`와는 달리 작업의 실행을 개시하는 역할까지 수행한다. `asyncio.run()` 또는 `asyncio.create_task()`함수<text style="color:grey;"> _(Python 3.6 이전에서는 `asyncio.ensure_future()`를 사용)_ </text>를 호출할 때 `coroutine` 객체를 인자로 전달하면, `Task`객체가 생성되면서 전달받은 `coroutine`이 `Task`로 실행되도록 예약된다.

<br>

## Event Loop가 Coroutine을 실행하는 방식


`coroutine` 객체의 생성 및 반환이 `coroutine`의 실행을 의미하지 않는다고 하였다. 아래는 `coroutine`을 실행하기 위한 방법들이다.

**1. `await` syntax**

`coroutine` 내부에서만 사용할 수 있는 키워드이다. 따라서 `coroutine`을 처음 실행할 때는 사용할 수 없고, 다른 `coroutine` 내부에서 `sub coroutine`을 호출하는 경우에 사용할 수 있다. 다른 `coroutine`을 호출하고, 해당 작업이 완료될 때까지 기다린다. 또한 다른 `coroutine`에 대한 entry point라고도 이해할 수 있다. 

<br>

**2. `asyncio.run()` 함수**

&nbsp;&nbsp;&nbsp;&nbsp;
**① 현재 실행 중인 thread에 새로운 event loop를 설정**하고<br>
&nbsp;&nbsp;&nbsp;&nbsp;
**② 인자로 전달되는 `coroutine` 객체를 `task`로 예약하여 실행**하고<br>
&nbsp;&nbsp;&nbsp;&nbsp;
**③`task`의 실행이 완료되면 event loop를 닫는 역할**을 수행한다.

```python
async def function():
    try:
        loop = asyncio.get_running loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
    finally:
        loop.run_until_complete(coroutine())
        loop.close()
```

> **_NOTE:_** `get_event_loop()`는 실행 중인 event loop를 가져오기 위해 사용하는 함수로, 실행 중인 event loop가 없는 경우, `RuntimeError`를 발생시킨다. Python 3.10 이상에서는 지원되지 않는 함수로, coroutine이나 callback에서는 `get_running_loop()`를 사용하는 것이 권장된다. 

<br>

**3. `asyncio.create_task()`와 `asyncio.gather()` 함수**

`asyncio.run()`은 기본적으로 하나의 task를 실행한다. 따라서 여러 `Task`객체를 생성하여 실행하는 경우에만 동시적(concurrent)성이 보장된다고 할 수 있다. 
전달받은 여러 Awaitable 객체들이 완료될 때까지 기다렸다가, 그 완료 결과를 리스트 형태로 반환하는 함수가 바로 `asyncio.gather(*tasks)`이다.

```python
async def function():
    tasks = [asyncio.create_task(_function(data)) for data in data_list] 
    results = await asyncio.gather(*tasks)  # [result_task_1, result_task_2, ...]
    return results
``` 

<br>

## 참고
- https://docs.python.org/3/library/asyncio.html
- https://it-eldorado.tistory.com/159
- https://soooprmx.com/asyncio/

``` toc
``` 