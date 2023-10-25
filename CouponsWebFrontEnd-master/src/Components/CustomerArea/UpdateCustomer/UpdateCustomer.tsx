import {Link} from "@mui/material";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
    const [customer, setCustomer] = useState<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;

    useEffect(() => {
        adminService
            .getOneCustomer(id)
            .then((customer) => {
                setCustomer(customer);
                setValue("firstName", customer.firstName);
                setValue("lastName", customer.lastName);
                setValue("email", customer.email);
                setValue("password", customer.password);
            })
            .catch((err) => notificationService.error(err));
    }, []);

    function send(customer: CustomerModel) {
        customer.id = id;
        customer.email = customer.email.toLowerCase();
        adminService
            .updateCustomer(customer)
            .then(() => {
                notificationService.success(customer.firstName + " UPDATED");
                navigate("/AllCustomers");
            })
            .catch((err) => notificationService.error(err));
    }

    function allCustomers() {
        navigate("/AllCustomers");
    }

    return (
        <div className="UpdateCustomer">
            <form className="form" onSubmit={handleSubmit(send)}>
                <h3 className="label">{customer !== undefined && customer.firstName + " " + customer.lastName}</h3>
                <label>FIRST NAME</label>
                <br/>
                <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                        required: {value: true, message: "YOU MUST ENTER A FIRST NAME"},
                        minLength: {value: 3, message: "NAME MUST BE LONGER THAN 3 LETTERS"},
                        maxLength: {value: 15, message: "NAME CANNOT BE LONGER THAN 15 LETTERS"},
                    })}
                />
                <br/>
                <span className="error">{formState.errors?.firstName?.message}</span>
                <br/>

                <label>LAST NAME</label>
                <br/>
                <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                        required: {value: true, message: "YOU MUST ENTER A LAST NAME"},
                        minLength: {value: 3, message: "NAME MUST BE LONGER THAN 3 LETTERS"},
                        maxLength: {value: 15, message: "NAME CANNOT BE LONGER THAN 15 LETTERS"},
                    })}
                />
                <br/>
                <span className="error">{formState.errors?.lastName?.message}</span>
                <br/>

                <label>EMAIL</label>
                <br/>
                <input
                    type="text"
                    id="email"
                    {...register("email", {
                        required: {value: true, message: "YOU MUST ENTER AN EMAIL"},
                    })}
                />
                <br/>
                <span className="error">{formState.errors?.email?.message}</span>
                <br/>

                <label>PASSWORD</label>
                <br/>
                <input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: {value: true, message: "YOU MUST ENTER A PASSWORD"},
                        minLength: {value: 4, message: "PASSWORD MUST BE LONGER THAN 4 CHARACTERS"},
                        maxLength: {value: 18, message: "PASSWORD CANNOT BE LONGER THAN 18 LETTERS"},
                    })}
                />
                <br/>
                <span className="error">{formState.errors?.password?.message}</span>
                <br/>

                <div className="buttons-area">

                    <button className="done-button" type="submit">
                        DONE
                    </button>
                </div>
            </form>
            <span className="bottom-left-button-block">
        <Link
            className="left-button"
            onClick={allCustomers}
            component="button"
            color="inherit"
            underline="hover"
        >
          BACK
        </Link>
      </span>
        </div>
    );
}

export default UpdateCustomer;