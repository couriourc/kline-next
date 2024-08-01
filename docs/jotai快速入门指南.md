## Jotai 入门指南

Jotai 是一个原始而灵活的 React 状态管理库。

简单来说 Jotai 就是将状态改到原子态，有一种 Signal 的味道在里面。
Atom 是 Jotai 中状态管理单位，它是可以更新和订阅的，当 Atom 被更新时，订阅了这个 Atom 的组件便会使用新值重新渲染并且，更新对应的
Atom **只会重新渲染订阅了这个 Atom 的组件**，并不会像 Context 那样导致整个父组件重新渲染，所以可以做到精确渲染。

> 快速示例

```tsx

import {Provider, atom, useAtom, useSetAtom} from 'jotai'
import {atomFamily} from 'jotai/utils'

const filterAtom = atom('all')
const todosAtom = atom<string[]>([])
const filteredAtom = atom((get) => {
    const filter = get(filterAtom)
    const todos = get(todosAtom)
    if (filter === 'all') return todos
    else if (filter === 'completed')
        return todos.filter((id) => get(todoAtomFamily({id})).completed)
    else return todos.filter((id) => !get(todoAtomFamily({id})).completed)
})

const TodoItem = ({
                      id,
                      remove,
                  }: {
    id: string
    remove: (id: string) => void
}) => {
    const [item, setItem] = useAtom(todoAtomFamily({id}))
    const toggleCompleted = () => setItem({...item, completed: !item.completed})
    return (
        <>
            <input
                type="checkbox"
                checked={item.completed}
                onChange={toggleCompleted}
            />
            <span style={{textDecoration: item.completed ? 'line-through' : ''}}>
        {item.title}
      </span>
            <CloseOutlined onClick={() => remove(id)}/>
        </>
    )
}

const Filter = () => {
    const [filter, set] = useAtom(filterAtom)
    return (
        <Radio.Group onChange={(e) => set(e.target.value)} value={filter}>
            <Radio value="all">All</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="incompleted">Incompleted</Radio>
        </Radio.Group>
    )
}

const Filtered = ({remove}: { remove: (id: string) => void }) => {
    const [todos] = useAtom(filteredAtom)
    const transitions = useTransition(todos, {
        keys: (id: string) => id,
        from: {opacity: 0, height: 0},
        enter: {opacity: 1, height: 40},
        leave: {opacity: 0, height: 0},
    })
    return transitions((style, id) => (
        <a.div className="item" style={style}>
            <TodoItem id={id} remove={remove}/>
        </a.div>
    ))
}

const TodoList = () => {
    // Use `useSetAtom` to avoid re-render
    // const [, setTodos] = useAtom(todosAtom)
    const setTodos = useSetAtom(todosAtom)
    const remove = (id: string) => {
        setTodos((prev) => prev.filter((item) => item !== id))
        todoAtomFamily.remove({id})
    }
    const add = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const title = e.currentTarget.inputTitle.value
        e.currentTarget.inputTitle.value = ''
        const id = nanoid()
        todoAtomFamily({id, title})
        setTodos((prev) => [...prev, id])
    }
    return (
        <form onSubmit={add}>
            <Filter/>
            <input name="inputTitle" placeholder="Type ..."/>
            <Filtered remove={remove}/>
        </form>
    )
}
```
### 基本步骤

#### 定义 Atom

```typescript
import {atom} from 'jotai';

const countAtom = atom(0);
```

#### 使用 Atom

```tsx
import {useAtom} from 'jotai';

function Counter() {
    const [count, setCount] = useAtom(countAtom);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
}

```


