import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import { Column, Value } from "./Data";
const CreateChungTu = () => {
	return (
		<div className="createchungtu">
			<h1 className="title">Tạo Chứng Từ</h1>
			<div className="search">
				<input type="text" className="input" placeholder="Nhập mã" />
				<input type="text" className="input" placeholder="Nhập tên" />
				<button className="button">
					<SearchOutlined className="icon" />
					<p className="text">Tìm kiếm</p>
				</button>
			</div>
			<div className="container">
				<Table
					columns={Column}
					dataSource={Value}
					bordered
					pagination={{ position: ["topCenter"], pageSize: 10 }}
				/>
			</div>
		</div>
	);
};

export default CreateChungTu;
