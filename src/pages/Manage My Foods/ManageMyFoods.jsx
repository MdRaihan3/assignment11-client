import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provides/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState([])
    const axiosSecure = useAxiosSecure()

    const getData = async () => {
        const { data } = await axiosSecure.get(`/foods/${user?.email}`)
        setFoods(data)
    }

    useEffect(() => {
        getData()
    }, [user])

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try{
                    const deleteData = async () =>{
                        await axios.delete(`http://localhost:5000/delete/${id}`)
                        getData()
                    }
                    deleteData()               
                } catch(error) {console.log(error);}
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        })
    }

    return (
        <div>
             <Helmet>
                <title> RFood | ManageMyFoods</title>
            </Helmet>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>quantity</th>
                            <th>Expired Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foods.map(food => <tr key={food?._id}>
                                <td>{food?.food_name}</td>
                                <td>{food?.quantity}</td>
                                <td>{new Date(food?.expired_date).toLocaleDateString()}</td>
                                <td><Link to={`/update/${food?._id}`}><button className=" btn btn-primary btn-outline">Update</button></Link></td>
                                <td><button onClick={() => handleDelete(food?._id)} className=" btn btn-primary btn-outline">Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMyFoods;