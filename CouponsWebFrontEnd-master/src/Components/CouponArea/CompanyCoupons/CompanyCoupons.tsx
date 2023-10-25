import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import FilterModel from "../../../Models/FilterModel";
import { couponStore, fetchCouponsAction } from "../../../Redux/CouponState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {

    const [couponsArray, setCoupons] = useState<CouponModel[]>([]);
    const {register, handleSubmit} = useForm<FilterModel>();
    const navigate = useNavigate();


    useEffect(() => {
      const delay= 200;
      const timeoutId= setTimeout(()=>{
        companyService
        .getCompanyCoupons()
        .then((couponsup) => setCoupons(couponsup))
        .catch((err) => notificationService.error(err));
      },delay)
      
      return()=>{
        clearTimeout(timeoutId);
      };
    },[])
      
 

    // I created a Filter Model which gets its properties from the form in the page to join the two filters together and make a singel Filter function
    async function filter(filters: FilterModel) {
        try {
          const allCoupons = couponStore.getState().coupons;
          let couponsToFilter = [... allCoupons];
      
          if (filters.category !== "ALL") {
            couponsToFilter = couponsToFilter.filter(
              (coupon) => coupon.category === filters.category
            );
          }
          if (filters.maxPrice) {
            couponsToFilter = couponsToFilter.filter(
              (coupon) => coupon.price <= filters.maxPrice
            );
          }
      
          setCoupons(couponsToFilter);
        } catch (err) {
          notificationService.error(err);
          console.log(err);
        }
      }
      

    function AddCoupon(){
        navigate("/AddCoupon")
    }

    function back(){
        navigate("/Home")
    }

    return (
        <div className="CompanyCoupons">
            <form name="FILTERS" onSubmit={handleSubmit(filter)}> 
                <select className={"selectCategories"}{...register("category")}>
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
                <input className={"maxPrice"} type="number" placeholder="MAX PRICE"{...register("maxPrice")}/>
                <button className="button">FILTER</button>
            </form>
			{couponsArray.map(c => 
            <span className="Card" key={c.id}><CouponCard coupon={c} key={c.id}/></span>)}
            <span >{couponsArray.length === 0 && <h4 >NO COUPONS</h4>}</span>
            <div className="bottom-left-button">
      <button onClick={back}>BACK</button>
      <button onClick={AddCoupon}>ADD COUPON</button>
    </div>
        </div>
        );
}

export default CompanyCoupons;
