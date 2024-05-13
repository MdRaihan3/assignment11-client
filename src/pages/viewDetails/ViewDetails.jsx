import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provides/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const ViewDetails = () => {
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const food = useLoaderData();
    const navigate = useNavigate()
    const { _id, food_name, food_image, quantity, location, expired_date, additional_notes,
        donor } = food
    console.log(food);

    const handleAddFood = async e => {
        if (donor?.donor_email === user?.email) return (Swal.fire({
            icon: 'warning',
            text: 'You can not request'
        }))
        const form = e.target
        const notes = form.notes.value;
        const donation_amount = form.donation_amount.value;
        const food_id = _id;
        const food_status = 'requested'
        const requester_email = user?.email
        const {donor_name, donor_email, donor_image} = donor

        const requestData = {
            food_name, food_image, food_id, quantity, location, expired_date,
             additional_notes:notes, donation_amount, requester_email,
              food_status, donor: { donor_name, donor_image, donor_email }
        }
        try{const {data} = await axios.post('http://localhost:5000/requestAdd', requestData)
        console.log(data)
        navigate('/')
        Swal.fire({icon: 'success', text: 'Successfully requested'})
        } catch(err){console.log(err.response.data)
            e.target.reset()
        }
    }
        return (
            <div className=" text-lg my-8">
                <h1 className=" text-3xl text-blue-400 text-center">Food Details</h1>
                <hr />
                <div className=" text-center my-2">
                    <h1 className=" text-lg"><span className=" font-bold">Donor Name:</span> {donor?.donor_name}</h1>
                    <h1><span className=" font-bold">Pickup Location:</span> {location}</h1>
                </div>
                <div className=" md:grid grid-cols-2 gap-8">
                    <div>
                        <img className=" rounded-xl" src='https://i.ibb.co/4gF8bbn/food2.webp' alt="" />
                    </div>
                    <div>
                        <div><img className=" rounded-lg" src={food_image} alt="" /></div>
                        <p><span className=" font-bold">Food:</span> {food_name}</p>
                        <p><span className=" font-bold">Quantity:</span> {quantity}</p>
                        <p><span className=" font-bold">Expired Date:</span> {new Date(expired_date).toLocaleDateString()}</p>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary btn-outline my-3" onClick={() => document.getElementById('my_modal_1').showModal()}>Request</button>
                        <dialog id="my_modal_1" className="modal ">
                            <div className="modal-box">
                                <p className="py-1">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <div className="card shrink-0 w-full max-w-3xl shadow-2xl bg-base-100 my-5">
                                        <div className="text-center">
                                            <h1 className="text-5xl font-bold">Add Food</h1>
                                        </div>
                                        <form method="dialog" onSubmit={handleAddFood} className="card-body">
                                            <div className=" grid grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Food Name</span>
                                                    </label>
                                                    <input type="text" name="food_name" value={food_name} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Food Image</span>
                                                    </label>
                                                    <input type="text" name="food_image" value={food_image} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Food Id</span>
                                                    </label>
                                                    <input type="text" name="food_id" value={_id} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Pickup Location</span>
                                                    </label>
                                                    <input type="location" name="location" value={location} className="input input-bordered" required />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Additional Notes</span>
                                                    </label>
                                                    <input type="text" name="notes"
                                                        defaultValue={additional_notes} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Your Email</span>
                                                    </label>
                                                    <input type="email" name="user_email"
                                                        defaultValue={user?.email} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Donor Name</span>
                                                    </label>
                                                    <input type="text" name="donor_name"
                                                        value={donor?.donor_name} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Donor Email</span>
                                                    </label>
                                                    <input type="text" name="donor_email"
                                                        value={donor?.donor_email} className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Donation Amount</span>
                                                    </label>
                                                    <input type="text" name="donation_amount"
                                                        placeholder="Donation Amount" className="input input-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Expired Date</span>
                                                    </label>
                                                    <DatePicker className="input input-bordered" selected={startDate} />
                                                </div>
                                            </div>
                                            <div className="form-control mt-6">
                                                <button className="btn btn-secondary btn-outline">Request</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        );
    };

    export default ViewDetails;