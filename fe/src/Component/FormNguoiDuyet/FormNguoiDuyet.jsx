import React from "react";
import { DATA_NguoiDuyet } from "./data.js";
const FormNguoiDuyet = ({ data, handleChangeNguoiDuyet }) => {
	return (
		<form className="AMS-formnguoiduyet">
			{DATA_NguoiDuyet.map((item, index) => (
				<div key={index} className="nguoiduyet">
					<label className="label">{item.label}</label>
					<select
						className="list"
						name={item.label}
						onChange={(e) =>
							handleChangeNguoiDuyet(
								item.key,
								Array.from(e.target.selectedOptions, (option) => option.value),
								index
							)
						}
					>
						<option value="" className="item">
							Trống
						</option>
						{item.danhSachNguoiDuyet.map((it, index) => (
							<option value={it.maNguoiDuyet} key={index} className="item">
								{it.tenNguoiDuyet}
							</option>
						))}
					</select>
				</div>
			))}
		</form>
	);
};

export default FormNguoiDuyet;
