## NextJS

### 初见 React

> 一些资料
>
> [快速入门 – React 中文文档](https://zh-hans.react.dev/learn)
>
> [React 快速暴力入门 - 掘金](https://juejin.cn/post/6960262593265025031)

针对于 SPA 应用，我们很直观的使用着一个公式 $(ui,refs)=f(state,props)$ ，组件的实质就是个对象，而对象自然有属性，在组件里最常用的三个属性分别是  `state`、`props`和  `refs`。

在**Vue**中我们会这样来放我们的状态

```vue

<template>
  <input v-model="state" @change="changeState" ref="domRef"/>
  <slot/>
  <slot name="xx"/>
</template>
<script name="Component" setup>
  // 定义一些受外部组件相关的信息
  const props = defineProps({});
  const emitter = defineEmits();
  const domRef = ref();
  // 定义状态
  const state = ref(value);
  // 改变状态
  onMount(() => {
    state.value = null;
    console.log(domRef.value);
  });

  // 一些交互函数
  function changeState(newValue) {
    state.value = newValue;
    emitter('change', newValue);
  }
</script>
```

```vue
<template>
	<Component @change="log">
		<template #xx>
			<div></div>
		</template>
	</Component>
</template>

<script setup name="Page">
import Component from "./Component.vue";
function log(args) {
	console.log(args);
}
</script>
```

而在 **React** 中，我们可能会像下面的方式来描述

```tsx
export const Compontent = ({children,xx,emitter,...props}) => {
	// 等价于 setup 部分
	const [state,setState] = useState<any>(value);
	const domRef = useRef()

	//  等价 onMount
	useEffect(()=>{
		setState(()=>null)
		console.log(domRef.current)
	},[])
	// 改变函数状态
	function changeState(newValue){
		setState(()=>newValue);
		emitter("change",newValue)
	}
	return <>
	<input value={state} ref={domRef} onChange={changeState}/>
	{children}
	{xx}
	</>
}

function Page(){

	return <Component xx={<div></div>} emitter={(action,args)=>{
		console.log(action,args)
	}}/>
}
```

可以很明显看得出 **React** 与 **Vue** 的思考方式其实是很相近的，只是一个多了很多语法糖（**Vue**）

#### 组件挂载流程

![[NextJS VS Vue3-20240627235710081.png]]

此外还有一些比如 **Context** 之类的概念，一些是我所理解的等价概念。

| 名称             | Vue                                                                                                                                                                                                             | React                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Context 状态共享 | Provider + Inject                                                                                                                                                                                               | Context Provider                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 生命周期钩子     | Vue 生命周期钩子(常见)<br><br>1. beforeCreate<br>2. created<br>3. beforeMount<br>4. mounted<br>5. beforeUpdate<br>6. updated<br>7. beforeUnmount<br>8. unmounted                                                | React 生命周期钩子(常见)<br><br>1. constructor<br>2. componentDidMount<br>3. componentDidUpdate<br>4. componentWillUnmount<br>5. render 整体对比来看，`Vue` 的生命周期会更丰富一些，`React` 生命周期会更简约一些。<br><br>[React hooks 实现生命周期函数 - 掘金](https://juejin.cn/post/7310151273005383691?from=search-suggest) `useEffect`  是实现  `componentDidMount`  和  `componentWillUnmount`  功能的关键。 使用  `useEffect`  配合  `useState`  或  `useMemo`  可以实现  `shouldComponentUpdate`  的功能。 |
| 副作用处理对比   | vue 使用，watchEffect() watchEffect 会自动根据所依赖的值进行重渲染，而 useEffect 要明确指定对应的值才能进行重渲染，React 团队已经给出在未来的版本中可能会改成根据所依赖的值自动进行重渲染的操作，但暂时还不行。 | react 使用，useEffect() watchEffect 在更新前和卸载前触发的方式是通过回调函数的参数被调用来实现的，而 useEffect 是通过 return 的返回值来指定的。                                                                                                                                                                                                                                                                                                                                                                    |

### 智能文件路由系统

[Vite 约定式路由的最佳实践，一个炫酷的方式实现 - 掘金](https://juejin.cn/post/7064450438564675621)
[【Next.js 14】 App Router 的使用（上） - 掘金](https://juejin.cn/post/7344598656144195647)

```txt

app
├── features
│ ├── metadata
│ │ └── page.tsx
│ ├── layout.tsx
│ ├── template.tsx
│ ├── loading.tsx
│ └── error.tsx
├── page.tsx
├── layout.tsx
├── template.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx

```

### 可扩展配置

- 配置文件  `next.config.js`  中暴露了 webpack 实例，因此你可以完全控制 webpack
- -   可  [自定义 server](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fadvanced-features%2Fcustom-server "https://nextjs.org/docs/advanced-features/custom-server") ，你可以在启动服务的时候做一些自己想要做的处理，比如 node.js 性能监控等等。
- 不自定义 server ，也可以使用它提供的  [middreware](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fadvanced-features%2Fmiddleware "https://nextjs.org/docs/advanced-features/middleware")  机制来拦截请求或者校验权限等事项。
- [自定义错误界面](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fadvanced-features%2Fcustom-error-page "https://nextjs.org/docs/advanced-features/custom-error-page")  也就是 404 或者 500 错误状态的页面。
- [自定义页面 head 属性](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fapi-reference%2Fnext%2Fhead "https://nextjs.org/docs/api-reference/next/head")，使用  `next/head`  提供的 Head 组件，用于自定义 html document 头部的 title/meta/base 等标签信息。
