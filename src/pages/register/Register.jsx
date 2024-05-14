import { useContext, useState } from "react";
import { AuthContext } from "../../provides/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            Swal.fire({icon: 'error',
                text: 'Password should have at least 6 characters'
            })
            return;
        }
        else if (!/^(?=.*[A-Z]).+$/.test(password)) {
            Swal.fire({icon: 'error',
                text: 'Password should have at least a capital letter'
            })
            return;
        }
        else if (!/^(?=.*[a-z]).+$/.test(password)) {
            Swal.fire({icon: 'error',
                text: 'Password should have at least a small letter'
            })
            return;
        }

        const user = { name, photo, email, password }
        console.log(user);

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photo)
                    .then(() => {
                        Swal.fire({icon: 'success',
                            text: 'Registered Successfully'
                        })
                    })
                    .catch(error => {
                        Swal.fire({icon: 'error',
                            text: 'check your email and password again'
                        })
                        console.log(error);
                    })
                console.log(result.user);
                navigate('/')
            })
            .catch(error => {
                Swal.fire({icon: 'error',
                    text: 'check your email and password again'
                })
                console.log(error);
            })
    }

    return (
        <div>
             <Helmet>
                <title> RFood | Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-6">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                        </div>
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
                            <div className=" flex">
                                <input type={showPass ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" required />
                                <span onClick={()=> setShowPass(!showPass)}
                                 className="mt-4 -ml-7">
                                    {
                                        showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className=" text-lg text-center py-2">
                            Already have an account?
                            <Link className=" text-blue-600 font-bold" to='/login'> Login</Link>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Register;