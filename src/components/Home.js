import { logout } from '../helper';
import Classes from './Home.module.css';
import { useHistory } from 'react-router-dom';


const Home = () => {

    const history = useHistory();

    const logoutHandler = () => {
        logout();
        history.replace("/");
    }

    return (
        <>
            <div className={Classes.header}>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </>
    );
}

export default Home;
