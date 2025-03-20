import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import "./AddCustomer.css";
import { Customer } from "../../../Models/Customer";
import { Button, Card, FormControl, TextField } from "@mui/material";

export function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState, reset} = useForm<Customer>();
    const navigate = useNavigate();
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let customer: Customer = new Customer(0, "", "", "", "", []);

    // function sendCustomer(newCustomer: Customer) {
    //     adminService.AddCustomer(newCustomer)
    //     .then(res => {
    //         alert("Customer added! The new id is: " + res.id);
    //         reset();
    //         navigate("/admin");
    //     })
    //     .catch(err => {
    //         console.log(err.response.data);
    //         alert(err.response.data);
    //         reset();
    //     });
    // }

    function handleFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        customer.firstName = event.currentTarget.value;
        firstName = event.currentTarget.value;
    }

    function handleLastName(event: React.ChangeEvent<HTMLInputElement>) {
        customer.lastName = event.currentTarget.value;
        lastName = event.currentTarget.value;
    }

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        customer.email = event.currentTarget.value;
        email = event.currentTarget.value;
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        customer.password = event.currentTarget.value;
        password = event.currentTarget.value;
    }

    function addCustomer(event: React.FormEvent) {
        event.preventDefault(); // DO NOT RUN ORIGINAL FORM SUBMIT CODE!
        adminService.AddCustomer(customer)
            .then(res=> {
                alert("Customer added! The new id is: " + res.id);
                reset();
                navigate("/admin");
            })
            .catch(err=> {
                alert("ERROR! " + err.response.data);
                navigate("/");
            }
            );
        const formElement = event.target as HTMLFormElement;
        if (formElement && typeof formElement.reset === 'function') {
            formElement.reset();
        }
    }

    return (
        <div className="AddCustomer">
            {/* <br/>
			<h2>Add New Customer</h2>
            <form noValidate onSubmit={handleSubmit(sendCustomer)} className="AddForm">
                <input type="text" placeholder="First Name" {...register("firstName")} /><br/>
                <input type="text" placeholder="Last Name" {...register("lastName")} /><br/>
                <input type="text" placeholder="Email" {...register("email")} /><br/>
                <input type="text" placeholder="Password" {...register("password")} /><br/>
                <button type="submit">Add Customer</button>
            </form>
            <br/> */}
            <Card className="AddCustomerCard" sx={{ minWidth: 120 }} component="form" onSubmit={addCustomer}>
                <title>Add Customer</title>
                <h2>Add New Customer</h2>
                <FormControl fullWidth>
                    <TextField label="First Name" type="text" required onChange={handleFirstName} /><br/>
                    <TextField label="Last Name" type="text" required onChange={handleLastName} /><br/>
                    <TextField label="Email" type="email" required onChange={handleEmail} /><br/>
                    <TextField label="Password" type="password" required onChange={handlePassword}/><br/>
                    <Button type="submit" variant="contained">Add Customer</Button>
                </FormControl>
            </Card>
        </div>
    );
}
