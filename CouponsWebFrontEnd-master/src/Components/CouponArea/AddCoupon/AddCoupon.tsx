import { CouponModel } from "../../../Models/CouponModel";
import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import companyService from "../../../Services/CompanyService";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { rejects } from "assert";
import notificationService from "../../../Services/NotificationService";
import {addCouponAction, couponStore} from "../../../Redux/CouponState";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const [base64mage, setImage] = useState<string>('');
    const {register, handleSubmit, formState} = useForm<CouponModel>();

   
    const toBase64 = (file: File) => new Promise<string|ArrayBuffer>((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleFileChange = (event: any) => {
        toBase64(event.target.files[0]).then(base64 => {
            setImage(base64 as string);
        });
    }

    function back(){
        navigate("/CompanyCoupons")
    }

     function send(coupon: CouponModel) {
            coupon.image = base64mage;
             companyService.addCoupon(coupon).then(newCoupon => {
            notificationService.success("product added");
             navigate("/CompanyCoupons")})
             .catch(err =>{
               notificationService.error(err);
             });
            
        
    }

    // <button className="file-input-button">Choose File</button></div><br/>
    //                     <span className="error">{formState.errors?.image?.message}</span><br/>
    //                     <button>SAVE</button>

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(send)} className="form"><br />
                <input type="text" placeholder="title" {...register ( "title", {
                    required: {value : true, message : "you must enter a title"}})} /><br/>
                    <span className="error">{formState.errors?.title?.message}</span><br/>
                <input type="number" placeholder="amount" {...register ( "amount", {
                    required: {value : true, message : "you must enter an amount"},
                    min : {value : 1, message : "amount cant be negative"},
                    max : {value : 10000, message : "max amount is 10,000"}})} /><br/>
                <span className="error">{formState.errors?.amount?.message}</span><br/>
                <select placeholder="CATEGORY"{...register("category", {
                    required: {value : true, message : "you must enter an category"}})}>
                    <option value="SPORT">SPORT</option>
                    <option value="SHOWS">SHOWS</option>
                    <option value="KIDS">KIDS</option>
                    <option value="FOOD">FOOD</option>
                    <option value="SPA">SPA</option>
                    <option value="TOURISM">TOURISM</option>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="BEVERAGES">BEVERAGES</option>
                </select><br />
                <span className="error">{formState.errors?.category?.message}</span><br/>
                <input type="text" placeholder="description" {...register ( "description", {
                    required: {value : true, message : "you must enter a description"}})} /><br/>
                <span className="error">{formState.errors?.description?.message}</span><br/>

                <label >Start Date:</label><br/>
                <input type="date" {...register ( "startDate", {
                    required: {value : true, message : "you must enter a start date"}})} /><br/>
                    <span className="error">{formState.errors?.startDate?.message}</span><br/>
                <label >End Date:</label><br/>
                <input type="date" {...register ( "endDate", {
                    required: {value : true, message : "you must enter an end date"}})} /><br/>
                    <span className="error">{formState.errors?.endDate?.message}</span><br/>

                <input type="number" placeholder="PRICE"{...register ( "price", {
                    required: {value : true, message : "you must enter a price"},
                    min : {value: 1, message : "price can't be lower than 1"},
                    max : {value : 1000000, message : "price cant be higher than 1,000,000"}})} /><br/>
                    <span className="error">{formState.errors?.price?.message}</span><br/>
                    <div className="file-input-container">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="file-input"/>
                    <button className="file-input-button">Choose File</button></div><br/>
                    <span className="error">{formState.errors?.image?.message}</span><br/>
                    <button>ADD</button>
            </form>
            <Link className="left-button" color="inherit" onClick={back} component="button" underline="hover">BACK</Link>
        </div>
    );
}

export default AddCoupon;