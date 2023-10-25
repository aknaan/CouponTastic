import { Link, Card, CardContent, Typography, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerCard.css";
import { useState } from "react";

interface CustomerProps {
  customer: CustomerModel;
}

function CustomerCard(props: CustomerProps): JSX.Element {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  function deleteCustomer() {
    if (window.confirm("ARE YOU SURE?")) {
      setIsDeleting(true);

      const customerId = props.customer.id;
      const customerName = props.customer.firstName + " " + props.customer.lastName;

      adminService
        .deleteCustomer(customerId)
        .then(() => {
          notificationService.success(customerName + " DELETED!");
        })
        .catch((err) => {
          notificationService.error(err);
          setIsDeleting(false);
        });
    }
  }

  function updateCustomer() {
    navigate("/UpdateCustomer/" + props.customer.id);
  }

  if (isDeleting) {
    return null; // Remove the customer card from rendering
  }

  return (
    <div className="CustomerCard">
      <Card sx={{ maxWidth: 250 }}>
        <CardContent sx={{ maxHeight: 150 }}>
          <Typography gutterBottom variant="h6" component="div">
            {props.customer.firstName + " " + props.customer.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.customer.email}
          </Typography>
        </CardContent>
        <CardActions className="bottom-right-button-block">
          <Link
            className="right-button"
            color="inherit"
            onClick={deleteCustomer}
            component="button"
            underline="hover"
          >
            DELETE
          </Link>
          <Link
            className="right-button"
            color="inherit"
            onClick={updateCustomer}
            component="button"
            underline="hover"
          >
            EDIT
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default CustomerCard;
