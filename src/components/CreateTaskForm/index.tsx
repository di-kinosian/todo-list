import { useState } from 'react';
import './styles.css';
import { ReactComponent as InfoIcn } from '../../assets/icons-info.svg';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Tag from '../Tag';
import { ReactComponent as WarningIcn } from '../../assets/warning.svg';

export interface ITask {
	id: string;
	title: string;
	description: string;
	status: string;
	priority: string;
}

const transformStatus = (str: string): string => {
	return str.replace('_', ' ').toUpperCase();
};

const getStatusColor = (status: string): string => {
	switch (status) {
		case 'TO_DO':
			return '#cacbcd';
		case 'IN_PROGRESS':
			return '#ffbd43';
		case 'DONE':
			return 'rgb(115 206 115)';
		default:
			return '#cacbcd';
	}
};

const getPriorityColor = (priority: string): string => {
	switch (priority) {
		case 'LOW':
			return '#7394d6';
		case 'HIGH':
			return '#ffbd43';
		case 'CRITICAL':
			return 'red';
		default:
			return '#cacbcd';
	}
};

function CreateTaskForm() {
	const [title, setTitle] = useState('');
	const [taskList, setTaskList] = useState<ITask[]>(
		JSON.parse(localStorage.getItem('tasks') || '') || []
	);
	const [description, setDescription] = useState('');

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const handleTitleChange = (value: string) => {
		setTitle(value);
	};

	const clearTitle = () => {
		setTitle('');
	};

	const onCreate = () => {
		const newTaskState: ITask[] = [
			{
				id: uuidv4(),
				title: title,
				description: description,
				status: 'TO_DO',
				priority: 'NONE',
			},
			...taskList,
		];

		setTaskList(newTaskState);
		setTitle('');
		setDescription('');
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

	return (
		<>
			<div className="task-conteiner">
				<h4 className="tit">Title:</h4>
				<Input
					value={title}
					onChange={handleTitleChange}
					className="task-input"
				/>
				<h4 className="tit">Description:</h4>
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
							<Tag
								value={transformStatus(task.status)}
								color={getStatusColor(task.status)}
							/>
							{task.priority && task.priority !== 'NONE' ? (
								<WarningIcn
									className="warning-icn"
									style={{
										fill: getPriorityColor(task.priority),
									}}
								/>
							) : null}
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
