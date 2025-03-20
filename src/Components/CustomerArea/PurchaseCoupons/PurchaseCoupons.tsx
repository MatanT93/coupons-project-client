import { Box, Card, CardContent, Typography, CardActions, Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import "./PurchaseCoupons.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import customerSerice from "../../../Services/CustomerService";
import { useEffect, useState } from "react";

export function PurchaseCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            customerSerice.getAllCoupons()
            .then(res => {setCoupons(res);})
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data)
            });
        }, 3000);
    }, [navigate])


    function handlePurchase(coupon: Coupon) {
        const answer = window.confirm("Are you sure you want to buy coupon " + coupon.title + " ?")
        if(answer) {
            customerSerice.purchaseCoupon(coupon.id)
            .then(res => {
                alert("Coupon " + coupon.title + " succesfully purchased");
                navigate("/customer");
            })
            .catch(err => alert(err.response.data));
        }
    }

    return (
        <div className="PurchaseCoupons">
            <h2>Purchase coupons</h2>
            <br/>
            <Grid2 container spacing={2} sx={{ backgroundColor: "#e0e0e0" }} justifyContent={"space-evenly"}>
                {coupons.map((coupon, index) =>
                    <Box key={index} className="PurchaseCoupons">
                        <Card variant="elevation" key={coupon.id}>
                            <CardContent sx={{ height: '100%' }}>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
                                    {"Title : " + coupon.title}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    {"Price : " + coupon.price}<AttachMoneyIcon/>
                                    <br/>
                                    {"Amout : " + coupon.amount}
                                    <br/>
                                    {"Category : " + coupon.category.name}
                                </Typography>
                                <Typography variant="body2">
                                    <br/>
                                    {coupon.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                                    <br/>
                                    {"Start Date : " + coupon.startDate + " End Date : " + coupon.endDate}
                                </Typography>
                                <CardActions>
                                    <Button onClick={() => handlePurchase(coupon)} size="small">Purchase</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Grid2>
        </div>
    );
}
