import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ButtonContainer({ avail, id, info }) {
	console.log("info", info);

	const [userNguoiDuyet, setUserNguoiDuyet] = useState(info.user || "");
	const navigate = useNavigate();
	const userID = localStorage.getItem("userID");
	console.log("userID", userID);
	console.log("userNguoiDuyet", userNguoiDuyet);

	const [isDuyet, setIsDuyet] = useState(() => {
		const urlParts = window.location.href.split("/");
		const actionsUrl = urlParts[urlParts.indexOf("quanlychungtu") + 1];
		if (actionsUrl === "duyetCT") {
			return true;
		}
		return false;
	});

	const huyChungTu = () => {
		const res = window.confirm("Bạn có chắc muốn hủy chứng từ?");
		if (res) {
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/huy-chung-tu/${id}`)
				.then((data) => {
					alert(data.data + " thành công !");
					navigate("/quanlychungtu");
				})
				.catch((err) => reject(err));
		}
	};

	const handleSubmitDuyet = (value) => {
		console.log("Ket Qua Duyet: ", value);
	};

	useEffect(() => {
		setUserNguoiDuyet(info.user);
	}, [info]);
	return isDuyet ? (
		userNguoiDuyet && userID === userNguoiDuyet ? (
			<div className="button-container">
				<Button
					onClick={() => handleSubmitDuyet("Đồng ý")}
					className="button"
					type="primary"
				>
					Đồng ý
				</Button>
				<Button
					onClick={() => handleSubmitDuyet("Từ chối")}
					className="button"
					type="primary"
					danger
				>
					Từ chối
				</Button>
			</div>
		) : (
			<></>
		)
	) : (
		<div className="button-container">
			{avail ? (
				<Button onClick={() => huyChungTu} className="button" danger>
					Hủy chứng từ
				</Button>
			) : (
				<Button onClick={() => huyChungTu} className="button" danger disabled>
					Hủy chứng từ
				</Button>
			)}
		</div>
	);
}

export default ButtonContainer;
