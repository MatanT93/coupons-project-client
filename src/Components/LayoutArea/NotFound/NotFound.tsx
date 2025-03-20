import "./NotFound.css";
//import NotFoundImg from ".\public\NotFoundImg.jpeg" 

export function NotFound(): JSX.Element {
    return (
        <div className="NotFound">
			<h2>Page not found</h2>
            <img src={process.env.PUBLIC_URL + "/NotFoundImg.jpeg"} alt="" className="notFound"/>
        </div>
    );
}
