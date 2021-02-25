import chain from './../assets/media/chain.jpg';
import axios from 'axios';

import { Link } from 'react-router-dom';

function HomePage() {


    const setCookie = () => {
        axios.post('http://localhost:3002/api/set-cookie', {withCredentials: true})
    }

    return (
        <div className="App">
            <img src={chain} className="App-logo" alt="logo" />
            <p>
              This is a Secure App!
            </p>
            
            
            <Link to={'/UserPage'} className="App-link">
                  Go to User's Page
            </Link>

            <div className="authenticate" onClick={setCookie}>
                Authenticate!
            </div>

        </div>
    );
}

export default HomePage;
