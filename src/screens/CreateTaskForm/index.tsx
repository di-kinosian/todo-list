import { useState } from 'react';
import './styles.css';
import { ReactComponent as InfoIcn } from '../../assets/icons-info.svg';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import Tag from '../../components/Tag';
import { ReactComponent as WarningIcn } from '../../assets/warning.svg';
import { ReactComponent as BurgerIcn } from '../../assets/icon-burger.svg';
import Board from '../../components/Board';
import { ITask } from '../../types';
import TaskList from '../../components/TaskList';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../config/store';
import { taskListSlice } from '../../redux/taskList';

function CreateTaskForm() {
	const [title, setTitle] = useState('');

	const [description, setDescription] = useState('');
	const [mode, setMode] = useState('column');

	const taskList2 = useSelector((state: RootState) => state.taskList.list);
	const dispatch = useDispatch();

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
		const newTaskState: ITask = {
			id: uuidv4(),
			title: title,
			description: description,
			status: 'TO_DO',
			priority: 'NONE',
		};

		dispatch(taskListSlice.actions.onCreate(newTaskState));
		setTitle('');
		setDescription('');
	};

	const onDeleteTask = (id: string) => {
		dispatch(taskListSlice.actions.onDeleteTask(id));
	};

	const onSelectListMode = () => {
		setMode('list');
	};

	const onSelectColumnMode = () => {
		setMode('column');
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
				<div className="tasks-panel">
					Task list:
					<div className="button-group">
						<div
							className={
								mode === 'list'
									? 'button-group-btn active'
									: 'button-group-btn'
							}
							onClick={onSelectListMode}
						>
							<BurgerIcn className="burger-icn" />
						</div>

						<div
							className={
								mode === 'column'
									? 'button-group-btn active'
									: 'button-group-btn'
							}
							onClick={onSelectColumnMode}
						>
							<BurgerIcn className="burger-icn rotate" />
						</div>
					</div>
				</div>
				{mode === 'list' ? (
					<TaskList taskList={taskList2} onDelete={onDeleteTask} />
				) : (
					<Board list={taskList2} onDelete={onDeleteTask} />
				)}
			</div>
		</>
	);
}
export default CreateTaskForm;
