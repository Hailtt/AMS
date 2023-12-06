import React, { useState } from "react";
import { DATA_NghiPhep } from "./data";
import FormInput from "../../Component/FormInput/FormInput";

import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormNguoiDuyet from "../../Component/FormNguoiDuyet/FormNguoiDuyet";

const PageFormChungTu = () => {
	const { tenchungtu, form } = DATA_NghiPhep;
	const [isNhapthongtin, setIsNhapthongtin] = useState(true);

	const handleNextStep = (e) => {
		e.preventDefault();
		setIsNhapthongtin(!isNhapthongtin);
	};
	const handleTaoChungTu = (e) => {
		e.preventDefault();
		setIsNhapthongtin(!isNhapthongtin);
	};

	return (
		<div className="pageformchungtu">
			<h1 className="title">{tenchungtu}</h1>
			<div className="steps">
				<div className="checkpoint --active ">
					{isNhapthongtin ? (
						<SyncOutlined className="icon" />
					) : (
						<CheckCircleOutlined className="icon--success" />
					)}
					<span className="text">Nhập thông tin</span>
				</div>
				<div className={isNhapthongtin ? "line" : "line --active"}></div>
				<div className={isNhapthongtin ? "checkpoint" : "checkpoint --active"}>
					<SyncOutlined className="icon" />
					<span className="text">Chọn người duyệt</span>
				</div>
			</div>
			{isNhapthongtin ? (
				<FormInput data={form.data} nextStep={handleNextStep} />
			) : (
				<FormNguoiDuyet handleTaoChungTu={handleTaoChungTu} />
			)}
		</div>
	);
};

export default PageFormChungTu;
