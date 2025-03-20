import { AddCompany } from "../AddCompany/AddCompany";
import { AddCustomer } from "../AddCustomer/AddCustomer";
import { Companies } from "../Companies/Companies";
import { Customers } from "../Customers/Customers";
import "./AdminLayout.css";

export function AdminLayout(): JSX.Element {
    return (
        <div className="AdminLayout">
			<Companies/>
            <AddCompany/>
            <Customers/>
            <AddCustomer/>
            <br/>
        </div>
    );
}
