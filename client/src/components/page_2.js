import chain from './../assets/media/chain.jpg';


import { Link } from 'react-router-dom';

function Page2() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={chain} className="App-logo" alt="logo" />
        <p>
          This is the second page!
        </p>

        <Link to={'/'} className="App-link">
            Go to Home Page
        </Link>

      </header>
    </div>
  );
}

export default Page2;
