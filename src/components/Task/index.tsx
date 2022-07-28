import { FC } from 'react';
import Tag from '../Tag';
import { Link } from 'react-router-dom';
import { ITask } from '../../types';
import './styles.css';
import { ReactComponent as WarningIcn } from '../../assets/warning.svg';
import { ReactComponent as InfoIcn } from '../../assets/icons-info.svg';
import {
	getPriorityColor,
	getStatusColor,
	transformStatus,
} from '../../helpers';

interface IProps {
	data: ITask;
	onDelete: (id: string) => void;
}

const Task: FC<IProps> = (props) => {
	const onDeleteTask = () =>{
		props.onDelete(props.data.id);
	};

	return (
		<div className="task">
			<Tag
				value={transformStatus(props.data.status)}
				color={getStatusColor(props.data.status)}
			/>
			{props.data.priority && props.data.priority !== 'NONE' ? (
				<WarningIcn
					className="warning-icn"
					style={{
						fill: getPriorityColor(props.data.priority),
					}}
				/>
			) : null}
			<div className="task-title">{props.data.title}</div>
			<Link to={'/list/' + props.data.id} className="info-icn">
				<InfoIcn width={20} height={20} />
			</Link>
			<div
				className="close-btn"
				data-id={props.data.id}
				onClick={onDeleteTask}
			>
				+
			</div>
		</div>
	);
};

export default Task;
