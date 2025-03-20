import { AddCoupon } from "../AddCoupon/AddCoupon";
import { Coupons } from "../Coupons/Coupons";
import "./CompanyLayout.css";

export function CompanyLayout(): JSX.Element {
    return (
        <div className="CompanyLayout">
			<Coupons/>
            <AddCoupon/>
        </div>
    );
}
