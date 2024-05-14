
import { useContext } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provides/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const MyFoodRequest = () => {

    const { data: foods = [], isLoading, refresh, isError, error } = useQuery({
        queryFn: () => getData(),
        queryKey: ['foods']
    })

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    // const [foods, setFoods] = useState([])

    // useEffect(() => {     
    //     getData()
    // }, [])

    const getData = async () => {
        const { data } = await axiosSecure.get(`/requestedFood/${user?.email}`)
        // setFoods(data)
        return data
    }

    if (isLoading) { return <span className="loading loading-spinner text-secondary"></span> }

    return (
        <div>
            <Helmet>
                <title> RFood | MyFoodRequest</title>
            </Helmet>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    {/* head */}
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