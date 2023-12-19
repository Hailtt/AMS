import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import Loading from "../../Page/Loading/Loading"
import { DATA_NghiPhep } from "./data";
=======
import Loading from "../Loading/Loading";

>>>>>>> 1200499 (commit api duyet)
import FormInput from "../../Component/FormInput/FormInput";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import FormNguoiDuyet from "../../Component/FormNguoiDuyet/FormNguoiDuyet";
import { getCurrentDate } from "./functions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
const PageFormChungTu = ({ setLoading }) => {
=======
import GoBack from "../../Component/GoBack/GoBack";

const PageFormChungTu = ({ loading, setLoading }) => {
>>>>>>> 1200499 (commit api duyet)
	const navigate = useNavigate();
	const [listNguoiDuyets, setListNguoiDuyets] = useState(null);
	const [currentStep, setCurrentStep] = useState("nhapthongtin");
	const [nhapNguoiDuyet, setNhapNguoiduyet] = useState([]);
	const [formField, setformField] = useState([]);
	const [nhapThongTin, setNhapThongTin] = useState({
		nguoitao: "",
		noidung: {},
	});

	const getFormField = async() => {
		setLoading(true);
		let data = await new Promise((resolve, reject) => {
		const urlParts = window.location.href.split("/");
		const formChungTuParam = urlParts[urlParts.indexOf("formchungtu") + 2];

		axios
			.get(
				`${process.env.REACT_APP_BE_URL}/chung-tu/get-form-field/${formChungTuParam}`
			)
			.then((res) => {
				resolve(res.data)
				setformField(res.data);
				console.log(res.data);
				setLoading(false);
			})
			.catch((err) => {
				reject(err)
				console.log(err);
				setLoading(false);
			});
		})
		setLoading(false);
	}

	useEffect(() => {
		getFormField();
	}, []);

	const handleSubmit = async(e) => {
		e.preventDefault();

		if (currentStep === "nhapthongtin") {
			setCurrentStep("chonnguoiduyet");
		} else {
			setLoading(true);
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
				setLoading(true);
				let data = await new Promise((resolve, reject) => {
					axios
					.post(
						`${process.env.REACT_APP_BE_URL}/chung-tu/tao-moi-chung-tu`,
						dataSubmit
					)
					.then((res) => {
						resolve(res.data)
						console.log(res.data);
						navigate("/quanlychungtu/xemCT");
						setLoading(false);
					})
					.catch((err) => {
						reject(err)
						console.log(err.response);
						setLoading(false);
					});
				})
				setLoading(false);
			}
		}
	};

	const handleNextStep = async() => {
		setLoading(true);
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
		let data = await new Promise((resolve, reject) => {
			axios
			.post(
				`${process.env.REACT_APP_BE_URL}/chung-tu/chon-nguoi-duyet`,
				dataSubmit
			)
			.then((res) => {
				resolve(res.data)
				setListNguoiDuyets(res.data);
			})
			.catch((err) => {
				reject(err)
				console.log(err.response);
			});
		})
		setLoading(false);
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
		<>
			{loading && <Loading />}
			<div className="pageformchungtu">
				<GoBack value="/createchungtu" />
				<h1 className="title">Tạo Chứng Từ</h1>
				<div className="steps">
					<div className="checkpoint --active ">
						{currentStep == "nhapthongtin" ? (
							<LoadingOutlined className="icon" />
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
							currentStep == "nhapthongtin"
								? "checkpoint"
								: "checkpoint --active"
						}
					>
						<LoadingOutlined className="icon" />
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
						className={
							currentStep == "nhapthongtin" ? "button hidden" : "button"
						}
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
		</>
	);
};

export default PageFormChungTu;
