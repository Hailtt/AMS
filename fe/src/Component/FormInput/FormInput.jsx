import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
const FormInput = ({ DATA_FORM, currentStep, handleChangeInput }) => {
	const resData = DATA_FORM.sort((a, b) => a.sortOrder - b.sortOrder);

	const [tenNhanVien, setTenNhanVien] = useState("");

	const handleChangeUserID = (key, label, value) => {
		axios
			.get(
				`${process.env.REACT_APP_BE_URL}/chung-tu/lay-ten-nguoi-duyet/${value}`
			)
			.then((res) => {
				setTenNhanVien(res.data);
				handleChangeInput(key, label, value);
			})
			.catch((err) => {
				console.error(err);
				setTenNhanVien("");
			});
	};
	return (
		<div className="AMS-forminput">
			<div className="info">
				<label className="label">Mã nhân viên</label>
				<input
					type="text"
					name="userId"
					className="tag-input"
					placeholder="Nhập mã nhân viên"
					readOnly={currentStep == "nhapthongtin" ? false : true}
					onBlur={(e) =>
						handleChangeUserID(e.target.name, "Mã nhân viên", e.target.value)
					}
				/>
			</div>

			<div className="info">
				<label className="label">Tên nhân viên</label>
				<p className="tag-p">
					<strong>{tenNhanVien}</strong>
				</p>
			</div>

			{_.map(resData, (item) => (
				<div key={item.key} className="info">
					<label className="label">{item.label}</label>

					<input
						type={item.typeInput}
						className={`tag-input`}
						placeholder={"Nhập " + item.label}
						onChange={(e) =>
							handleChangeInput(item.key, item.label, e.target.value)
						}
						readOnly={currentStep == "nhapthongtin" ? false : true}
					/>
				</div>
			))}
		</div>
	);
};

export default FormInput;
