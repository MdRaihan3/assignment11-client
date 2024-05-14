import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provides/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { emailSignIn, googleSignIn, gitHubSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password }
        console.log(user);
        emailSignIn(email, password)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const userEmail = {email}
            axios.post('https://rf-ood-server.vercel.app/jwt', userEmail, {withCredentials: true})
            .then(res =>{
                if(res.data.success){
                    navigate(location?.state ? location?.state : '/')
                    Swal.fire({icon: 'success',
                        text:'Successfully logged in'
                    })
                }
            })
        })
        .catch(error =>{
            Swal.fire({icon: 'error',
                text: 'check your email and password again'
            })
            console.error(error)
        })
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider()
        googleSignIn(googleProvider)
            .then(result => {
                // const loggedInUserEmail = result?.user?.email;
                // console.log(loggedInUserEmail);
                // const userEmail = {loggedInUserEmail}
                console.log(result);
                axios.post('https://rf-ood-server.vercel.app/jwt', {withCredentials: true})
                .then(res =>{
                    if(res.data.success){
                        navigate(location?.state ? location?.state : '/')
                        Swal.fire({icon: 'success',
                            text:'Successfully logged in'
                        })
                    }
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleGitHubSignIn = () =>{
        const gitHubProvider = new GithubAuthProvider()
        gitHubSignIn(gitHubProvider)
        .then(result => {
            console.log(result.user);
            // const loggedInUserEmail = result?.user?.email;
            // console.log(loggedInUserEmail);
            // const userEmail = {loggedInUserEmail}
            axios.post('https://rf-ood-server.vercel.app/jwt', {withCredentials: true})
            .then(res =>{
                if(res.data.success){
                    navigate(location?.state ? location?.state : '/')
                    Swal.fire({icon: 'success',
                        text:'Successfully logged in'
                    })
                }
            })
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
             <Helmet>
                <title> RFood | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className=" py-2 text-center">
                        <p className=" text-lg text-center">
                            Do not have an account?
                            <Link className=" text-blue-600 font-bold" to='/register'> Register</Link>
                        </p>
                        <div className=" divider">Also Login with</div>
                        <div className=" lg:flex justify-around gap-6 my-4">
                            <button onClick={handleGoogleSignIn} className=" btn btn-primary btn-sm btn-outline text-center">
                               Google <FaGoogle></FaGoogle>
                            </button>
                            <button onClick={handleGitHubSignIn} className=" btn btn-primary btn-sm btn-outline text-center">
                               GitHub <FaGithub></FaGithub>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;