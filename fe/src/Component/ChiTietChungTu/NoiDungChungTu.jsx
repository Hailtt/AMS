import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";

function NoiDungChungTu({ detail }) {
	const noiDungObj = JSON.parse(detail.noiDung);
	const [finalData, setFinalData] = useState([]);
	console.log("detail", detail);
	const keyValuePairs = Object.entries(noiDungObj);
	const labelValueArray = keyValuePairs.map(([key, value]) => ({
		label: key,
		value: value,
	}));

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_BE_URL}/chung-tu/get-form-field/${detail.maForm}`
			)
			.then((res) => {
				console.log("data nhận về", res.data);
				const newArray1 = [];
				for (let i = 0; i < res.data.length; i++) {
					const { label, sortOrder } = res.data[i];
					newArray1.push({ label: label, sortOrder: sortOrder, value: "" });
				}
				const resData = newArray1.sort((a, b) => a.sortOrder - b.sortOrder);
				console.log("newArray", resData);
				const newData2 = [];
				for (let i = 0; i < resData.length; i++) {
					for (let j = 0; j < resData.length; j++) {
						if (resData[i].label === labelValueArray[j].label) {
							const updatedObjectA = { ...resData[i], ...labelValueArray[j] };
							newData2.push(updatedObjectA);
						}
					}
				}
				console.log("newData2", newData2);
				setFinalData(newData2);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="NDCT">
			<div className="header">
				<h1 className="title">{detail.loaiCT}</h1>

				<div className="subtitle">
					<span className="span">
						Mã chứng từ: <b>{detail.maCT}</b>
					</span>
				</div>

				<h4 className="status">{detail.trangThai}</h4>
			</div>

			<div className="form-content">
				<table className="table">
					<tr className="row">
						<td className="label">Tên:</td>
						<td className="info">
							<b>{detail.tenNguoiTao}</b>
						</td>
					</tr>

					<tr className="row">
						<td className="label">Mã nhân viên:</td>
						<td className="info">
							<b>{detail.maNguoiTao}</b>
						</td>
					</tr>

					<tr className="row">
						<td className="label">Ngày tạo đơn:</td>
						<td className="info">
							<b>{detail.ngayTao}</b>
						</td>
					</tr>

					{_.map(finalData, (i, index) => {
						return (
							<tr className="row" key={index}>
								<td className="label">{i.label}:</td>
								<td className="info">
									<b>{i.value}</b>
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
}

export default NoiDungChungTu;
