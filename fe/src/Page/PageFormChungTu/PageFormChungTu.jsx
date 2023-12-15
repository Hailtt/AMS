import React, { useEffect, useState } from "react";
import { DATA_NghiPhep } from "./data";
import FormInput from "../../Component/FormInput/FormInput";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormNguoiDuyet from "../../Component/FormNguoiDuyet/FormNguoiDuyet";
import { getCurrentDate } from "./functions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PageFormChungTu = () => {
	const navigate = useNavigate();
	const [listNguoiDuyets, setListNguoiDuyets] = useState(null);
	const [currentStep, setCurrentStep] = useState("nhapthongtin");
	const [nhapNguoiDuyet, setNhapNguoiduyet] = useState([]);
	const [formField, setformField] = useState([]);
	const [nhapThongTin, setNhapThongTin] = useState({
		nguoitao: "",
		noidung: {},
	});

	useEffect(() => {
		const urlParts = window.location.href.split("/");
		const formChungTuParam = urlParts[urlParts.indexOf("formchungtu") + 2];

		axios
			.get(
				`${process.env.REACT_APP_BE_URL}/chung-tu/get-form-field/${formChungTuParam}`
			)
			.then((res) => {
				setformField(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentStep === "nhapthongtin") {
			setCurrentStep("chonnguoiduyet");
		} else {
			const urlParts = window.location.href.split("/");
			const idChungTu = urlParts[urlParts.indexOf("formchungtu") + 1];
			const formChungTuParam = urlParts[urlParts.indexOf("formchungtu") + 2];

			const dataSubmit = {
				maLoai: idChungTu,
				maForm: formChungTuParam,
				nguoiTao: nhapThongTin.nguoitao,
				thoiGianTao: getCurrentDate(),
				noiDung: nhapThongTin.noidung,
				nguoiDuyet: nhapNguoiDuyet,
			};

			console.log("DATA Submitttttt", dataSubmit);
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

	const handleNextStep = () => {
		setCurrentStep("chonnguoiduyet");
		const urlParts = window.location.href.split("/");
		const idChungTu = urlParts[urlParts.indexOf("formchungtu") + 1];

		const formChungTuParam = urlParts[urlParts.indexOf("formchungtu") + 2];
		const dataSubmit = {
			maLoai: idChungTu,
			maForm: formChungTuParam,
			nguoiTao: nhapThongTin.nguoitao,
			thoiGianTao: getCurrentDate(),
			noiDung: nhapThongTin.noidung,
		};

		console.log("data next step", dataSubmit);
		axios
			.post(
				`${process.env.REACT_APP_BE_URL}/chung-tu/chon-nguoi-duyet`,
				dataSubmit
			)
			.then((res) => {
				setListNguoiDuyets(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const handleChangeInput = (key, label, value) => {
		// lấy ra người id người dùng
		if (key === "userId") {
			setNhapThongTin((prev) => ({ ...prev, nguoitao: value }));
		} else {
			//những label còn lại không phải id người tạo thì sẽ được đưa vào thuộc tính nội dung
			const { noidung } = nhapThongTin;
			const newNoiDung = { ...noidung, [label]: value };
			setNhapThongTin((prev) => ({ ...prev, noidung: newNoiDung }));
		}
	};

	const handleChangeNguoiDuyet = (strucData, info, newValue, index) => {
		const { danhsachnguoiduyet, ...data } = info;
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
			const newStrucData = Object.assign({}, strucData, data);
			// console.log("newStrucData", newStrucData);

			// Dùng vòng lặp để thêm các item có giá trị là object rỗng
			for (let i = newArray.length; i <= index; i++) {
				newArray.push({});
			}
			// Khi length của mảng bằng với giá trị index, gán bằng newValue
			if (newArray.length - 1 === index) {
				newArray[index] = {
					...newStrucData,
					result: null,
					user_update: newValue,
				};
			}
			console.log("newStrucData: ", newStrucData);
			setNhapNguoiduyet(newArray);
		} else {
			//khi chạy code ở chỗ này tức là đã chọn người duyệt rồi hoặc thay đổi giá trị của option
			const newArray = [...nhapNguoiDuyet];
			const newStrucData = Object.assign({}, strucData, data);
			// console.log("newStrucData", newStrucData);

			newArray[index] = {
				...newStrucData,
				result: null,
				user_update: newValue,
			};
			console.log("newStrucData: ", newStrucData);

			setNhapNguoiduyet(newArray);
		}
	};

	return (
		<div className="pageformchungtu">
			<h1 className="title">Tạo Chứng Từ</h1>
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
					DATA_FORM={formField}
					currentStep={currentStep}
					handleChangeInput={handleChangeInput}
				/>
				{currentStep === "chonnguoiduyet" && listNguoiDuyets && (
					<FormNguoiDuyet
						listNguoiDuyets={listNguoiDuyets}
						handleChangeNguoiDuyet={handleChangeNguoiDuyet}
					/>
				)}
			</div>
			<div className="btn-box">
				<button
					className={currentStep == "nhapthongtin" ? "button hidden" : "button"}
					onClick={() => setCurrentStep("nhapthongtin")}
				>
					Lùi lại
				</button>
				{currentStep == "nhapthongtin" ? (
					<button className="button" onClick={handleNextStep}>
						Tiếp theo
					</button>
				) : (
					<button className="button" onClick={handleSubmit}>
						Tạo chứng từ
					</button>
				)}
			</div>
		</div>
	);
};

export default PageFormChungTu;
