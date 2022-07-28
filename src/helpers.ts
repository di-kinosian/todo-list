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

export { transformStatus, getStatusColor, getPriorityColor };
