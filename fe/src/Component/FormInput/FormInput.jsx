import React, { useState } from "react";
import _ from "lodash";
import axios from "axios";
const FormInput = ({
	DATA_FORM,
	currentStep,
	handleChangeInput,
	setLoading,
}) => {
	const resData = DATA_FORM.sort((a, b) => a.sortOrder - b.sortOrder);

	const [tenNhanVien, setTenNhanVien] = useState("");

	const handleChangeUserID = async (key, label, value) => {
		let data = await new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_BE_URL}/chung-tu/lay-ten-nguoi-duyet/${value}`
				)
				.then((res) => {
					resolve(res.data);
					setTenNhanVien(res.data);
					handleChangeInput(key, label, value);
				})
				.catch((err) => {
					reject(err);
					console.error(err);
					setTenNhanVien("");
				});
		});
	};

	return (
		<div className="AMS-forminput">
			<div className="info info-default">
				<label className="label">Mã nhân viên</label>
				<input
					type="text"
					name="userId"
					className="tag-input"
					placeholder="Nhập mã "
					readOnly={currentStep == "nhapthongtin" ? false : true}
					onBlur={(e) =>
						handleChangeUserID(e.target.name, "Mã nhân viên", e.target.value)
					}
				/>
				<span>-</span>
				<strong className="namenv"> {tenNhanVien}</strong>
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
