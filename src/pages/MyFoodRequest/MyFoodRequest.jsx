
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provides/AuthProvider";

const MyFoodRequest = () => {
    const [foods, setFoods] = useState([])
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosSecure.get(`/requestedFood/${user?.email}`)
            setFoods(data)
        }
        getData()
    }, [])
    return (
        <div>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    {/* head flsadfj;sdlfjsfj*/}
                    <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Pickup Location</th>
                            <th>Expired Date</th>
                            <th>Request Date</th>
                            <th>My donation Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foods.map(food => <tr key={food?._id}>
                                <td>{food?.food_name}</td>
                                <td>{food?.location}</td>
                                <td>{new Date(food?.expired_date).toLocaleDateString()}</td>
                                <td>{new Date(food?.request_date).toLocaleDateString()}</td>
                                <td>{food?.donation_amount}$</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFoodRequest;