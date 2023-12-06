import React from "react";
import { DATA_NguoiDuyet } from "./data.js";
const FormNguoiDuyet = ({ handleTaoChungTu }) => {
	return (
		<form className="AMS-formnguoiduyet">
			{DATA_NguoiDuyet.map((item, index) => (
				<div key={index} className="nguoiduyet">
					<label className="label">{item.label}</label>
					<select className="list">
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
			<button className="button" type="submit" onClick={handleTaoChungTu}>
				Tạo chứng từ
			</button>
		</form>
	);
};

export default FormNguoiDuyet;
