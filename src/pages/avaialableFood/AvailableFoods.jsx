import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const AvailableFoods = () => {
    const [jobs, setJobs] = useState([])
    const [sort, setSort] = useState('');
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState('')
    const [layout, setLayout] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`http://localhost:5000/all-foods?sort=${sort}&search=${search}`)
            setJobs(data)
        }
        getData()
    }, [sort, search])

    const handleSearch = e => {
        e.preventDefault()
        setSearch(searchText)
    }

    console.log(jobs);
    return (
        <div>
            <div className=" flex gap-5">
                <div>
                    <select className=" bg-white text-black rounded p-2" onChange={(e) => setSort(e.target.value)} name="sort" id="sort" value={sort}>
                        <option value="">sort By DeadLine</option>
                        <option value="asc">Ascending Order</option>
                        <option value="dsc">Descending Order</option>
                    </select>
                </div>
                <div>
                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                name='search'
                                placeholder='Enter Food Name'
                                aria-label='Enter Food Name'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium text-gray-100 uppercase  bg-gray-700 rounded-md'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <button onClick={()=> setLayout(!layout)} className=" btn btn-secondary btn-outline">Change Layout</button>
                </div>
            </div>

            <div className={`md:grid ${layout ? 'grid-cols-3' : "grid-cols-2"}  gap-5 my-7`}>
                {
                    jobs.map(job => <FoodCard key={job._id} job={job}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;