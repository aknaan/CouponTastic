import { useState, useEffect } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import "./CompanyDetails.css";
import {Card, CardActions, CardContent, Typography} from "@mui/material";


function CompanyDetails(): JSX.Element {

    const [currentCompany, setCompany] = useState<CompanyModel>()
    const [companyCoupons, setCompanyCoupons] = useState<CouponModel[]>()

    useEffect(()=>{
        companyService.getCompanyDetails()
        .then( company => {
            setCompany(company);
            setCompanyCoupons(company.coupons);
        })
        .catch( err => notificationService.error( err ))
    }, [])
    
    // @ts-ignore
    return (
        <div className="CompanyDetails">
            <Card id={"companyDetailsCardContent"} sx={{ minWidth: 275, maxWidth: 500 }}>
                <CardContent >
                    <Typography variant={"h3"} color="text.secondary" gutterBottom>
                        {currentCompany?.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {currentCompany?.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ID:
                        {currentCompany?.id}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                       Total Coupons: {currentCompany?.coupons.length}
                    </Typography>
                </CardContent>
                {/*<CardActions>*/}
                {/*    { companyCoupons && companyCoupons.map(c => <span className="Card" key={c.id}><CouponCard key={c.id} coupon={c} /></span>)}*/}
                {/*</CardActions>*/}
            </Card>
            {/*<div>*/}
            {/*    {currentCompany != null && <div>*/}
            {/*    <h3 className="name">{"NAME: " + currentCompany.name}</h3>*/}
            {/*    <h4 className="email">{"EMAIL: " + currentCompany.email}</h4>*/}
                {companyCoupons && companyCoupons.map(c => <span className="Card" key={c.id}><CouponCard key={c.id} coupon={c} /></span>)}
            {/*        </div>}*/}
            {/*</div>*/}
			
        </div>
    );
}

export default CompanyDetails;
