import React from "react";

const FormInput = ({ form }) => {
	const { data, nguoiduyet } = form;
	console.log(nguoiduyet);
	return (
		<form className="forminput">
			{data.map((item) => (
				<div key={item.key} className="info">
					<label className="label">{item.label}</label>
					{item.tag == "input" ? (
						<item.tag
							type={item.dataType}
							className={`tag-${item.tag}`}
							placeholder={"Nhập " + item.label}
						/>
					) : (
						<item.tag className={`tag-${item.tag}`}></item.tag>
					)}
				</div>
			))}
			{nguoiduyet.map((item, index) => (
				<div key={index} className="nguoiduyet">
					<label className="label">{item.label}</label>
					<select name="Chọn người duyệt">
						<option value="">Trống</option>
						{item.danhSachNguoiDuyet.map((it, index) => (
							<option value={it.maNguoiDuyet} key={index}>
								{it.tenNguoiDuyet}
							</option>
						))}
					</select>
				</div>
			))}
		</form>
	);
};

export default FormInput;
