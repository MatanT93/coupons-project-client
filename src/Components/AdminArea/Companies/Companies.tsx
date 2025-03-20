import { useEffect, useState } from "react";
import "./Companies.css";
import { Company } from "../../../Models/Company";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import { Grid2 } from "@mui/material";
import { CompanyCard } from "../CompanyCard/CompanyCard";

export function Companies(): JSX.Element {
    const [companies, setCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();
    const [messageFlag, setMessageFlag] = useState(true);

    useEffect(()=> {
        setTimeout(() => {
            adminService.getAllCompanies()
            .then(res => {
                setCompanies(res);
                if(res.length === 0)
                    setMessageFlag(false);
            })
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data);
            });
            }, 3000);
    }, [navigate]);

    const updateMessage = messageFlag ?
    "Loading data from server..."
    : "No companies found in db";


    return (
        <div className="Companies">
            <h2>Companies : </h2>
            <br/>
            <Grid2 container spacing={2} sx={{ backgroundColor: "#42a5f5" }} justifyContent={"space-evenly"}>
                {companies.length === 0 ? <p>{updateMessage}</p> : companies.map((c, index) => <CompanyCard company={c} key={index}/>)} 
            </Grid2>
        </div>
    );
}
