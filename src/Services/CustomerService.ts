import axios from "axios";
import { Coupon } from "../Models/Coupon";

class CustomerService{
    async getAllCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/coupons")).data;
    }

    async getOwnedCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/owned/coupons")).data;
    }

    async purchaseCoupon(id: number) {
        return (await axios.post<Coupon>("http://localhost:8080/customer/add/purchase/" + id)).data;
    }
}

const customerSerice = new CustomerService();
export default customerSerice;