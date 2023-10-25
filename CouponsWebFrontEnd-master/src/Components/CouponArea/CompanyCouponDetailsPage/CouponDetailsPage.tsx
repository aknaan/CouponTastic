import "./CouponDetailsPage.css";
import {Card, CardContent, Typography} from "@mui/material";
import {CouponModel} from "../../../Models/CouponModel";
import {useNavigate, useParams} from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import {couponStore, deleteCouponAction, fetchCouponsAction} from "../../../Redux/CouponState";
import React, { useEffect, useState } from "react";


function CouponDetailsPage(): JSX.Element {
    const id: number = +useParams().id;
    const navigate = useNavigate();
    const [coupon, setCoupons] = useState<CouponModel>();
    const [show, setShow] = useState(false);

    useEffect( ()=>{
        companyService.getOneCoupon(id)
        .then(coup=> setCoupons(coup))
        .catch(error=>notificationService.error(error)) 
        } , []);


    function back() {
        navigate("/CompanyCoupons");
    }

    function deleteCoupon() {
        if (window.confirm("ARE YOU SURE?")) {
            companyService.deleteCoupon(id)
                          .then(() => {
                            notificationService.success("DELETED!");
                            couponStore.dispatch(deleteCouponAction(id));
                            navigate("/CompanyCoupons");
                            window.location.reload();
                })
                          .catch((err) => notificationService.error(err));
        }

    }

    function edit() {
        navigate("/UpdateCoupon/" + id);
    }
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

    return (
        <div className="CouponDetailsPage">
            <Card className="CouponCardDesign">
                <CardContent className="details">
                    <Typography gutterBottom variant="h4" component="div">
                        {coupon?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {coupon?.description}
                    </Typography>
                    <Typography variant="body2">
                        PRICE: ${coupon?.price}
                    </Typography>
                    <Typography variant="body2">
                        CATEGORY: {coupon?.category}
                    </Typography>
                    <Typography variant="caption">
                        <>
                            End Date: {coupon?.endDate}
                        </>
                    </Typography>
                    <Typography id="detailImage" variant="body2">
                        {coupon?.image && <img src={coupon.image} alt={coupon.description}/>}
                    </Typography>
                    <div className={"buttonsContainer"}>
                        <div className={"deleteButtonCoupon"}>
                            <button id={"deleteCoupon"} onClick={deleteCoupon}>
                                Erase
                            </button>
                        </div>
                        <div className={"editButtonCoupon"}>
                            <button id={"editCoupon"} onClick={edit}>
                                Modifier
                            </button>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <div id={"backButton"}>
                <button onClick={back}>Back</button>
            </div>
        </div>
    );
}

export default CouponDetailsPage;
