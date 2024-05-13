import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className=" m-10 max-w-6xl mx-auto my-7">
            <img className=" w-full h-96 rounded-lg" src="https://i.ibb.co/CzRH3qs/error1.jpg" alt="" />
          <Link to='/'><button className=" btn btn-secondary btn-outline my-2">Back To Home</button></Link> 
        </div>
    );
};

export default ErrorPage;