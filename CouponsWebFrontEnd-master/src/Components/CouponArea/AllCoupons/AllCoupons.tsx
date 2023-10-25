import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../Models/CouponModel";
import FilterModel from "../../../Models/FilterModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import "./AllCoupons.css";
import {couponStore} from "../../../Redux/CouponState";

function AllCoupons(): JSX.Element {
    const {register, handleSubmit} = useForm<FilterModel>();
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect( () =>{
        customerService.getCoupons()
        .then( c => setCoupons(c))
        .catch( err => notificationService.error(err));
       const unsubscribe = couponStore.subscribe(() => {
            customerService.getCoupons().then(c => setCoupons(c)).catch(err => notificationService.error(err));
        });

       return () => {
           setCoupons([]);
           unsubscribe();
       }
        }, []
    )

    // I created a Filter Model which gets its properties from the form in the page to join the two filters together and make a singel Filter function
    async function filter(filters : FilterModel){
        await customerService.getCoupons()
        .then( allCoupons => {
            // preformes filter on a fresh copy of coupons from the cach every time to negate the need to reset between filters
            let couponsToFilter = allCoupons
            if(filters.category !== "ALL"){
                couponsToFilter = couponsToFilter.filter(c => c.category === filters.category)}
            if(filters.maxPrice){
                couponsToFilter = couponsToFilter.filter(c => c.price <= filters.maxPrice)}
            setCoupons(couponsToFilter)
        })
        .catch( err => 
            {
                notificationService.error(err);
                console.log(err);
            });
    }
    

    
    return(
        <div>
            <form name="FILTERS" onSubmit={handleSubmit(filter)}> 
                <select {...register("category")}>
                    <option value="ALL" >ALL CATEGORIES</option>
                    <option value="SPORT">SPORT</option>
                    <option value="SHOWS">SHOWS</option>
                    <option value="KIDS">KIDS</option>
                    <option value="FOOD">FOOD</option>
                    <option value="SPA">SPA</option>
                    <option value="TOURISM">TOURISM</option>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="BEVERAGES">BEVERAGES</option>
                </select>
                <input type="number" placeholder="MAX PRICE"{...register("maxPrice")}/>
                <button className="button">FILTER</button>
            </form>
            {coupons.map(c => <span className="Card" key={c.id}><CouponCard key={c.id} coupon={c}/></span>)}
            <span >{coupons.length === 0 && <h4 >NO COUPONS</h4>}</span>
        </div>
    )
}

export default AllCoupons;