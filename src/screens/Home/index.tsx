import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
	return (
		<>
			<Link to="/list">
				<button className="button go-btn">Go to List</button>
			</Link>
		</>
	);
}

export default Home;
