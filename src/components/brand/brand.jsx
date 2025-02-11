import { Link } from "react-router-dom";

const Brand = ({ height, white, img }) => {
	return (
		<Link to={"/"}>
			{white ? (
				<img
					src={
						img ||
						require(`../../assets/${
							process.env.REACT_APP_NAME ? "Cephas.png" : "ICS Logo FA.png"
						}`)
					}
					alt=""
					className={`${height || "h-10"}`}
				/>
			) : (
				<img
					src={
						img ||
						require(`../../assets/${
							process.env.REACT_APP_NAME ? "Cephas.png" : "ICS Logo FA.png"
						}`)
					}
					alt=""
					className={`${height || "h-10"}`}
				/>
			)}
		</Link>
	);
};

export default Brand;
