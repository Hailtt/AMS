import { FileAddFilled } from "@ant-design/icons";
import React from "react";

function NoiDungChungTu({detail}) {
    const noiDungObj = JSON.parse(detail.noiDung);

    const keyValuePairs = Object.entries(noiDungObj);
    const labelValueArray = keyValuePairs.map(([key, value]) => (
        {
            label: key,
            value: value
        }
    ))

    console.log(labelValueArray);
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
						<td>
							<b>{detail.tenNguoiTao}</b>
						</td>
					</tr>

					<tr className="row">
						<td className="label">Mã nhân viên:</td>
						<td>
							<b>{detail.maNguoiTao}</b>
						</td>
					</tr>

					<tr className="row">
						<td className="label">Ngày tạo đơn:</td>
						<td>
							<b>{detail.ngayTao}</b>
						</td>
					</tr>

					<tr className="row">
						<td className="label">Số ngày nghỉ:</td>
						<td>
							<b>2</b>
						</td>
					</tr>

					{labelValueArray.map(i => {
						console.log(i)
						return (
							<React.Fragment>
								<tr className="row">
									<td className="label">{i.label}:</td>
									<td><b>{i.value}</b></td>
								</tr>
							</React.Fragment>
						)
					})}
				</table>
			</div>
		</div>
	);
}

export default NoiDungChungTu;
