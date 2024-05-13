import { Link } from "react-router-dom";

const ManageFoodCard = ({ food }) => {
    const {_id, food_name, quantity, expired_date } = food;
console.log(_id);
    return (
        <tr>
            <td>{food_name}</td>
            <td>{quantity}</td>
            <td>{new Date(expired_date).toLocaleDateString()}</td>
            <td><Link to={`/update/${_id}`}><button className=" btn btn-primary btn-outline">Update</button></Link></td>
            <td><button className=" btn btn-primary btn-outline">Delete</button></td>
        </tr>
    );
};

export default ManageFoodCard;