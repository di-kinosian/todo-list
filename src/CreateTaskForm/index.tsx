import { useState } from 'react';
import './styles.css';
import { ReactComponent as InfoIcn } from '../assets/icons-info.svg';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export interface ITask {
	id: string;
	title: string;
	done: boolean;
	description: string;
}

function CreateTaskForm() {
	const [title, setTitle] = useState('');
	const [taskList, setTaskList] = useState<ITask[]>(
		JSON.parse(localStorage.getItem('tasks') || '') || []
	);
	const [description, setDescription] = useState('');

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const clearTitle = () => {
		setTitle('');
	};

	const onCreate = () => {
		const newTaskState: ITask[] = [
			{
				id: uuidv4(),
				title: title,
				done: false,
				description: description,
			},
			...taskList,
		];
		console.log(newTaskState);

		setTaskList(newTaskState);
		setTitle('');
		saveToLocalStorage(newTaskState);
	};

	const onDeleteTask = (event: any) => {
		const newTaskList = taskList.filter((task) => {
			return task.id !== event.target.dataset.id;
		});
		setTaskList(newTaskList);
		saveToLocalStorage(newTaskList);
	};

	const saveToLocalStorage = (list: ITask[]) => {
		localStorage.setItem('tasks', JSON.stringify(list));
	};

	// useEffect(() => {
	// 	localStorage.setItem('task', JSON.stringify());
	// });

	const handleCheckboxChange = (event: any) => {
		const newTaskList = taskList.map((task) => {
			return task.id === event.target.dataset.id
				? {
						id: task.id,
						title: task.title,
						done: event.target.checked,
						description: event.target.description,
				  }
				: task;
		});
		setTaskList(newTaskList);
		saveToLocalStorage(newTaskList);
	};

	return (
		<>
			<div className="task-conteiner">
				<input
					type="text"
					className="task-form input"
					value={title}
					onChange={handleTitleChange}
					placeholder="Enter task"
				/>
				<textarea
					className="description-fields input"
					value={description}
					onChange={handleDescriptionChange}
					placeholder="Enter description"
				/>
				<div className="button-row">
					<button
						className="button-secondary button"
						onClick={clearTitle}
					>
						Cancel
					</button>
					<button
						className="button-create button-primary button"
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
						<div className="task" key={task.id}>
							<input
								type="checkbox"
								className="checkbox"
								data-id={task.id}
								checked={task.done}
								onChange={handleCheckboxChange}
							/>
							<div className="task-title">{task.title}</div>
							<Link to={'/list/' + task.id} className="info-icn">
								<InfoIcn width={20} height={20} />
							</Link>
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
