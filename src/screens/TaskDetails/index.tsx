import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { RootState } from '../../config/store';
import { taskListSlice } from '../../redux/taskList';
import { ITask } from '../../types';
import './styles.css';

function TaskDetails() {
	const { taskId } = useParams();

	const taskList = useSelector((state: RootState) => state.taskList.list);
	const dispatch = useDispatch();

	const taskData = taskList.find((el: any) => {
		return el.id === taskId;
	});

	const [title, setTitle] = useState(taskData?.title || '');
	const [description, setDescription] = useState(taskData?.description || '');
	const [isEdit, setIsEdit] = useState(false);
	const [status, setStatus] = useState(taskData?.status || '');
	const [importance, setImportance] = useState(taskData?.priority || '');

	const onTitleChange = (value: string) => {
		setTitle(value);
		setIsEdit(true);
	};

	const onDescriptionChange = (event: any) => {
		setDescription(event.target.value);
		setIsEdit(true);
	};

	const onSave = () => {
		const updatedTask: ITask = {
			title: title,
			description: description,
			id: taskData?.id || '',
			status: status,
			priority: importance,
		};

		dispatch(taskListSlice.actions.onEdit(updatedTask));
		setIsEdit(false);
	};

	const onResetToInisial = () => {
		setTitle(taskData?.title || '');
		setDescription(taskData?.description || '');
		setStatus(taskData?.status || '');
		setImportance(taskData?.priority || '');
		setIsEdit(false);
	};

	const options = [
		{ value: 'TO_DO', label: 'to do' },
		{ value: 'IN_PROGRESS', label: 'in progress' },
		{ value: 'DONE', label: 'done' },
	];

	const priority = [
		{ value: 'NONE', label: 'none' },
		{ value: 'LOW', label: 'low' },
		{ value: 'HIGH', label: 'high' },
		{ value: 'CRITICAL', label: 'critical' },
	];

	const onChangeStatus = (value: string) => {
		setStatus(value);
		setIsEdit(true);
	};

	const onChangePriority = (value: string) => {
		setImportance(value);
		setIsEdit(true);
	};

	return (
		<>
			<div className="task-conteiner">
				<h4 className="tit">Title:</h4>
				<Input
					className="task-input"
					value={title}
					onChange={onTitleChange}
				/>
				<h4 className="tit">Description:</h4>
				<textarea
					className="description-fields input task-input"
					value={description}
					onChange={onDescriptionChange}
				/>
				<h4 className="tit">Status:</h4>
				<Dropdown
					className="task-input"
					value={status}
					onSelect={onChangeStatus}
					options={options}
					placeholder={'Select state'}
				/>
				<h4 className="tit">Priority:</h4>
				<Dropdown
					className="task-input"
					value={importance}
					onSelect={onChangePriority}
					options={priority}
					placeholder={'Select priority'}
				/>

				<div className="button-row ">
					<Link to="/list/">
						<button className="button-back button-secondary button">
							Back
						</button>
					</Link>
					<button
						className="button-reset button-secondary button"
						onClick={onResetToInisial}
					>
						Reset
					</button>
					<button
						className="button-create button-primary button"
						disabled={!title || !isEdit}
						onClick={onSave}
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
}

export default TaskDetails;
