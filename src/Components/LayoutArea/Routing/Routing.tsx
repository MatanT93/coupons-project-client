import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import { AdminLayout } from "../../AdminArea/AdminLayout/AdminLayout";
import { UpdateCompany } from "../../AdminArea/UpdateCompany/UpdateCompany";
import { UpdateCustomer } from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import { CompanyLayout } from "../../CompanyArea/CompanyLayout/CompanyLayout";
import { UpdateCoupon } from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import { AboutUs } from "../AboutUs/AboutUs";
import { CustomerLayout } from "../../CustomerArea/CustomerLayout/CustomerLayout";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" Component={Login}/>
                <Route path="/admin" Component={AdminLayout}/>
                <Route path="/admin/update/company/:id" Component={UpdateCompany}/>
                <Route path="/admin/update/customer/:id" Component={UpdateCustomer}/>
                <Route path="/company" Component={CompanyLayout}/>
                <Route path="/company/update/coupon/:id" Component={UpdateCoupon}/>
                <Route path="/customer" Component={CustomerLayout}/>
                <Route path="/about" Component={AboutUs}/>
                {/* all OTHER paths will load Home */}
                <Route path="*" Component={NotFound} />
            </Routes>
        </div>
    );
}
