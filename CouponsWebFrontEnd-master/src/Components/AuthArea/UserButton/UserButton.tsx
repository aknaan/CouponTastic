import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import "./UserButton.css";

interface UserProps {
  user: UserModel;
}

function UserButton(props: UserProps): JSX.Element {
  const navigate = useNavigate();

  function goToCompany() {
    navigate("/CompanyDetails"); // Navigate to the /company-details route
  }

  function goToCustomer() {
    navigate("/CustomerDetails"); // Navigate to the /customer-details route
  }



  return (
    <div className="UserButton">
      {props.user && (
        <span>
          {props.user.type === "COMPANY" && (<Link onClick={goToCompany} color="inherit" component="button"
              underline="hover"> {props.user.name} </Link> )}
          {props.user.type === "CUSTOMER" && (<Link onClick={goToCustomer} color="inherit" component="button"
           underline="hover"> {props.user.firstName + " " + props.user.lastName} </Link>)}
        </span>
      )}
    </div>
  );
}

export default UserButton;
