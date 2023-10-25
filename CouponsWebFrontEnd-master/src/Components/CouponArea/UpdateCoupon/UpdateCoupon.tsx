import "./UpdateCoupon.css";
import { useForm } from "react-hook-form";
import { CouponModel } from "../../../Models/CouponModel";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { couponStore, updateCouponAction } from "../../../Redux/CouponState";

function UpdateCoupon(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<CouponModel>();
    const [coupon, setCoupon] = useState<CouponModel>();
    const navigate = useNavigate();
    const [base64mage, setImage] = useState<string>('');
    const id = +useParams().id!;

    useState(() => {
        companyService.getOneCoupon(id)
            .then(couponToUpdate => {
                console.log(couponToUpdate.image);
                setCoupon(couponToUpdate);
                setValue("title", couponToUpdate.title);
                setValue("description", couponToUpdate.description);
                setValue("category", couponToUpdate.category);
                setValue("amount", couponToUpdate.amount);
                setValue("startDate", couponToUpdate.startDate);
                setValue("endDate", couponToUpdate.endDate);
                setValue("price", couponToUpdate.price);
                setValue("image", couponToUpdate.image);
            })
            .catch(err => notificationService.error(err))
    });

    function send(coupon: CouponModel) {
        coupon.id = id;
        if (base64mage.length > 0)
            coupon.image = base64mage;
        couponStore.dispatch(updateCouponAction(coupon));
        companyService.updateCoupon(coupon)
            .then(() => {
                console.log(coupon);
                notificationService.success("COUPON UPDATED")
                navigate("/CompanyCoupons")
            })
            .catch(err => {
                    console.log(err);
                    notificationService.error(err)
                }
            )
    }

    function back() {
        navigate("/CompanyCoupons")
    }

    const toBase64 = (file: File) => new Promise<string | ArrayBuffer>((resolve, reject) => {
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

    return (
        <div className="CouponCardUpdate">
            <form onSubmit={handleSubmit(send)}>
                <label>Title: </label><br/>
                <input type="text" placeholder="title" {...register("title", {
                    required: {value: true, message: "you must enter a title"}
                })} /><br/>
                <span className="error">{formState.errors?.title?.message}</span><br/>

                <label>Amount: </label><br/>
                <input type="number" placeholder="amount" {...register("amount", {
                    required: {value: true, message: "you must enter an amount"},
                    min: {value: 1, message: "amount cant be negative"},
                    max: {value: 10000, message: "max amount is 10,000"}
                })} /><br/>
                <span className="error">{formState.errors?.amount?.message}</span><br/>
                <label>Category: </label><br/>
                <select placeholder="CATEGORY"{...register("category", {
                    required: {value: true, message: "you must enter an category"}
                })}>
                    <option value="SPORT">SPORT</option>
                    <option value="SHOWS">SHOWS</option>
                    <option value="KIDS">KIDS</option>
                    <option value="FOOD">FOOD</option>
                    <option value="SPA">SPA</option>
                    <option value="TOURISM">TOURISM</option>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="BEVERAGES">BEVERAGES</option>
                </select><br/>
                <span className="error">{formState.errors?.category?.message}</span><br/>
                <label>Description: </label><br/>
                <input type="text" placeholder="description" {...register("description", {
                    required: {value: true, message: "you must enter a description"}
                })} /><br/>
                <span className="error">{formState.errors?.description?.message}</span><br/>

                <label>Start Date:</label><br/>
                <input type="date" {...register("startDate", {
                    required: {value: true, message: "you must enter a start date"}
                })} /><br/>
                <span className="error">{formState.errors?.startDate?.message}</span><br/>

                <label>End Date:</label><br/>
                <input type="date" {...register("endDate", {
                    required: {value: true, message: "you must enter an end date"}
                })} /><br/>
                <span className="error">{formState.errors?.endDate?.message}</span><br/>

                <label>Price$: </label><br/>
                <input type="number" placeholder="PRICE"{...register("price", {
                    required: {value: true, message: "you must enter a price"},
                    min: {value: 1, message: "price can't be lower than 1"},
                    max: {value: 1000000, message: "price cant be higher than 1,000,000"}
                })} /><br/>
                <span className="error">{formState.errors?.price?.message}</span><br/>


                <div className="file-input-container">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="file-input"/>
                    <button className="file-input-button">Choose File</button>
                </div>
                <br/>
                <span className="error">{formState.errors?.image?.message}</span><br/>

                <div className={"submitChanges"}>
                    <button id={"saveButton"}>Save</button>
                </div>
            </form>
        </div>
    );
}


export default UpdateCoupon;
