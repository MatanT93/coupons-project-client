import { TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import "./UpdateCustomer.css";
import { Customer } from "../../../Models/Customer";

export function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Customer>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;

    useEffect(() => {
        adminService.getOneCustomer(id)
        .then(res => {
            setValue("email", res.email);
            setValue("firstName", res.firstName);
            setValue("lastName", res.lastName);
            setValue("password", res.password);
        })
        .catch(err => alert(err.response.data))
    }, [navigate]);

    function sendCustomer(newCustomer: Customer) {
        newCustomer.id = id;
        adminService.updateCustomer(newCustomer)
        .then(res => {
            alert("Customer updated");
            navigate("/admin");
        })
        .catch(err => alert(err.response.data));
    }

    return (
        <div className="UpdateCustomer">
			<h2>Update Customer</h2>
            <form noValidate onSubmit={handleSubmit(sendCustomer)} className="UpdateForm">
                <TextField placeholder="Email" {...register("email",{
                    required:{value:true, message:"Email is required!"}
                })}/><br/>
                {formState.errors?.email && <span className="error">{formState.errors.email.message}</span>}<br/>
                <TextField placeholder="First Name" {...register("firstName",{
                    required:{value:true, message:"First name is required!"}
                })}/><br/>
                {formState.errors?.firstName && <span className="error">{formState.errors.firstName.message}</span>}<br/>
                <TextField placeholder="Last Name" {...register("lastName",{
                    required:{value:true, message:"Last name is required!"}
                })}/><br/>
                {formState.errors?.lastName && <span className="error">{formState.errors.lastName.message}</span>}<br/>
                <TextField placeholder="Password" {...register("password",{
                    required:{value:true, message:"Password us required!"},
                })}/><br/>
                {formState.errors?.password && <span className="error">{formState.errors.password.message}</span>}<br/>
                <Button variant="contained" type="submit">Update Customer</Button>
            </form>
        </div>
    );
}
