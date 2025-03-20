import { useForm } from "react-hook-form";
import { Company } from "../../../Models/Company";
import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import adminService from "../../../Services/AdminService";
import { Button, TextField } from "@mui/material";

export function UpdateCompany(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<Company>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;

    useEffect(() => {
        adminService.getOneCompany(id)
        .then(res => {
            setValue("email", res.email);
            setValue("password", res.password);
        })
        .catch(err => alert(err.response.data))
    }, []);

    function sendCompany(newCompany: Company) {
        newCompany.id = id;
        adminService.updateCompany(newCompany)
        .then(res => {
            alert("Company updated");
            navigate("/admin");
        })
        .catch(err => alert(err.response.data));
    }

    return (
        <div className="UpdateCompany">
			<h2>Update Company</h2>
            <form noValidate onSubmit={handleSubmit(sendCompany)} className="UpdateForm">
                <TextField placeholder="Email" {...register("email",{
                    required:{value:true, message:"Email is required!"}
                })}/><br/>
                {formState.errors?.email && <span className="error">{formState.errors.email.message}</span>}<br/>
                <TextField placeholder="Password" {...register("password",{
                    required:{value:true, message:"Password us required!"},
                })}/><br/>
                {formState.errors?.password && <span className="error">{formState.errors.password.message}</span>}<br/>
                <Button variant="contained" type="submit">Update Company</Button>
            </form>
        </div>
    );
}
