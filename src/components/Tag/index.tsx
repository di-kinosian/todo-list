import { FC } from 'react';
import './styles.css';

interface IProps {
	value: string;
	className?: string;
	color: string;
}

const Tag: FC<IProps> = (props) => {
	return (
		<div
			className={`status-label ${props.className}`}
			style={{ background: props.color }}
		>
			{props.value}
		</div>
	);
};

export default Tag;
