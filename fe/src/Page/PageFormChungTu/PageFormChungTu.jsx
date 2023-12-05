import React, { useState } from "react";
import { DATA_NghiPhep } from "./data";

const PageFormChungTu = () => {
	const { tenchungtu, form } = DATA_NghiPhep;
	const { data, nguoiduyet } = form;

	const [test, setTest] = useState({});

	const handlSubmit = (e) => {
		e.preventDefault();
		console.log(test);
	};
	return (
		<div className="pageformchungtu" onSubmit={handlSubmit}>
			<h1 className="title">{tenchungtu}</h1>
			<form className="forminput">
				{data.map((item) => (
					<div key={item.key} className="info">
						<label className="label">{item.label}</label>
						{item.tag == "input" ? (
							<item.tag
								type={item.dataType}
								className={`tag-${item.tag}`}
								placeholder={"Nhập " + item.label}
								name={item.key}
								onChange={(e) =>
									setTest((prev) => {
										return { ...prev, [e.target.name]: e.target.value };
									})
								}
							/>
						) : (
							<item.tag className={`tag-${item.tag}`}> </item.tag>
						)}
					</div>
				))}
				{nguoiduyet.map((item, index) => (
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
				<button className="button" type="submit">
					Tạo Chứng Từ
				</button>
			</form>
		</div>
	);
};

export default PageFormChungTu;
