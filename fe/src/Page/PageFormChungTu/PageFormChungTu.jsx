import React, { useState } from "react";
import { DATA_NghiPhep, DATA_Nhap } from "./data";
import FormInput from "../../Component/FormInput/FormInput";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormNguoiDuyet from "../../Component/FormNguoiDuyet/FormNguoiDuyet";
import { getCurrentDate } from "./functions";

const PageFormChungTu = () => {
	const { form, loaiCT } = DATA_NghiPhep;
	const [currentStep, setCurrentStep] = useState("nhapthongtin");
	const [dataChungtu, setDataChungtu] = useState(DATA_NghiPhep);
	const [dataSubmit, setDataSubmit] = useState(DATA_Nhap);
	const [nguoiDuyet1, setNguoiduye1] = useState("");
	const [nguoiDuyet2, setNguoiduye2] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentStep === "nhapthongtin") {
			setCurrentStep("chonnguoiduyet");
			console.log("currentStep >>>", currentStep);
		} else {
			setDataSubmit((prev) => ({
				...prev,
				loaiCT: DATA_NghiPhep.loaiCT,
				maCT: DATA_NghiPhep.maCT,
				trangThai: "Đang chờ",
				tenNguoiTao: dataChungtu.form.data.map((item) => {
					if (item.key === "name") {
						return item.value;
					}
				}),
				maNguoiTao: dataChungtu.form.data.map((item) => {
					if (item.key === "name") return item.value;
				}),
				ngayTao: getCurrentDate(),
				noiDung: dataChungtu.form.data.filter(
					(item) => !item.key.includes("name", "userid")
				),
			}));

			console.log(">>>>>>>>>> dataSubmit", dataSubmit);
		}
	};

	const handleChangeInput = (key, newValue) => {
		const updatedData = dataChungtu.form.data.map((item) => {
			if (item.key === key) {
				return { ...item, value: newValue };
			}
			return item;
		});

		dataChungtu.form.data = updatedData;
		console.log(dataChungtu);
	};
	const handleChangeNguoiDuyet = (keynguoiduyet, newValue, index) => {
		const updatedData = dataChungtu.form.nguoiduyet.map((item) => {
			if (item.key === keynguoiduyet) {
				console.log("index: " + index);
				console.log("index item: " + item.userId);
				// const checkNguoiduyet = Array.from(
				// 	new Set([...item.danhSachNguoiDuyet, ...newValue])
				// );

				// return { ...item, danhSachNguoiDuyet: checkNguoiduyet };
				return { ...item, userId: newValue };
			}
			return item;
		});

		dataChungtu.form.nguoiduyet = updatedData;
		console.log(dataChungtu);
	};

	return (
		<div className="pageformchungtu">
			<h1 className="title">{loaiCT}</h1>
			<div className="steps">
				<div className="checkpoint --active ">
					{setCurrentStep == "nhapthongtin" ? (
						<SyncOutlined className="icon" />
					) : (
						<CheckCircleOutlined className="icon--success" />
					)}
					<span className="text">Nhập thông tin</span>
				</div>
				<div
					className={
						setCurrentStep == "nhapthongtin" ? "line" : "line --active"
					}
				></div>
				<div
					className={
						setCurrentStep == "nhapthongtin"
							? "checkpoint"
							: "checkpoint --active"
					}
				>
					<SyncOutlined className="icon" />
					<span className="text">Chọn người duyệt</span>
				</div>
			</div>
			<div className="container">
				<FormInput
					data={form.data}
					currentStep={currentStep}
					handleChangeInput={handleChangeInput}
				/>
				<FormNguoiDuyet
					data={form.nguoiduyet}
					handleChangeNguoiDuyet={handleChangeNguoiDuyet}
				/>
			</div>
			<div className="btn-box">
				{currentStep == "chonnguoiduyet" && (
					<button
						className="button"
						onClick={() => setCurrentStep("nhapthongtin")}
					>
						Lùi lại
					</button>
				)}
				<button className="button" onClick={handleSubmit}>
					{currentStep == "nhapthongtin" ? "Tiếp theo" : "Tạo chứng từ"}
				</button>
			</div>
		</div>
	);
};

export default PageFormChungTu;
