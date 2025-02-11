import React, { useEffect, useState } from "react";
import {
	manageCompany,
	setCurrentCompany,
} from "../data/Reducers/CompanyReducer";
import { PageLoader } from "../components/modal-container/modal-container";
import { useDispatch, useSelector } from "react-redux";
import SettingTable from "../components/settings/setting_table";
import ManageSettingsTab from "../components/settings/manage_settings/manage_settings_tab";
import { LoadMore } from "../components/pagination/pagination";
import axios from "axios";
import { TOKEN_ID, loadUser, logoutUser } from "../data/Reducers/UserReducer";
import { useNavigate } from "react-router-dom";

const Sswitcher = () => {
	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Company Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
	];

	const [loading, setLoading] = useState(false),
		{ company } = useSelector(state => state),
		dispatch = useDispatch(),
		navigate = useNavigate();

	useEffect(() => {
		dispatch(manageCompany("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(company?.data);
	}, [company?.data]);

	if (!company?.data && !data) return <PageLoader />;
	if (!data) return;

	let handleReloader = it => {
		let id = it?._id;
		axios.defaults.headers.common["companyid"] = id;
		dispatch(setCurrentCompany(id));
		localStorage.setItem(TOKEN_ID, id);
		dispatch(logoutUser("skip"));
		dispatch(loadUser());
		navigate("/");
	};

	const handleLoadMore = async () => {
		setLoading("loadmore");
		await dispatch(
			manageCompany(
				"get",
				{ limit: data?.limit * data?.nextPage },
				company?.currentSelected
			)
		);
		setLoading(false);
	};
	return (
		<div>
			<div className="flex items-center justify-between w-full">
				<ManageSettingsTab name="Switch Companies" link={"/"} />
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					<SettingTable
						data={data?.docs || []}
						header={header}
						onClick={handleReloader}
					/>
				</div>
				<div className="mt-4 flex justify-center">
					<LoadMore
						next={data?.hasNextPage}
						loading={loading === "loadmore"}
						handleLoadMore={handleLoadMore}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sswitcher;
