import { useSelector } from "react-redux";
import { ProfileBasic } from "../../profile";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
	let { staff } = useSelector(state => state),
		location = useLocation(),
		[state, setState] = useState(null);

	useEffect(() => {
		if (location?.state) {
			staff?.all?.docs?.map(it => it?._id === location?.state && setState(it));
		}
	}, [location?.state, staff?.all?.docs]);

	if (!state) return;

	return <ProfileBasic state={state} />;
};

export default Profile;
