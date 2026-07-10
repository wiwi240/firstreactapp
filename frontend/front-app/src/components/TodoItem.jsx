// Le clic delegue le changement d etat au parent, qui reste la source de verite.
function TodoItem({ todo, onToggle, apiSourceLabel, localSourceLabel }) {
  return (
    <li>
      <button
        type="button"
        className={`todo-item ${todo.completed ? 'is-completed' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        <span className="todo-check" aria-hidden="true">
          {todo.completed ? '✓' : ''}
        </span>
        <span className="todo-content">
          <span className="todo-title">{todo.title}</span>
          <span className="todo-source">
            {todo.source === 'api' ? apiSourceLabel : localSourceLabel}
          </span>
        </span>
      </button>
    </li>
  )
}

export default TodoItem
