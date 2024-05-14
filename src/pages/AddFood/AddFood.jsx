import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../provides/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate()

    const handleAddFood = async e => {
        e.preventDefault()
        const form = e.target;
        const food_name = form.food_name.value;
        const food_image = form.food_image.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const expired_date = startDate;
        const additional_notes = form.additional_notes.value;
        const donor_name = user?.displayName;
        const donor_image = user?.photoURL;
        const donor_email = user?.email;
        const food_status = 'available'
        const foodData = {
            food_name, food_image, quantity, location, expired_date, additional_notes, food_status,
            donor: { donor_name, donor_image, donor_email }
        }
        console.log(foodData);
        try {
            const { data } = await axios.post('https://rf-ood-server.vercel.app/addFood', foodData)
            console.log(data);
            navigate('/')
            Swal.fire('success')
        } catch (err) { console.log(err) }
    }

    return (
        <div>
             <Helmet>
                <title> RFood | AddFood</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 my-5">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Add Food</h1>
                    </div>
                    <form onSubmit={handleAddFood} className="card-body">
                        <div className=" md:grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Name</span>
                                </label>
                                <input type="text" name="food_name" placeholder="Food Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Image</span>
                                </label>
                                <input type="text" name="food_image" placeholder="Food Image" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Quantity</span>
                                </label>
                                <input type="quantity" name="quantity" placeholder="Food Quantity" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Pickup Location</span>
                                </label>
                                <input type="location" name="location" placeholder="Pickup Location" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Expired Date</span>
                                </label>
                                {/* <input type="date" name="expired_date" placeholder="Expired Date" className="input input-bordered" required /> */}
                                <DatePicker className="pl-3 py-3 border rounded-md input-bordered 
                                 bg-transparent bg-opacity-10"  selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <input type="text" name="additional_notes"
                                    placeholder="Additional Notes" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donor Name</span>
                                </label>
                                <input type="text" name="donor_name"
                                    value={user?.displayName} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donor Image</span>
                                </label>
                                <input type="text" name="donor_image"
                                    value={user?.photoURL} className="input input-bordered" required  />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Donor Email</span>
                                </label>
                                <input type="text" name="donor_email"
                                    value={user?.email} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Food Status</span>
                                </label>
                                <input value={'available'} name="food_status"
                                    placeholder="Food Status" className="input input-bordered" required />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;