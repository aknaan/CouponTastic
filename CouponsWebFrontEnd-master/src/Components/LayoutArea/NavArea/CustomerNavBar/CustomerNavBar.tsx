import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./CustomerNavBar.css";

function CustomerNavBar(): JSX.Element {

    const navigate = useNavigate();

    function AllCoupons() {
        navigate("AllCoupons")
    }

    function goToHome() {
        navigate("/home"); // Navigate to the /home route
    }

    return (
        <div className="CustomerNavBar">
            <Link className="left-button" onClick={goToHome} color="inherit" component="button"
                  underline="hover">HOME</Link>

            <Link className="left-button" onClick={AllCoupons} color="inherit" component="button"
                  underline="hover">COUPONS</Link>
        </div>
    );
}

export default CustomerNavBar;
