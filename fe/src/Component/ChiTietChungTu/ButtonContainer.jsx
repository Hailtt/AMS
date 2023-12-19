import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ButtonContainer({ avail, id, quyenDuyet, onHandleDuyet, setLoading }) {
	const navigate = useNavigate();
	const [isDuyet, setIsDuyet] = useState(() => {
		const urlParts = window.location.href.split("/");
		const actionsUrl = urlParts[urlParts.indexOf("quanlychungtu") + 1];

		if (actionsUrl === "duyetCT") {
			return true;
		}
		return false;
	});

	const huyChungTu = () => {
		console.log("Huyyyy");
		const res = window.confirm("Bạn có chắc muốn hủy chứng từ?");
		if (res) {
			setLoading(true);
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/huy-chung-tu/${id}`)
				.then((data) => {
					setLoading(false);

					alert(data.data + " thành công !");
					navigate("/quanlychungtu/xemCT");
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		}
	};

	return (
		<div className="button-container">
			{isDuyet ? (
				quyenDuyet ? (
					<>
						<Button
							onClick={() => onHandleDuyet("1")}
							className="button"
							type="primary"
						>
							Đồng ý
						</Button>
						<Button
							onClick={() => onHandleDuyet("0")}
							className="button"
							type="primary"
							danger
						>
							Từ chối
						</Button>
					</>
				) : (
					<></>
				)
			) : (
				<>
					{" "}
					{avail ? (
						<Button onClick={huyChungTu} className="button" danger>
							Hủy chứng từ
						</Button>
					) : (
						<Button onClick={huyChungTu} className="button" danger disabled>
							Hủy chứng từ
						</Button>
					)}
				</>
			)}
		</div>
	);
}

export default ButtonContainer;
