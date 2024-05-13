import { useLoaderData } from "react-router-dom";

const MyFoodRequest = () => {
    const foods = useLoaderData()
    return (
        <div>
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