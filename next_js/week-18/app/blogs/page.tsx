import axios from "axios";

interface Todo {
    todo: string;
    completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
    const { data } = await axios.get("https://dummyjson.com/todos/");
    return data.todos; // Assuming the API response has a `todos` array
}

export default async function Blogs() {
    const todos: Todo[] = await fetchTodos();

    return (
        <div>
            {todos.map(({ todo, completed }, index) => (
                <div key={index}>
                    <h3 className="text-yellow-500">{todo}</h3>
                    <p>Status: {completed ? "Completed" : "Not Completed"}</p>
                </div>
            ))}
        </div>
    );
}
