import { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import FoodSection from "../foodSection/FoodSection";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios('http://localhost:5000/all')
            setFoods(data)
        }
        getData()
    }, [])
    console.log(foods);

    return (
        <div>
            <Banner></Banner>
            <div className=" my-10">
                <h1 className=" my-3 font-bold text-3xl text-center">Featured Foods</h1>
                <div className=" md:grid grid-cols-3 gap-5">
                    {
                        foods.slice(0, 6).map(food => <FoodSection key={food?._id} food={food}></FoodSection>)
                    }
                </div>
                <div className=" flex justify-center">
                    <Link to='/availableFoods'>
                        <button className=" btn btn-primary btn-outline my-3">Show All</button></Link>
                </div>

            </div>
            <div className=" my-12 ">
                <h1 className=" my-3 font-bold text-3xl text-center">About Us</h1>
                <div className=" md:grid grid-cols-2 gap-8">
                    <div><img className=" h-52 w-full rounded-3xl p-2" src={'https://i.ibb.co/ggydLch/about-us.webp'} alt="" /></div>
                    <div className=" text-lg">
                        <p>RFood is an online platform connecting organizations with surplus food to communities in need by moving donations of any type and size, large or small, bulk or retail, prepared or frozen!  Some of the food we have recovered includes: </p>
                        <ul className=" list-disc ml-8">
                            <li>50 semi-trucks of watermelon</li>
                            <li>1,000 pounds of tomatoes from a farm </li>
                            <li>60 dinners from a restaurant </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className=" my-12">
                <h1 className=" my-3 font-bold text-3xl text-center">Our Mission</h1>
                <div className=" md:grid grid-cols-3 gap-5">
                    <div className=" col-span-1 p-2 border-2 rounded-lg"><span className=" font-bold"> Fighting Food Insecurity:</span> We refuse to accept that anyone should go to bed hungry. Through our tireless efforts, we recover surplus food from restaurants, grocery stores, and events, redirecting it to those who need it most.
                    </div>
                    <div className=" col-span-1 p-2 border-2 rounded-lg"><span className=" font-bold">Reducing Waste:</span> Food waste is not just a moral issue; it is an environmental one too. By intercepting perfectly good food that would otherwise end up in landfills, we are reducing our ecological footprint and paving the way for a more sustainable future.</div>
                    <div className=" col-span-1 p-2 border-2 rounded-lg"><span className=" font-bold">Building Communities:</span> Our work isn not just about providing meals; it is about fostering connections and building stronger, more resilient communities. From local shelters to neighborhood pantries, we are strengthening the fabric of society one meal at a time.</div>
                </div>
            </div>
        </div>
    );
};

export default Home;