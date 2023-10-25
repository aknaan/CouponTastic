import {useState, useEffect} from "react";
import {CouponModel} from "../../../Models/CouponModel";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerDetails.css";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";

function CustomerDetails(): JSX.Element {
    const [currentUser, setCustomer] = useState<CustomerModel>();
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>();
    const navigate = useNavigate();

    useEffect(() => {
        customerService
            .getCustomerDetails()
            .then((customer) => {
                setCustomer(customer);
                setCustomerCoupons(customer.coupons);
            })
            .catch((err) => notificationService.error(err));
    }, []);

    function goBackHome() {
        navigate("/home"); // Navigate to the /home route
    }

    return (
        <div className="CustomerDetails">
            <Card id={"companyDetailsCardContent"} sx={{minWidth: 275, maxWidth: 500}}>
                <CardContent>
                    <Typography variant={"h3"} color="text.secondary" gutterBottom>
                        {currentUser?.firstName + " " + currentUser?.lastName}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {currentUser?.email}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        ID:
                        {currentUser?.id}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Total Coupons: {currentUser?.coupons.length}
                    </Typography>
                </CardContent>
            </Card>
            <div>
                {customerCoupons &&
                    customerCoupons.map((c) => (
                        <span className="Card" key={c.id}>
                            <CouponCard key={c.id} coupon={c}/>
                          </span>
                    ))}
            </div>
            <div className="button-container">
                <button className="back-button" onClick={goBackHome}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default CustomerDetails;
