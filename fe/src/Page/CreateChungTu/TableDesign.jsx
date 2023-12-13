import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// axios.get(`${process.env.REACT_APP_URL_BE}//chung-tu/get-loai-chung-tu/1`)

export const getListChungTu = () => {
	const Value = [
		{
			id: "LCT001",
			name: "Đơn xin nghỉ phép",
			formId: "8ca04426-cb08-483c-b464-f902c303d393",
		},
		{
			id: "LCT002",
			name: "Đề xuất khuyến mãi",
			formId: "cbec1a03-f8c5-4e92-9f0e-0c585c619e1b",
		},
	];
	return Value;
};

export const Column = [
	{
		key: "id",
		title: "Mã chứng từ",
		dataIndex: "id",
		width: "20%",
	},
	{
		key: "name",
		title: "Tên chứng từ",
		dataIndex: "name",
	},
	{
		key: "action",
		title: "Chi tiết",
		dataIndex: "action",
		render: (text, item) => (
			<Link to={`/createchungtu/formchungtu/${item.formId}`} className="link">
				xem
			</Link>
		),
		width: "5%",
	},
];
