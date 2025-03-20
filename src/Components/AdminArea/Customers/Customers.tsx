import { useNavigate } from "react-router-dom";
import "./Customers.css";
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import { Customer } from "../../../Models/Customer";
import { Grid2 } from "@mui/material";
import { CustomerCard } from "../CustomerCard/CustomerCard";

export function Customers(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const [messageFlag, setMessageFlag] = useState(true);


    useEffect(()=> {
        setTimeout(() => {
            adminService.getAllCustomers()
            .then(res => {
                setCustomers(res);
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
    : "No customers found in db";


    return (
        <div className="Customers">
            <h2>Customers : </h2>
            <br/>
			<Grid2 container spacing={2} sx={{ backgroundColor: "#0288d1" }} justifyContent={"space-evenly"}>
                {customers.length === 0 ? <p>{updateMessage}</p> : customers.map((c, index) => <CustomerCard customer={c} key={index}/>)} 
            </Grid2>
        </div>
    );
}
