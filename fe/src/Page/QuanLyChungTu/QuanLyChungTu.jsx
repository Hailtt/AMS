import Loading from "../Loading/Loading";
import { Input, Select, Button, Table, DatePicker, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { columntao, columnduyet, daDuyet, status } from "./Data";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function QuanLyChungTu({ loading, setLoading }) {
	const [box, setBox] = useState(1);
	const [current, setCurrent] = useState(1);
	const [chungtu, getChungTu] = useState();
	const [tempList, setTempList] = useState();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [type, setType] = useState();

	const initFilter = {
		maCT: null,
		maLoaiCT: null,
		maTT: null,
		date: {
			start: startDate?.format("YYYY-MM-DD"),
			end: endDate?.format("YYYY-MM-DD"),
		},
	};
	const [filter, setFilter] = useState(initFilter);

	const handleTableChange = (pagination) => {
		setCurrent(pagination.current);
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFilter((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const getLoaiChungTu = async () => {
		setLoading(true);
		let data = await new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/get-loai-chung-tu/1`)
				.then((data) => {
					resolve(data);
					setType(data.data);
				})
				.catch((err) => reject(err));
		});
	};

	const getAllChungTu = async () => {
		let data = await new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/all/${current}`)
				.then((data) => {
					resolve(data);
					data.data.map((i) => {
						const parts = i.thoiGianTao.split("T");

						const datePart = parts[0];
						const complexTimePart = parts[1];

						const timePart = complexTimePart.split(".")[0];

						const formattedTime = datePart + " - " + timePart;

						return (i.thoiGianTao = formattedTime);
					});
					setTempList(data.data);
					getChungTu(data.data);
				})
				.catch((err) => reject(err));
		});
		setLoading(false);
	};

	const handleLoaiCTChange = (value) => {
		setFilter((prev) => ({
			...prev,
			maLoaiCT: value,
		}));
	};

	const handleStatChange = (value) => {
		setFilter((prev) => ({
			...prev,
			maTT: value,
		}));
	};

	const search = () => {
		let temp = tempList;
		if (!filter.maCT && !filter.maLoaiCT && !filter.maTT) {
			getChungTu(temp);
			return;
		} else {
			if (filter.maCT) {
				temp = temp.filter((i) => {
					return i.maCT === filter.maCT;
				});
			}

			if (filter.maLoaiCT) {
				temp = temp.filter((i) => {
					return i.maLoaiCT === filter.maLoaiCT;
				});
			}

			if (filter.maTT) {
				temp = temp.filter((i) => {
					return i.maTT === filter.maTT;
				});
			}
			getChungTu(temp);
		}
		console.log("filter: ", filter);
	};

	// const handleGetDateRange = () => {
	// 	if (startDate && endDate) {
	// 		const range = {
	// 		start: startDate.format('YYYY-MM-DD'),
	// 		end: endDate.format('YYYY-MM-DD'),
	// 	};
	// 		console.log('Range:', range);
	// 	} else {
	// 		console.log('Vui lòng chọn cả hai ngày.');
	// 	}
	// };

	const disabledStartDate = (current) => {
		return endDate && current && current >= endDate;
	};

	const disabledEndDate = (current) => {
		return startDate && current && current <= startDate;
	};

	useEffect(() => {
		getLoaiChungTu();
		getAllChungTu();
	}, []);

	return (
		<div className="QLCT">
			{loading && <Loading />}
			<h1 className="title">Quản Lý Chứng Từ</h1>

			<div className="filter-section">
				<div className="left">
					<Input
						className="input"
						size="large"
						name="maCT"
						onChange={handleInput}
						placeholder="Nhập mã chứng từ"
					/>
					<Select
						size="large"
						className="dropdown"
						allowClear={true}
						options={type?.map((obj) => {
							return {
								label: `${obj.name}`,
								value: obj.name,
							};
						})}
						onChange={handleLoaiCTChange}
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
						onChange={handleStatChange}
						placeholder="Trạng thái"
					/>
				</div>

				<div className="right">
					<div className="date">
						<span>Từ:</span>
						<DatePicker
							size="large"
							className="input-date"
							onChange={(date) => setStartDate(date)}
							disabledDate={disabledStartDate}
						/>
					</div>
					<div className="date">
						<span>Đến:</span>
						<DatePicker
							size="large"
							className="input-date"
							onChange={(date) => setEndDate(date)}
							disabledDate={disabledEndDate}
						/>
					</div>
					<Button onClick={() => search()} size="large" className="button">
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
					onChange={handleTableChange}
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
