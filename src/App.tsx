import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateTaskForm from './screens/CreateTaskForm';
import Home from './screens/Home';
import TaskDetails from './screens/TaskDetails';
import { Provider } from 'react-redux';
import { store } from './config/store';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/list" element={<CreateTaskForm />} />
					<Route path="/list/:taskId" element={<TaskDetails />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
