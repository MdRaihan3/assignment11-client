import axios from "axios";
import {   useState } from "react";
import FoodCard from "./FoodCard";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const AvailableFoods = () => {
    // const [foods, setFoods] = useState([])
    const [sort, setSort] = useState('');
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState('')
    const [layout, setLayout] = useState(true)

    const {data: foods = [], isLoading} = useQuery({
        queryFn: ()=> getData(),
        queryKey: ['foods']
    })

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-foods?sort=${sort}&search=${search}`) 
        // setFoods(data)
        return data
    }

    // useEffect(() => {
    //     const getData = async () => {
    //         const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-foods?sort=${sort}&search=${search}`) 
    //         setFoods(data)
    //     }
    //     getData()
    // }, [sort, search])

    const handleSearch = e => {
        e.preventDefault()
        setSearch(searchText)
    }
    if(isLoading){return <span className="loading loading-spinner text-secondary"></span>}

    console.log(foods);
    return (
        <div>
             <Helmet>
                <title> RFood | AvailableFoods</title>
            </Helmet>
            <div className=" md:flex gap-5">
                <div>
                    <select className=" bg-white text-black rounded p-2" onChange={(e) => setSort(e.target.value)} name="sort" id="sort" value={sort}>
                        <option value="">sort By Expired Date</option>
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
                    foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;