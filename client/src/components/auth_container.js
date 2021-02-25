import React from 'react';
import axios from 'axios';




const AuthContainer = (Component) => {
    return class AuthContainer extends React.Component {


        componentDidMount() {
            console.log('did mount')
            axios.get('http://localhost:3002/api/check-authentication-cookie', {withCredentials:true})
        }


        render() {
            return (
                <Component />
            )
        }
    }

    
}

export default AuthContainer;
