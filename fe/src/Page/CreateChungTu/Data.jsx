import { Button } from "antd";

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
		render: () => <Button type="primary">xem</Button>,
		width: "5%",
	},
];

export const Value = [
	{
		id: "NP",
		name: "CT Nghỉ phép",
	},
	{
		id: "KM",
		name: "CT Khuyến mãi",
	},
];