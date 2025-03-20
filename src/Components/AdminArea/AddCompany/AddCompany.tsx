import { useForm } from "react-hook-form";
import { Company } from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import "./AddCompany.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, FormControl, TextField } from "@mui/material";

export function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState, reset} = useForm<Company>();
    const navigate = useNavigate();
    let name = "";
    let email = "";
    let password = "";
    let company: Company = new Company(0, "", "", "", []);

    // function sendCompany(newCompany: Company) {
    //     adminService.AddCompany(newCompany)
    //     .then(res => {
    //         alert("Company added! The new id is: " + res.id);
    //         reset();
    //         navigate("/admin");
    //     })
    //     .catch(err => {
    //         console.log(err.response.data);
    //         alert(err.response.data);
    //         reset();
    //     });
    // }

    function handleName(event: React.ChangeEvent<HTMLInputElement>) {
        company.name = event.currentTarget.value;
        name = event.currentTarget.value;
    }

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
        company.email = event.currentTarget.value;
        email = event.currentTarget.value;
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        company.password = event.currentTarget.value;
        password = event.currentTarget.value;
    }

    function addCompany(event: React.FormEvent) {
        event.preventDefault(); // DO NOT RUN ORIGINAL FORM SUBMIT CODE!
        adminService.AddCompany(company)
            .then(res=> {
                alert("Company added! The new id is: " + res.id);
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
        <div className="AddCompany">
            {/* <br/>
			<h2>Add New Company</h2>
            <form noValidate onSubmit={handleSubmit(sendCompany)} className="AddForm">
                <input type="text" placeholder="Name" {...register("name")} /><br/>
                <input type="text" placeholder="Email" {...register("email")} /><br/>
                <input type="text" placeholder="Password" {...register("password")} /><br/>
                <button type="submit">Add Company</button>
            </form>
            <br/> */}
            <Card className="AddCompanyCard" sx={{ minWidth: 120 }} component="form" onSubmit={addCompany}>
                <title>Add Company</title>
                <h2>Add New Company</h2>
                <FormControl fullWidth>
                    <TextField label="Name" type="text" required onChange={handleName} /><br/>
                    <TextField label="Email" type="email" required onChange={handleEmail} /><br/>
                    <TextField label="Password" type="password" required onChange={handlePassword}/><br/>
                    <Button type="submit" variant="contained">Add Company</Button>
                </FormControl>
            </Card>
        </div>
    );
}
