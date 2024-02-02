import { ExitX } from "../components/ExitX"
import { BigButton } from "../components/BigButton"
import axios from 'axios';

function Login(){
    return(
        <>
        <ExitX />
        <h1>Login</h1>
        <form >
            <label>Username</label><input className = "bg-green-200"></input>
            <label>Password</label><input className = "bg-green-200"></input>
            <BigButton label = "Submit" color = "green-200" />
        </form>
        </>
    );
}

export default Login;