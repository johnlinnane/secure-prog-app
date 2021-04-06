import React from 'react';
import { Link } from 'react-router-dom';




// class Header extends Component {
function Header() {

    // const [redirect, setRedirect] = useState("");

    // const register = () => {
    //     console.log('Hi')
    //     axios.get("/api/logout")
    //         .then((res) => {
    //             console.log(res.status)
    //             if (res.status === 200) {
    //                 setRedirect(true)
    //             }
    //         });
    // };

    // if (redirect) {
    //     return <Redirect to='/home' />
    // }

    return (
        <header className="header">

            <div className="header_links">
                <div className="header_link">
                    <Link className="link_tag" to="/">
                        Shop    
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/user-zone">
                        User Zone   
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/login">
                        <strike>User Login</strike>
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/register">
                        User Register    
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/admin-zone">
                        Admin Zone
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/admin-login">
                        Admin Login
                    </Link>
                </div>


                {/* <div className="header_link logout_btn" onClick={register}>
                        Logout
                </div> */}

                <div className="header_link">
                    <Link className="link_tag" to="/logout">
                        Logout
                    </Link>
                </div>


            </div>
            

            

            


            


            
        </header>
    );
}

export default Header;
