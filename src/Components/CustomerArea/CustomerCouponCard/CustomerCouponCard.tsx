import { Coupon } from "../../../Models/Coupon";
import "./CustomerCouponCard.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface CouponProps {
    coupon: Coupon;
}

export function CustomerCouponCard(props: CouponProps): JSX.Element {

    return (
		<Box key={props.coupon.id} className="CustomerCouponCard">
            <Card variant="elevation" key={props.coupon.id}>
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
                </CardContent>
            </Card>
        </Box>
    );
}
