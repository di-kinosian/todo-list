import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../config/store';
import { ITask } from '../types';

interface TaskListState {
	list: Array<ITask>; // ITask[]
}
const initialState: TaskListState = {
	list: [],
};

export const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		onCreate: (state, action) => {
			return {
				...state,
				list: [...state.list, action.payload],
			};
		},
		onDeleteTask: (state, action) => {
			return {
				...state,
				list: state.list.filter((el) => {
					return el.id !== action.payload;
				}),
			};
		},
		onEdit: (state, action) => {
			return {
				...state,
				list: state.list.map((el) => {
					if (el.id === action.payload.id) {
						return action.payload;
					} else {
						return el;
					}
				}),
			};
		},
	},
});
