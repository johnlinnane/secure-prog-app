import React, { Component } from 'react';





const AuthContainer = (ComposedClass, reload) => {
    return (
        <ComposedClass />
    )
}

export default AuthContainer;


// export default function foo(ComposedClass, reload) {

//     // make a class to dispatch an action to check if user is authenticated
//     class AuthenticationCheck extends Component {


//         state = {
//             loading:false
//         }


//         componentDidMount() {
//             console.log('authcont')
//         }

//         componentDidUpdate(prevProps, prevState) {
//         //     if (this.props !== prevProps) {
//         //         this.setState({loading:false})

//         //         // if(this.props.user.login && !this.props.user.login.isAuth) {
//         //         if(this.props.user && this.props.user.login && !this.props.user.login.isAuth) {
//         //             console.log('user is not authenticated')
//         //             if(reload === true) {
//         //                 console.log('push to login')
//         //                 this.props.history.push('/login');
//         //             }
//         //         // else { ..
//         //         } else { 
//         //             // console.log('user is authenticated')
//         //             if (reload === false) {
//         //                 console.log('push to user')
//         //                 this.props.history.push('/user')
//         //             } else {
//         //                 // console.log('Reload is null... Proceed!!')
//         //             }
//         //         } 

//         //     }
//         }

//         render() {
//             console.log('WELL HELLO')
//             if(this.state.loading) {
//                 return <div className="loader">Loading...</div>
//             }

//             return(
//                 // <ComposedClass {...this.props} user={this.props.user}/>
//                 <ComposedClass />
//             )
//         }
//     }

// }

