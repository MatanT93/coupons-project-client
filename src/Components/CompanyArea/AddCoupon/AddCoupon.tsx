import { useForm } from "react-hook-form";
import { Coupon } from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import "./AddCoupon.css";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent, Select, MenuItem, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { Category } from "../../../Models/Category";
import { Company } from "../../../Models/Company";

export function AddCoupon(): JSX.Element {
    const {register, handleSubmit, formState, reset} = useForm<Coupon>();
    const [types, setTypes] = useState<Category[]>([]);
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>();

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string)
    }

    useEffect(() => {
        setTimeout(() => {
            companyService.getAllCategories()
            .then(res => setTypes(res))
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data)
            });
            companyService.getCompanyDetails()
            .then(res => setCompany(res))
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data)
            });
        }, 3000);
    }, [navigate]);

    function sendCoupon(newCoupon: Coupon) {
        let tempCat = types.find((t) => t.name === type);
        tempCat ? newCoupon.category = tempCat : newCoupon.category.name = type;
        newCoupon.company = company!;
        companyService.AddCoupon(newCoupon)
        .then(res => {
            alert("Coupon added! The new id is: " + res.id);
            reset();
            navigate("/company");
        })
        .catch(err => {
            if(err?.response?.data)
                alert(err.response.data);
            reset();
        });
    }

    return (
        <div className="AddCoupon">
			<br/>
			<h2>Add New Coupon</h2>
            <form noValidate onSubmit={handleSubmit(sendCoupon)} className="AddForm">
                <InputLabel id="CategoryTypeLabel">Category Type</InputLabel>
                <Select className="categoryBox" labelId = "CategoryTypeLabel" id="CategoryType" value={type} onChange={handleChange} fullWidth>
                        {types.length === 0 ? <span/> : types.map((t, index) => <MenuItem value={t.name} key={index}>{t.name}</MenuItem>)}
                </Select><br/>
                <input type="text" placeholder="Title" {...register("title")} /><br/>
                <input type="text" placeholder="Description" {...register("description")} /><br/>
                <input type="date" placeholder="Start Date" {...register("startDate")} /><br/>
                <input type="date" placeholder="End Date" {...register("endDate")} /><br/>
                <input type="number" placeholder="Amount" {...register("amount")} /><br/>
                <input type="text" placeholder="Price" {...register("price")} /><br/>
                <button type="submit">Add Coupon</button>
            </form>
            <br/>
        </div>
    );
}
