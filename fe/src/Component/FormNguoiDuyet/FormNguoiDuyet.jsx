import React, { useEffect, useState } from "react";
import { DATA_NguoiDuyet } from "./data.js";
import _ from "lodash";

const FormNguoiDuyet = ({ handleChangeNguoiDuyet }) => {
	const [resData, setResData] = useState();
	const [dataType, setDataType] = useState({});
	useEffect(() => {
		setResData(DATA_NguoiDuyet);
	}, [resData]);

	const getType = (data) => {
		if (data) {
			const { user_update, ...newDataType } = data;
			const newType = newDataType;
			return newType;
		}
	};

	return (
		<form className="AMS-formnguoiduyet">
			{_.map(resData, (item, index) => (
				<div key={index} className="nguoiduyet">
					<label className="label">Duyet cap {item.lvl}</label>
					<select
						className="list"
						onChange={(e) =>
							handleChangeNguoiDuyet(getType(item), e.target.value, index)
						}
					>
						<option value="" className="item">
							Trống
						</option>
						{item.user_update.map((it, index) => (
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
