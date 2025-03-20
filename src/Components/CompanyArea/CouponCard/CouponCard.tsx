import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import "./CouponCard.css";
import companyService from "../../../Services/CompanyService";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface CouponProps {
    coupon: Coupon;
}

export function CouponCard(props: CouponProps): JSX.Element {
    const navigate = useNavigate();

    function handleDelete(event: React.MouseEvent<HTMLElement>) {
        const answer = window.confirm("Are you sure you want to delete coupon " + props.coupon.title + " ?")
        if(answer) {
            companyService.deleteCoupon(props.coupon.id)
            .then(res => {
                    alert("Coupon " + props.coupon.title + " succesfully deleted");
                    navigate("/company");
            })
            .catch(err => alert("ERORR! " + err.response.data));
            }
    }

    return (
        <Box key={props.coupon.id} className="CouponCard">
            <Card sx={{backgroundColor: '#90caf9', maxWidth: 'auto', maxHeight: 'auto', m: 2, borderRadius: 2}} variant="elevation" key={props.coupon.id}>
                <CardContent sx={{ height: '100%' }}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
                        {"Title : " + props.coupon.title}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {"Price : " + props.coupon.price}<AttachMoneyIcon/>
                        <br/>
                        {"Amout : " + props.coupon.amount}
                        <br/>
                        {"Category : " + props.coupon.category.name}
                    </Typography>
                    <Typography variant="body2">
                        <br/>
                        {props.coupon.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                        <br/>
                        {"Start Date : " + props.coupon.startDate + " End Date : " + props.coupon.endDate}
                    </Typography>
                    <CardActions>
                        <Button onClick={() => navigate("/company/update/coupon/" + props.coupon.id)}
                        size="small">Update</Button>
                        <Button onClick={handleDelete} size="small">Delete</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    );
}
