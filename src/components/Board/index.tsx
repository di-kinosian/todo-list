import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ITask } from '../../types';
import Tag from '../Tag';
import './styles.css';
// import { ReactComponent as WarningIcn } from '../../assets/warning.svg';
// import { ReactComponent as InfoIcn } from '../../assets/icons-info.svg';
// import {
// 	getPriorityColor,
// 	getStatusColor,
// 	transformStatus,
// } from '../../helpers';
import Task from '../Task';

interface IProps {
	list: ITask[];
	className?: string;
	onDelete: (id: string) => void;
}

const Board: FC<IProps> = (props) => {
	return (
		<div className="container-bord">
			<div className="column">
				<h4 className="column-title">TO DO</h4>
				{props.list
					.filter((task) => {
						return task.status === 'TO_DO';
					})
					.map((task) => {
						return <Task data={task} onDelete={props.onDelete} />;
					})}
			</div>
			<div className="column">
				<h4 className="column-title">IN PROGRESS</h4>{' '}
				{props.list
					.filter((task) => {
						return task.status === 'IN_PROGRESS';
					})
					.map((task) => {
						return <Task data={task} onDelete={props.onDelete} />;
					})}
			</div>
			<div className="column">
				<h4 className="column-title">DONE</h4>
				{props.list
					.filter((task) => {
						return task.status === 'DONE';
					})
					.map((task) => {
						return <Task data={task} onDelete={props.onDelete} />;
					})}
			</div>
		</div>
	);
};

export default Board;
