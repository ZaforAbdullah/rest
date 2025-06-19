import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Mock API functions
const mockTodos = [{ id: 1, title: 'Learn React Query' }]
const getTodos = () =>
    new Promise((resolve) => setTimeout(() => resolve(mockTodos), 500))

const postTodo = (newTodo) =>
    new Promise((resolve) =>
        setTimeout(() => {
            mockTodos.push(newTodo)
            resolve(newTodo)
        }, 500)
    )

// Create a QueryClient
const queryClient = new QueryClient()

function QuickStart() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    )
}

function Todos() {
    const queryClient = useQueryClient()

    // Fetch todos
    const { data: todos, isPending } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
    })

    // Add a new todo
    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            // Refetch todos after mutation
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    return (
        <div>
            <h2>Todos</h2>
            {isPending ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {todos?.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => {
                    mutation.mutate({ id: Date.now(), title: 'Do Laundry' })
                }}
            >
                Add Todo
            </button>
        </div>
    )
}

export default QuickStart
