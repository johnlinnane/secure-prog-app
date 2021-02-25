import chain from './../assets/media/chain.jpg';

import { Link } from 'react-router-dom';

function Page1() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chain} className="App-logo" alt="logo" />
        <p>
          This is a Secure App!
        </p>
        
        <Link to={'/page2'} className="App-link">
            Go to Page 2
        </Link>
      </header>
    </div>
  );
}

export default Page1;
