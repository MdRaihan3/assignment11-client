
import { useContext } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provides/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import RequestedFoodCard from "./RequestedFoodCard";

const MyFoodRequest = () => {

    const { data: foods = [], isLoading} = useQuery({
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
            <div className="md:grid grid-cols-3 gap-5">               
                        {
                            foods.map(food => <RequestedFoodCard key={food._id} food={food}></RequestedFoodCard>)
                        } 
            </div>
        </div>
    );
};

export default MyFoodRequest;