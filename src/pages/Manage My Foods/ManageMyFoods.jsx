import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provides/AuthProvider";
import axios from "axios";
import ManageFoodCard from "./ManageFoodCard";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState([])

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`http://localhost:5000/foods/${user?.email}`)
            setFoods(data)
        }
        getData()
    }, [user])
 
    return (
        <div>
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
                        {/* row 1 */}
                       {
                        foods.map(food => <ManageFoodCard key={food._id} food={food}></ManageFoodCard>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMyFoods;