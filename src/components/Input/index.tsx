import { FC } from 'react';

interface IProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const Input: FC<IProps> = (props) => {
	const handleInputChange = (event: any) => {
		props.onChange(event.target.value);
	};

	return (
		<>
			<input
				value={props.value}
				className={`input ${props.className}`}
				type="text"
				placeholder="Enter task"
				onChange={handleInputChange}
			/>
		</>
	);
};

export default Input;
