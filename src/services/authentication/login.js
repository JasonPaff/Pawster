import { connect } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as actionCreators from '../../store/action_creators/actionCreators'

const navigate = useNavigate()

const handleLoginUser = (user) => {
    fetch('#', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user) 
    }).then(response => response.json())
    .then(result => {
        if(result.success) {
            // saving userId, token, and username to localStorage
            const token = result.token
            const userId = result.user_id
            localStorage.setItem('jsonwebtoken', token)
            localStorage.setItem('userId', userId)
            // Get username from local state
            localStorage.setItem('username', user.username)
            props.onLogin(token)
            navigate("/")

        } else {
            // display error message
            console.log("Authentication Failed")
        }

    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch(actionCreators.login(token))
    }
}

export default connect(null, mapDispatchToProps)(handleLoginUser)