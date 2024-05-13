import axios from "axios";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const food = useLoaderData();
    const navigate = useNavigate();
    const { _id, food_name, food_image, quantity, location, expired_date, additional_notes } = food
    const [startDate, setStartDate] = useState(new Date(expired_date))


    const handleUpdate = async e => {
        e.preventDefault()
        const form = e.target;
        const food_name = form.food_name.value;
        const food_image = form.food_image.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const expired_date = startDate;
        const additional_notes = form.additional_notes.value;

        const foodData = { food_name, food_image, quantity, location, expired_date, additional_notes }

        try {
            const { data } = await axios.patch(`http://localhost:5000/update/${_id}`, foodData)
            navigate('/manage')
            Swal.fire({ icon: 'Success', text: 'Updated successfully' })
        } catch (err) { console.log(err) }
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 my-5">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Update Food</h1>
                    </div>
                    <form onSubmit={handleUpdate} className="card-body">
                        <div className=" grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Name</span>
                                </label>
                                <input type="text" name="food_name" defaultValue={food_name} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Image</span>
                                </label>
                                <input type="text" name="food_image" defaultValue={food_image} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Quantity</span>
                                </label>
                                <input type="quantity" name="quantity" defaultValue={quantity} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Pickup Location</span>
                                </label>
                                <input type="location" name="location" defaultValue={location} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Expired Date</span>
                                </label>
                                {/* <input type="date" name="expired_date" placeholder="Expired Date" className="input input-bordered" required /> */}
                                <ReactDatePicker className="pl-3 py-3 border rounded-md input-bordered 
                                 bg-transparent bg-opacity-10" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <input type="text" name="additional_notes"
                                    defaultValue={additional_notes} className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;