import { FC } from 'react';
import { ITask } from '../../types';
import Tag from '../Tag';
import './styles.css';
import { ReactComponent as WarningIcn } from '../../assets/warning.svg';
import { ReactComponent as BurgerIcn } from '../../assets/icon-burger.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as InfoIcn } from '../../assets/icons-info.svg';
import {
	getPriorityColor,
	getStatusColor,
	transformStatus,
} from '../../helpers';

interface IProps {
	taskList: ITask[];
	onDelete: (id: string) => void;
}

const TaskList: FC<IProps> = (props) => {
	const onDeleteTask = (event: any) => {
		props.onDelete(event.target.dataset.id);
	};
	return (
		<div className="tasks-container">
			{props.taskList.map((task) => {
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
	);
};

export default TaskList;
