import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Company } from "../../../Models/Company";
import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";

interface CompanyProps{
    company: Company;
}

export function CompanyCard(props: CompanyProps): JSX.Element {
    const navigate = useNavigate();

    function handleDelete(event: React.MouseEvent<HTMLElement>) {
        const answer = window.confirm("Are you sure you want to delete company " + props.company.name + " ?")
        if(answer) {
            adminService.deleteCompany(props.company.id)
                    .then(res => {
                        alert("Company " + props.company.id + " succesfully deleted");
                        navigate("/admin");
                    })
                    .catch(err => alert("ERORR! " + err.response.data));
                }
            }

    return (
        <Box key={props.company.id}>
            <Card sx={{backgroundColor: '#90caf9', maxWidth: 200, maxHeight: 180, m: 2, borderRadius: 2}} variant="elevation" key={props.company.id}>
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h4" component="div">
                        {props.company.name}
                    </Typography>
                    <Typography variant="h6">
                        Contact us :
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                        {props.company.email}
                        <br/>
                    </Typography>
                    <CardActions>
                        <Button onClick={() => navigate("/admin/update/company/" + props.company.id)}
                        size="small">Update</Button>
                        <Button onClick={handleDelete} size="small">Delete</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    );
}
