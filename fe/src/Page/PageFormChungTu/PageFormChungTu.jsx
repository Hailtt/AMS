import React, { useState } from "react";
import { DATA_NghiPhep, DATA_Nhap } from "./data";
import FormInput from "../../Component/FormInput/FormInput";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormNguoiDuyet from "../../Component/FormNguoiDuyet/FormNguoiDuyet";
import { getCurrentDate } from "./functions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageFormChungTu = () => {
	const navigate = useNavigate();

	const [currentStep, setCurrentStep] = useState("nhapthongtin");
	const [nhapNguoiDuyet, setNhapNguoiduyet] = useState([]);
	const [nhapThongTin, setNhapThongTin] = useState({
		nguoitao: "",
		noidung: {},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentStep === "nhapthongtin") {
			setCurrentStep("chonnguoiduyet");
			console.log("currentStep >>>", currentStep);
		} else {
			const dataSubmit = {
				maLoai: DATA_NghiPhep.maLoai,
				maForm: DATA_NghiPhep.maForm,
				nguoiTao: nhapThongTin.nguoitao,
				thoiGianTao: getCurrentDate(),
				noiDung: nhapThongTin.noidung,
				nguoiDuyet: nhapNguoiDuyet,
			};

			console.log("ABCCCC >>>>>>", dataSubmit);

			if (dataSubmit) {
				axios
					.post(
						`${process.env.REACT_APP_BE_URL}/chung-tu/tao-moi-chung-tu`,
						dataSubmit
					)
					.then((res) => {
						console.log(res.data);
						navigate("/quanlychungtu");
					})
					.catch((err) => {
						console.log(err.response);
					});
			}
		}
	};

	const handleChangeInput = (key, value) => {
		// lấy ra người id người dùng
		if (key === "userid") {
			setNhapThongTin((prev) => ({ ...prev, nguoitao: value }));
		} else {
			//những key còn lại không phải id người tạo thì sẽ được đưa vào thuộc tính nội dung
			const { noidung } = nhapThongTin;
			const newNoiDung = { ...noidung, [key]: value };
			setNhapThongTin((prev) => ({ ...prev, noidung: newNoiDung }));
		}
	};

	const handleChangeNguoiDuyet = (dataType, newValue, index) => {
		//check nếu chọn option trống
		if (newValue === "") {
			const newArray = [...nhapNguoiDuyet];
			newArray[index] = {};
			setNhapNguoiduyet(newArray);

			// console.log("newArray >>>>", newArray);
			return;
		}

		//check nếu mảng nhập người duyệt thấp hơn index (index ở đây đang trỏ tới cái slection trên giao diện mà người dùng dang thao tác)
		if (nhapNguoiDuyet.length - 1 < index) {
			const newArray = [...nhapNguoiDuyet];

			// Dùng vòng lặp để thêm các item có giá trị là object rỗng
			for (let i = newArray.length; i <= index; i++) {
				newArray.push({});
			}
			// Khi length của mảng bằng với giá trị index, gán bằng newValue
			if (newArray.length - 1 === index) {
				newArray[index] = { ...dataType, user_update: newValue };
			}

			setNhapNguoiduyet(newArray);
		} else {
			//khi chạy code ở chỗ này tức là đã chọn người duyệt rồi hoặc thay đổi giá trị của option
			const newArray = [...nhapNguoiDuyet];
			newArray[index] = { ...dataType, user_update: newValue };

			setNhapNguoiduyet(newArray);
		}
	};

	return (
		<div className="pageformchungtu">
			<h1 className="title">ashgdfsahg</h1>
			<div className="steps">
				<div className="checkpoint --active ">
					{currentStep == "nhapthongtin" ? (
						<SyncOutlined className="icon" />
					) : (
						<CheckCircleOutlined className="icon--success" />
					)}
					<span className="text">Nhập thông tin</span>
				</div>
				<div
					className={currentStep == "nhapthongtin" ? "line" : "line --active"}
				></div>
				<div
					className={
						currentStep == "nhapthongtin" ? "checkpoint" : "checkpoint --active"
					}
				>
					<SyncOutlined className="icon" />
					<span className="text">Chọn người duyệt</span>
				</div>
			</div>
			<div className="container">
				<FormInput
					currentStep={currentStep}
					handleChangeInput={handleChangeInput}
				/>
				{currentStep === "chonnguoiduyet" && (
					<FormNguoiDuyet handleChangeNguoiDuyet={handleChangeNguoiDuyet} />
				)}
			</div>
			<div className="btn-box">
				<button
					className={currentStep == "nhapthongtin" ? "button hidden" : "button"}
					onClick={() => setCurrentStep("nhapthongtin")}
				>
					Lùi lại
				</button>
				<button className="button" onClick={handleSubmit}>
					{currentStep == "nhapthongtin" ? "Tiếp theo" : "Tạo chứng từ"}
				</button>
			</div>
		</div>
	);
};

export default PageFormChungTu;
