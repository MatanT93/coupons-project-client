import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routing } from "../LayoutArea/Routing/Routing";
import { Layout } from "../LayoutArea/Layout/Layout";

export function App(): JSX.Element {
    return (
        <div className="App">
			<BrowserRouter>
                <Layout/>
                <Routing/>
            </BrowserRouter>
        </div>
    );
}
