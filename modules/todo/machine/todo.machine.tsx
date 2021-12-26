import { assign, createMachine } from 'xstate'

export type Todo = {
  id: string
  title: string
  isComplete?: boolean
}

type Context = {
  todos: Todo[]
}

export const todoMachine = createMachine<Context>(
  {
    initial: 'idle',
    context: { todos: [] },
    states: {
      idle: {
        on: {
          SUBMIT: {
            actions: 'addTodo',
          },
          DELETE: {
            actions: 'deleteTodo',
          },
          DONE: {
            actions: 'doneTodo',
          },
        },
      },
    },
  },
  {
    actions: {
      // addTodo: assign({
      //   todos: (ctx, event) => [{ id: uuid(), title: event.payload }, ...ctx.todos],
      // }),
      deleteTodo: assign({
        todos: (ctx, event) => ctx.todos.filter((todo) => todo.id !== event.payload),
      }),
      doneTodo: assign({
        todos: (ctx, event) =>
          ctx.todos.map((todo) => {
            if (event.payload === todo.id)
              return {
                ...todo,
                isComplete: !todo.isComplete,
              }
            return { ...todo }
          }),
      }),
      setTodos: assign({
        todos: (ctx, event) => {
          return event.data
        },
      }),
    },
  }
)
