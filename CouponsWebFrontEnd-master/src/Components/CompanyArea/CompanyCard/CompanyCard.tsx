import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Link } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyCard.css";
import { CompanyState } from "../../../Redux/CompanyState";

interface CompanyProps {
  company: CompanyModel;
}

function CompanyCard(props: CompanyProps): JSX.Element {
  const [company, setCompany] = useState<CompanyModel>(props.company);
  const navigate = useNavigate();

  function deleteCompany() {
    if (window.confirm("ARE YOU SURE?")) {
      AdminService.deleteCompany(props.company.id)
        .then(() => {
          setCompany(undefined); // Update the state to trigger re-render
          notificationService.success("DELETED!");
          window.location.reload();
          navigate("/AllCompanies");
        })
        .catch((err) => notificationService.error(err));
    }
  }

  function updateCompany() {
    navigate("/UpdateCompany/" + props.company.id);
  }

  if (!company) {
    // Company has been deleted, return null or appropriate component
    return null;
  }

  return (
    <div className="CompanyCard">
      <Card sx={{ maxWidth: 250 }}>
        <CardContent sx={{ maxHeight: 150 }}>
          <Typography gutterBottom variant="h6" component="div">
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Link className="fixed-place-left-bottom-button left-button" onClick={deleteCompany} color="inherit"
            component="button" underline="hover">DELETE</Link>
          <Link className="fixed-place-left-bottom-button left-button" onClick={updateCompany} color="inherit"
            component="button" underline="hover">EDIT</Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default CompanyCard;
