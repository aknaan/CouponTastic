import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyStore } from "../../../Redux/CompanyState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./AllCompanies.css";

function AllCompanies(): JSX.Element {
    
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const navigate = useNavigate()

    useEffect(()=>{
        adminService.getAllCompanies()
            .then( companies => setCompanies(companies))
            .catch( err => notificationService.error( err ));

        companyStore.subscribe(()=>{
            setCompanies(companyStore.getState().companies)
        });


    }, [])

    function addCompany(){
        navigate("/AddCompany")
    }

    function Home(){
        navigate("/Home")
    }
    
    return (
        <div className="AllCompanies">
            <span >{companyStore.getState().companies.length === 0 && <h4 >NO COMPANIES YET</h4>}</span>
			{companies != null && companies.map(company => <span className="Card" key={company.id}><CompanyCard company={company}/></span>)}
            <span className="bottom-left-button-block">
                <Link className="left-button" onClick={Home} color="inherit" component="button" underline="hover">BACK</Link>
                <Link className="left-button" onClick={addCompany} color="inherit" component="button" underline="hover">ADD COMPANY</Link> 
            </span>
            
        </div>
    );
}

export default AllCompanies;
