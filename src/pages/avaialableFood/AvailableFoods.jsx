import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const AvailableFoods = () => {
    const [jobs, setJobs] = useState([])
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`http://localhost:5000/all-foods?sort=${sort}`)
            setJobs(data)
        }
        getData()
    }, [sort])
    console.log(jobs);
    return (
        <div>
            <div>
                <select className=" bg-white text-black rounded p-2" onChange={(e) => setSort(e.target.value)} name="sort" id="sort" value={sort}>
                    <option value="">sort By DeadLine</option>
                    <option value="asc">Ascending Order</option>
                    <option value="dsc">Descending Order</option>
                </select>
            </div>
            <div className=" md:grid grid-cols-3 gap-5 my-7">
                {
                    jobs.map(job => <FoodCard key={job._id} job={job}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;