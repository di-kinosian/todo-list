import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import Home from './screens/Home';
import TaskDetails from './screens/TaskDetails';

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/list" element={<CreateTaskForm />} />
					<Route path="/list/:taskId" element={<TaskDetails />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
