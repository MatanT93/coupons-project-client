import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import "./UpdateCoupon.css";
import { TextField, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { Category } from "../../../Models/Category";
import { Company } from "../../../Models/Company";

export function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Coupon>();
    const [company, setCompany] = useState<Company>();
    const [types, setTypes] = useState<Category[]>([]);
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;


    const handleChange = (event: SelectChangeEvent) => {
            setType(event.target.value as string);
    };

    useEffect(() => {
        companyService.getAllCategories()
        .then(res => setTypes(res))
        .catch(err => alert(err.response.data))
    }, []);

    useEffect(() => {
        companyService.getOneCoupon(id)
        .then(res => {
            setCompany(res.company);
            setValue("category", res.category);
            setValue("title", res.title);
            setValue("description", res.description);
            setValue("startDate", res.startDate);
            setValue("endDate", res.endDate);
            setValue("amount", res.amount);
            setValue("price", res.price);
        })
        .catch(err => alert(err.response.data))
    }, [navigate, id]);

    function sendCoupon(newCoupon: Coupon) {
        newCoupon.id = id;
        newCoupon.company = company!;
        newCoupon.category = types.at(types.findIndex((cat) => cat.name === type))!;
        newCoupon.image = "";
        companyService.updateCoupon(newCoupon)
        .then(res => {
            alert("Coupon " + res.title + " updated");
            navigate("/company");
        })
        .catch(err => alert(err.response.data));
    }

    return (
        <div className="UpdateCoupon">
			<h2>Update Coupon</h2>
            <form noValidate onSubmit={handleSubmit(sendCoupon)} className="UpdateForm">
                <InputLabel id="CategoryTypeLabel">Category Type</InputLabel>
                <Select labelId = "CategoryTypeLabel" id="CategoryType" value={type} onChange={handleChange} fullWidth>
                    {types.length === 0 ? <MenuItem/> : types.map((t, index) => <MenuItem value={t.name} key={index}>{t.name}</MenuItem>)}
                </Select><br/>
                {formState.errors?.category && <span className="error">{formState.errors.category.message}</span>}<br/>
                <TextField label="Title" placeholder="Title" {...register("title",{
                    required:{value:true, message:"Title is required!"},
                })}/><br/>
                {formState.errors?.title && <span className="error">{formState.errors.title.message}</span>}<br/>
                <TextField label="Description" placeholder="Description" {...register("description",{
                    required:{value:true, message:"Description is required!"},
                })}/><br/>
                {formState.errors?.description && <span className="error">{formState.errors.description.message}</span>}<br/>
                <TextField label="Start Date" type="date" placeholder="Start Date" {...register("startDate",{
                    required:{value:true, message:"Start Date is required!"},
                })}/><br/>
                {formState.errors?.title && <span className="error">{formState.errors.title.message}</span>}<br/>
                <TextField label="End Date" type="date" placeholder="End Date" {...register("endDate",{
                    required:{value:true, message:"End Date is required!"},
                })}/><br/>
                {formState.errors?.endDate && <span className="error">{formState.errors.endDate.message}</span>}<br/>
                <TextField label="Amount" type="number" placeholder="Amount" {...register("amount",{
                    required:{value:true, message:"Amount is required!"},
                })}/><br/>
                {formState.errors?.amount && <span className="error">{formState.errors.amount.message}</span>}<br/>
                <TextField label="Price" placeholder="Price" {...register("price",{
                    required:{value:true, message:"Price is required!"},
                })}/><br/>
                {formState.errors?.price && <span className="error">{formState.errors.price.message}</span>}<br/>
                <Button variant="contained" type="submit">Update Coupon</Button>
            </form>
        </div>
    );
}
