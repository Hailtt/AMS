import { Input, Select, Button, Table, DatePicker, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { columntao, columnduyet, daDuyet, status } from "./Data";
import { useEffect, useState } from "react";
import axios from "axios";

function QuanLyChungTu() {
	const [box, setBox] = useState(1);
	const [chungtu, getChungTu] = useState();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BE_URL}/chung-tu/all`)
			.then((res) => {
				res.data.map((i) => {
					const parts = i.thoiGianTao.split("T");

					const datePart = parts[0];
					const timePart = parts[1];

					const formattedTime = datePart + " - " + timePart;

					return (i.thoiGianTao = formattedTime);
				});
				getChungTu(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, []);

	return (
		<div className="QLCT">
			<h1 className="title">Quản Lý Chứng Từ</h1>

			<div className="filter-section">
				<div className="left">
					<Input
						className="input"
						size="large"
						placeholder="Nhập mã chứng từ"
					/>
					<Select
						size="large"
						className="dropdown"
						placeholder="Chọn loại chứng từ"
					/>
					<Select
						size="large"
						className="dropdown"
						allowClear={true}
						options={status.map((obj) => {
							return {
								label: `${obj}`,
								value: obj,
							};
						})}
						placeholder="Trạng thái"
					/>
				</div>

				<div className="right">
					<div className="date">
						<span>Từ:</span>
						<DatePicker size="large" className="input-date" />
					</div>
					<div className="date">
						<span>Đến:</span>
						<DatePicker size="large" className="input-date" />
					</div>
					<Button size="large" className="button">
						Tìm Kiếm
						<SearchOutlined />
					</Button>
				</div>
			</div>

			<div className="switch">
				<Checkbox
					checked={box === 1 ? true : false}
					className="checkbox"
					onChange={() => setBox(1)}
				>
					Chứng từ đã tạo
				</Checkbox>
				<Checkbox
					checked={box === 2 ? true : false}
					className="checkbox"
					onChange={() => setBox(2)}
				>
					Duyệt chứng từ
				</Checkbox>
			</div>

			{box === 1 ? (
				<Table
					className="table"
					columns={columntao}
					dataSource={chungtu}
					bordered={true}
					pagination={{ position: ["topCenter"], pageSize: 10 }}
				/>
			) : (
				<Table
					className="table"
					columns={columnduyet}
					dataSource={daDuyet}
					bordered={true}
					pagination={{ position: ["topCenter"], pageSize: 10 }}
				/>
			)}
		</div>
	);
}

export default QuanLyChungTu;
