import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import "./CustomerCoupons.css";
import { Category } from "../../../Models/Category";
import customerSerice from "../../../Services/CustomerService";
import companyService from "../../../Services/CompanyService";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Slider, Checkbox, Grid2 } from "@mui/material";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { CustomerCouponCard } from "../CustomerCouponCard/CustomerCouponCard";

function valuetext(priceValue: number) {return `${priceValue}$`;}

const label = { inputProps: { 'aria-label': 'Price filter checkbox' } };

export function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [types, setTypes] = useState<Category[]>([]);
    const [value, setValue] = useState('all');
    const [filterActive, setFilterActive] = useState(false);
    const [priceValue, setPriceValue] = useState<number[]>([0, 100]);
    const [checked, setChecked] = useState(false);
    const [messageFlag, setMessageFlag] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            customerSerice.getOwnedCoupons()
            .then(res => {
                setCoupons(res);
                if(res.length === 0)
                    setMessageFlag(false);
            })
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data)
            });
            companyService.getAllCategories()
            .then(res => {
                setTypes(res);
            })
            .catch(err => {
                if(err?.response?.data)
                    alert(err.response.data)
            });
        }, 3000);
    }, [navigate])

    let max = Math.max(...coupons.map(c => c.price), 0);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue((event.target as HTMLInputElement).value);
        if((event.target as HTMLInputElement).value !== 'all')
            setFilterActive(true);
        else 
            setFilterActive(false);
      };
    
    const handleBarChange = (event: Event, newValue: number | number[]) => {
        setPriceValue(newValue as number[]);
        console.log(priceValue[0] + " " + priceValue[1])
    }

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    const updateMessage = messageFlag ?
    "Loading data from server..."
    : "No coupons found in db";


    const filteredCoupons = 
    filterActive || checked ?
    filterActive ?
    coupons.filter(coupon => coupon.category.name === value && coupon.price >= priceValue[0] && coupon.price <= priceValue[1])
    : coupons.filter(coupon => coupon.price >= priceValue[0] && coupon.price <= priceValue[1])
    : coupons;


    return (
        <div className="CustomerCoupons">
            <FormControl>
                <FormLabel id="category-filter">Categories</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="category-filter"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange} 
                    >
                    {types.map((t, index) => <FormControlLabel value={t.name} control={<Radio />} label={t.name} key={index}/>)}
                    <FormControlLabel value="all" control={<Radio />} label="Show All" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ width: 300 }}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={priceValue}
                    onChange={handleBarChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    step={5}
                    marks
                    min={0}
                    max={max}
                    disabled={checked ? false : true}
                />  
            
                <FormControlLabel control={
                    <Checkbox {...label} className="PriceSortCheck" aria-label="Price sort" checked={checked}
                     onChange={handleCheckBoxChange} icon={<PriceCheckIcon/>} checkedIcon={<PriceCheckIcon/>}/>} label="Price sort"
                />
            </Box>
            <h2>Owned coupon</h2>
            <Grid2 container spacing={2} sx={{ backgroundColor: "#e0e0e0" }} justifyContent={"space-evenly"}>
                {coupons.length === 0 
                ? <p>{updateMessage}</p> 
                : filteredCoupons.length === 0 
                ? <p>No coupons found with these filters...</p> 
                : filteredCoupons.map((c, index) => <CustomerCouponCard coupon={c} key={index}/>)}
            </Grid2>
        </div>
    );
}
