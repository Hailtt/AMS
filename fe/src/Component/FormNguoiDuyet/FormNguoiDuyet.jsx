import React, { useEffect, useState } from "react";
import _ from "lodash";

const FormNguoiDuyet = ({ listNguoiDuyets, handleChangeNguoiDuyet }) => {
	const [nguoiDuyetSelected, setNguoiDuyetSelected] = useState([""]);
	console.log("Data nahn ve:", listNguoiDuyets);
	//max lever cấp duyệt
	let maxLevel = 0;
	// 1 level xuất hiện mấy lần
	let xuathien = 0;

	// resData lưu trữ dữ liệu List người duyệt sau khi tiền xử lý để render
	const [resData, setResData] = useState([]);

	const getType = (data) => {
		//data nhap vao la 1 object
		if (data) {
			const { user, name, ...newDataType } = data;
			const newType = newDataType;
			return newType;
		}

		return null;
	};
	const newList3 = getType(listNguoiDuyets[0]);

	// lấy cấu trúc thuộc tính của object

	const handleDeleteNguoiduyet = (userId, index) => {};
	useEffect(() => {
		// tạo 2 list fake
		const newList1 = [];
		const newList2 = [];

		//lấy cấu trúc thuộc tính của dữ liệu khi nhận về

		// lấy max level
		listNguoiDuyets.map((item) => {
			if (item.lvl > maxLevel) {
				maxLevel = item.lvl;
			}
		});

		// lọc ra được 1 array chứa n object tương ứng với số level
		for (let i = 1; i <= maxLevel; i++) {
			newList1.push({ soCap: i, soLan: 0 });
		}

		// lọc ra được 1 array n phần tử trong đó có số cấp và số lần xuất hiện của mỗi cấp
		for (let i = 1; i <= maxLevel; i++) {
			listNguoiDuyets.map((item) => {
				if (item.lvl == i) {
					xuathien = item.frequence;
				}
			});
			newList1.map((item) => {
				if (item.soCap == i) {
					item.soLan = xuathien;
				}
			});
		}

		// dựa vào số cấp trong List1 để biết số cấp
		newList1.map((item) => {
			// tương ứng mỗi cấp sẽ có số lần xuất hiện
			for (let i = 0; i < item.soLan; i++) {
				const nguoiduyets = [];

				// mỗi lần xuất hiện sẽ có 1 lits người duyệt tương ứng
				listNguoiDuyets.map((it) => {
					if (it.lvl == item.soCap) {
						nguoiduyets.push({ name: it.name, user: it.user });
					}
				});

				// thêm 1  lần xuất hiện vào list 2
				newList2.push({
					lvl: item.soCap,
					frequence: item.soLan,
					danhsachnguoiduyet: nguoiduyets,
				});
			}
		});

		console.log("resData", resData);
		console.log("newList3", newList3);
		console.log("newlis2", newList2);
		console.log("newlis2", newList2);
		console.log("newlis2", newList2);
		setResData(newList2);
	}, [listNguoiDuyets]);

	return (
		<form className="AMS-formnguoiduyet">
			{_.map(resData, (item, index) => (
				<div key={index} className="nguoiduyet">
					<label className="label">Duyet cap {item.lvl}</label>
					<select
						className="list"
						onChange={(e) => {
							handleChangeNguoiDuyet(newList3, item, e.target.value, index);
							handleDeleteNguoiduyet(e.target.value, index);
						}}
					>
						<option value="" className="item">
							Trống
						</option>
						{_.map(item.danhsachnguoiduyet, (item, index) => {
							return (
								<option value={item.user} className="item" key={index}>
									{item.name}
								</option>
							);
						})}
					</select>
				</div>
			))}
		</form>
	);
};

export default FormNguoiDuyet;
