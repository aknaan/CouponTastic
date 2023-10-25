import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CompanyNavBar.css";

function CompanyNavBar(): JSX.Element {

    const navigate = useNavigate();

    function CompanyCoupons(){
        navigate("/CompanyCoupons")
    }

    function goToHome() {
        navigate("/home"); // Navigate to the /home route
    }
    return (
        <div className="CompanyNavBar">
            <Link className="left-button" onClick={goToHome} color="inherit" component="button" underline="hover">HOME</Link>
            <Link className="left-button" onClick={CompanyCoupons} color="inherit" component="button" underline="hover">COUPONS</Link>
        </div>

    );
}

export default CompanyNavBar;
