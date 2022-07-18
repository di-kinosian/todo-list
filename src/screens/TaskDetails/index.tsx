import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ITask } from '../../CreateTaskForm';
import './styles.css';

function TaskDetails() {
	const { taskId } = useParams();

	const taskList: ITask[] = JSON.parse(localStorage.getItem('tasks') || '');

	const taskData = taskList.find((el: any) => {
		return el.id === taskId;
	});

	const [title, setTitle] = useState(taskData?.title || '');
	const [description, setDescription] = useState(taskData?.description || '');
	const [isEdit, setIsEdit] = useState(false);

	const onTitleChange = (event: any) => {
		setTitle(event.target.value);
		setIsEdit(true);
	};

	const onDescriptionChange = (event: any) => {
		setDescription(event.target.value);
		setIsEdit(true);
	};

	const onAddToStorage = () => {
		const newList: ITask[] = taskList.map((el) => {
			if (el.id === taskId) {
				return {
					title: title,
					description: description,
					done: el.done,
					id: el.id,
				};
			} else {
				return el;
			}
		});
		localStorage.setItem('tasks', JSON.stringify(newList));
		setIsEdit(false);
	};

	const onResetToInisial = () => {
		setTitle(taskData?.title || '');
		setDescription(taskData?.description || '');
		setIsEdit(false);
	};

	return (
		<>
			<div className="task-conteiner">
				<input
					type="text"
					className="task-form input"
					value={title}
					onChange={onTitleChange}
				/>
				<textarea
					className="description-fields input"
					value={description}
					onChange={onDescriptionChange}
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
						disabled={!(title && isEdit)}
						onClick={onAddToStorage}
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
}

export default TaskDetails;
