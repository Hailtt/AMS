import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { Column } from "./TableDesign";
import axios from "axios";
const CreateChungTu = ({ loading, setLoading }) => {

	const initState = {
		maCT: null,
		tenCT: null
	}

	const [ListChungTu, setListChungTu] = useState();
	const [tempList, setTempList] = useState();
	const [filter, setFilter] = useState(initState);

	const getListChungTu = async () => {
		setLoading(true);
		const token = localStorage.getItem('myToken');
		let data = await new Promise((resolve, reject) => {
			axios.get(`${process.env.REACT_APP_BE_URL}/chung-tu/get-loai-chung-tu/1/${token}`)
				.then(data => {
					resolve(data);
					setListChungTu(data.data);
					setTempList(data.data);
				})
				.catch(err => reject(err));
		})
		setLoading(false);
	}

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFilter(prev => {
			return {
				...prev,
				[name]: value
			}
		})
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			search();
		}
	}

	const search = () => {
		let temp = tempList;
		if (!filter.maCT && !filter.tenCT) {
			setListChungTu(temp);
		} else {
			if (filter.maCT) {
				temp = temp.filter(i => {
					return i.id === filter.maCT;
				})
			}

			if (filter.tenCT) {
				temp = temp.filter(i => {
					return i.name.toLowerCase().includes(filter.tenCT.toLowerCase());
				})
			}
			setListChungTu(temp);
		}
	}

	useEffect(() => {
		getListChungTu();
	}, [])

	return (
		<div className="createchungtu">
			{loading && <Loading />}
			<h1 className="title">Tạo Chứng Từ</h1>

			<div className="search">
				<Input
					className="input"
					size="large"
					placeholder="Mã chứng từ"
					onChange={handleInput}
					allowClear={true}
					onKeyDown={handleKeyDown}
					name="maCT"
				/>
				<Input
					className="input"
					size="large"
					placeholder="Tên chứng từ"
					onChange={handleInput}
					allowClear={true}
					onKeyDown={handleKeyDown}
					name="tenCT"
				/>
				<Button className="button" size="large" onClick={() => search()}>
					<SearchOutlined className="icon" />
					Tìm Kiếm
				</Button>
			</div>

			<div className="container">
				<Table
					className="table"
					columns={Column}
					dataSource={ListChungTu}
					bordered
					pagination={{ position: ["topCenter"], pageSize: 10 }}
				/>
			</div>

		</div>
	);
};

export default CreateChungTu;
