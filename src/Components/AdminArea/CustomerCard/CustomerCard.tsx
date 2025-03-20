import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import "./CustomerCard.css";
import adminService from "../../../Services/AdminService";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";

interface CustomerProps{
    customer: Customer;
}

export function CustomerCard(props: CustomerProps): JSX.Element {
    const navigate = useNavigate();

    function handleDelete(event: React.MouseEvent<HTMLElement>) {
        const answer = window.confirm("Are you sure you want to delete customer " + props.customer.firstName + " ?")
        if(answer) {
            adminService.deleteCustomer(props.customer.id)
                    .then(res => {
                        alert("Customer " + props.customer.id + " succesfully deleted");
                        navigate("/admin");
                    })
                    .catch(err => alert("ERORR! " + err.response.data));
                    }
                }

    return (
        <Box key={props.customer.id}>
            <Card sx={{backgroundColor: '#29b6f6', maxWidth: 200, height: 'auto', m: 2, borderRadius: 2}} variant="elevation" key={props.customer.id}>
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h5" component="div">
                        Full Name :
                    </Typography>
                    <Typography variant="h6">
                        {props.customer.firstName + " " + props.customer.lastName}
                    </Typography>
                    <br/>
                    <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                        {"Email : " + props.customer.email}
                        <br/>
                    </Typography>
                    <CardActions>
                        <Button onClick={() => {
                            navigate("/admin/update/customer/" + props.customer.id)
                            console.log(props.customer.id);
                        }}
                        size="small">Update</Button>
                        <Button onClick={handleDelete} size="small">Delete</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>

    );
}
