import './styles.css';
import { useState, useMemo, useEffect, useRef, FC } from 'react';
import arrowIcon from '../../assets/arrow-icon.svg';

interface IProps {
	className?: string;
	value: string;
	onSelect: (value: string) => void;
	placeholder?: string;
	options: {
		value: string;
		label: string;
	}[];
}

const Dropdown: FC<IProps> = (props) => {
	const [showing, setShowing] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const showOptions = () => {
		if (showing) {
			setShowing(false);
		} else {
			setShowing(true);
		}
	};

	const closeOptions = () => {
		setShowing(false);
	};

	const selectedOption = useMemo(() => {
		return props.options.find((item) => item.value === props.value);
	}, [props.options, props.value]);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setShowing(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const selectOption = (event: any) => {
		props.onSelect(event.target.dataset.value);
	};

	return (
		<div
			className={`dropdown-conteiner ${props.className}`}
			ref={containerRef}
		>
			<div
				className={
					showing ? 'dropdown-control opened' : 'dropdown-control'
				}
				onClick={showOptions}
			>
				{selectedOption ? (
					<div className="dropdown-control-value">
						{selectedOption.label}
					</div>
				) : (
					props.placeholder
				)}

				<img
					className="arrow-icn"
					alt=""
					src={arrowIcon}
					style={{
						transform: showing ? 'rotate(90deg)' : 'rotate(270deg)',
					}}
				/>
			</div>

			{showing ? (
				<div className="dropdown-options" onClick={closeOptions}>
					{props.options.map((item) => (
						<div
							key={item.value}
							className={
								item.value === props.value
									? 'option active'
									: 'option'
							}
							onClick={selectOption}
							data-value={item.value}
						>
							{item.label}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Dropdown;
