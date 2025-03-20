import { CustomerCoupons } from "../CustomerCoupons/CustomerCoupons";
import { PurchaseCoupons } from "../PurchaseCoupons/PurchaseCoupons";
import "./CustomerLayout.css";

export function CustomerLayout(): JSX.Element {
    return (
        <div className="CustomerLayout">
			<CustomerCoupons/>
            <br/>
            <PurchaseCoupons/>
        </div>
    );
}
