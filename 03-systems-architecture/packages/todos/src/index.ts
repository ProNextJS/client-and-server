export const PRIORITIES: string[] = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;

export type Todo = {
  id: string;
  title: string;
  priority: string;
  completed: boolean;
};

const todosByUser: Record<string, Todo[]> = {
  "test-user-1": [
    {
      id: "test-todo-1",
      title: "Test 1's Todo 1",
      priority: "low",
      completed: false,
    },
    {
      id: "test-todo-2",
      title: "Test 1's Todo 2",
      priority: "medium",
      completed: false,
    },
  ],
  "test-user-2": [
    {
      id: "test-todo-3",
      title: "Test 2's Todo 1",
      priority: "high",
      completed: false,
    },
    {
      id: "test-todo-4",
      title: "Test 2's Todo 2",
      priority: "urgent",
      completed: false,
    },
  ],
};

export function getTodos(userId: string): Todo[] {
  return todosByUser[userId] || [];
}

export function getTodoById(userId: string, todoId: string): Todo | undefined {
  return getTodos(userId).find((todo) => todo.id === todoId);
}

export function addTodo(userId: string, todo: Todo): Todo {
  if (!todo.id) todo.id = Math.random().toString(36).substring(2, 9);
  todosByUser[userId] = [...getTodos(userId), todo];
  return todo;
}

export function updateTodoCompletion(
  userId: string,
  todoId: string,
  completed: boolean
): Todo | undefined {
  const todos = getTodos(userId);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = completed;
    todosByUser[userId] = todos;
  }
  return todo;
}

export function deleteTodo(userId: string, todoId: string): Todo | undefined {
  const todos = getTodos(userId);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todosByUser[userId] = todos.filter((todo) => todo.id !== todoId);
  }
  return todo;
}
