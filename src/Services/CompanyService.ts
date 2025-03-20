import axios from "axios";
import { Coupon } from "../Models/Coupon";
import { Category } from "../Models/Category";
import { Company } from "../Models/Company";

class CompanyService {
    async getAllCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/company/coupons")).data;
    }

    async deleteCoupon(id: number) {
        return (await axios.delete("http://localhost:8080/company/delete/coupon/" + id));
    }

    async getOneCoupon(id: number) {
        return (await axios.get<Coupon>("http://localhost:8080/company/coupon/" + id)).data;
    }

    async updateCoupon(coupon: Coupon) {
        return (await axios.put<Coupon>("http://localhost:8080/company/update/coupon", coupon)).data;
    }

    async AddCoupon(coupon: Coupon) {
         return (await axios.post<Coupon>("http://localhost:8080/company/add/coupon", coupon)).data;
    }

    async getAllCategories() {
        return (await axios.get<Category[]>("http://localhost:8080/company/categories")).data;
    }

    async getCompanyDetails() {
        return (await axios.get<Company>("http://localhost:8080/company/detail")).data;
    }

}

const companyService = new CompanyService();
export default companyService;