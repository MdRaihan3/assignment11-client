import axios from "axios";
import { useEffect, useState } from "react";

const AvailableFoods = () => {
    const [jobs, setJobs] = useState([])
    const [sort, setSort] = useState('')

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
                <select onChange={(e) => setSort(e.target.value)} name="sort" id="sort" value={sort}>
                    <option value="">sort By DeadLine</option>
                    <option value="asc">Ascending Order</option>
                    <option value="dsc">Descending Order</option>
                </select>
            </div>
        </div>
    );
};

export default AvailableFoods;