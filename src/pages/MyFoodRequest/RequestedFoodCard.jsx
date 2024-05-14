
const RequestedFoodCard = ({ food }) => {
    const { _id, food_name, food_image, quantity, location, expired_date, request_date, donation_amount, additional_notes, donor } = food

    // <td>{food?.food_name}</td>
    // <td>{food?.location}</td>
    // <td>{new Date(food?.expired_date).toLocaleDateString()}</td>
    // <td>{new Date(food?.request_date).toLocaleDateString()}</td>
    // <td>{food?.donation_amount}$</td>

    return (
        <div className=" border p-3 rounded-lg space-y-2">
            <div>
                <h1><span className=" font-bold">Food Name: </span> {food_name}</h1>
                <img className=" w-full h-40 p-2 rounded-xl" src={food_image} alt="" />
            </div>
            <div>
                <div className="flex gap-4">
                    <img className=" h-8 w-8 rounded-full" src={donor?.donor_image} alt="" />
                    <h3><span className=" font-bold">Donor: </span> {donor?.donor_name}</h3>
                </div>
                <p><span className=" font-bold">Food Quantity:</span> {quantity}</p>
                <p><span className=" font-bold">Pickup Location:</span> {location}</p>
                <p><span className=" font-bold">Expired Date:</span> {new Date(expired_date).toLocaleDateString()}</p>
                <p><span className=" font-bold">Request Date:</span> {new Date(request_date).toLocaleDateString()}</p>
                <p><span className=" font-bold">Donation Amount:</span> {donation_amount} $</p>
            </div>
        </div>
    );
};

export default RequestedFoodCard;