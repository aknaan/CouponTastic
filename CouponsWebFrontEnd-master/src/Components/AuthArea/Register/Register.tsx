import { useForm } from "react-hook-form";
import "./Register.css";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { error } from "console";
import CustomerModel from "../../../Models/CustomerModel";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthState, authStore } from "../../../Redux/AuthState";
import CustomerHome from "../../HomeArea/CustomerHome/CustomerHome";
import UserModel from "../../../Models/UserModel";
import CredentialsModel from "../../../Models/CredentialsModel";

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<CustomerModel>();
  const navigate = useNavigate();

  function send(customer: CustomerModel) {
    authService
      .register(customer)
      .then(() => {
        if (authStore.getState().user.type === "CUSTOMER") {
          notificationService.success(
            "Logged in as " +
              authStore.getState().user.firstName +
              " " +
              authStore.getState().user.lastName
          );
        }
        navigate("/Home");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="Register">
      <h2>Register as a new user:</h2>
      <form onSubmit={handleSubmit(send)}>
        <input type="text" placeholder="First Name" {...register("firstName")} /> <br />
        <input type="text" placeholder="Last Name" {...register("lastName")} /> <br />
        <input type="text" placeholder="Email" {...register("email")} /> <br />
        <input type="password" placeholder="Password" {...register("password")} /> <br />

        <button className="register-button">Add User</button>
      </form>
      <NavLink to={"/Home"}>BACK HOME</NavLink>
    </div>
  );
}

export default Register;
