import { useState } from 'react';
import './styled.css';
// import { ReactComponent as Checkbox } from '../assets/icons-check.svg';

import { v4 as uuidv4 } from 'uuid';

interface ITask {
	id: string;
	title: string;
}

function CreateTaskForm() {
	const [title, setTitle] = useState('');
	const [taskList, setTaskList] = useState<ITask[]>([]);
	// const [taskList, setTaskList] = useState<ITask[]>(JSON.parse(localStorage.getItem('tasks')) || []);

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const clearTitle = () => {
		setTitle('');
	};

	const onCreate = () => {
		const newTaskState: ITask[] = [
			...taskList,
			{ id: uuidv4(), title: title },
		];
		setTaskList(newTaskState);
		setTitle('');
		localStorage.setItem('tasks', JSON.stringify(newTaskState));
	};

	const onDeleteTask = (event: any) => {
		const newTaskList = taskList.filter((task) => {
			return task.id !== event.target.dataset.id;
		});
		setTaskList(newTaskList);
		localStorage.setItem('tasks', JSON.stringify(newTaskList));
	};

	// const saveLocalStorage = (list: ITask[]) => {
	// localStorage.setItem('task', JSON.stringify(task));
	// };

	// useEffect(() => {
	// 	localStorage.setItem('task', JSON.stringify());
	// });

	return (
		<>
			<div className="task-conteiner">
				<input
					type="text"
					className="task-form"
					value={title}
					onChange={handleTitleChange}
					placeholder="Enter task"
				/>
				<div className="button-row">
					<button
						className="button-cancel button"
						onClick={clearTitle}
					>
						Cancel
					</button>
					<button
						className="button-create button"
						disabled={!title}
						onClick={onCreate}
					>
						Create
					</button>
				</div>
			</div>

			<div className="list-tasks">
				Task list:
				{taskList.map((task) => {
					return (
						<div className="task">
							<input type="checkbox" className="checkbox"></input>
							<div className="task-title">{task.title}</div>
							<div
								className="close-btn"
								data-id={task.id}
								onClick={onDeleteTask}
							>
								+
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default CreateTaskForm;
