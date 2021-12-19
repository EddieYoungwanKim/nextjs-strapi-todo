import { uuid } from 'uuidv4'
import { assign, createMachine } from 'xstate'

export type Todo = {
  id: string
  title: string
  completed?: boolean
}

type Context = {
  todos: Todo[]
}

export const todoMachine = createMachine<Context>(
  {
    initial: 'idle',
    context: { todos: [] },
    states: {
      // fetching: {
      //   invoke: {
      //     src: 'fetchTodos',
      //     onDone: {
      //       target: 'idle',
      //       actions: 'setTodos',
      //     },
      //   },
      // },
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
          // FETCH: {
          //   target: 'fetching',
          // },
        },
      },
    },
  },
  {
    actions: {
      addTodo: assign({
        todos: (ctx, event) => [{ id: uuid(), title: event.payload }, ...ctx.todos],
      }),
      deleteTodo: assign({
        todos: (ctx, event) => ctx.todos.filter((todo) => todo.id !== event.payload),
      }),
      doneTodo: assign({
        todos: (ctx, event) =>
          ctx.todos.map((todo) => {
            if (event.payload === todo.id)
              return {
                ...todo,
                completed: !todo.completed,
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
