import { Link } from "react-router-dom";

const FoodCard = ({ job }) => {
    const { _id, food_name, food_image, quantity, location, expired_date,
        additional_notes, donor } = job || {}
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
                <p title={additional_notes}><span className=" font-bold">Additional Notes:</span>
                    {additional_notes.slice(0, 30)}</p>
            </div>
            <Link to={`/viewDetails/${_id}`}><button className=" btn btn-secondary btn-outline">View Details</button></Link>
        </div>
    );
};

export default FoodCard;