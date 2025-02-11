import React from "react";
import RecruitmentStageHead from "./stage-head";
import RecruitmentStageBody from "./stage-body";

function Stage({ datas, headers, setActive }) {
	return (
		<>
			<div>
				{headers && (
					<div className="mb-5">
						<RecruitmentStageHead datahead={headers} setActive={setActive} />
					</div>
				)}
			</div>
			{datas && <RecruitmentStageBody databody={datas} />}
		</>
	);
}

export default Stage;
