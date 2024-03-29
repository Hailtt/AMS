import { useEffect, useState } from "react";
import axios from "axios";
import NoiDungChungTu from "../../Component/ChiTietChungTu/NoiDungChungTu";
import TrackLog from "../../Component/ChiTietChungTu/TrackLog";
import Loading from "../Loading/Loading";
import KetQuaDuyet from "../../Component/ChiTietChungTu/KetQuaDuyet";
import ButtonContainer from "../../Component/ChiTietChungTu/ButtonContainer";
import { useParams } from "react-router";
import { getCurrentDate } from "../PageFormChungTu/functions";
import GoBack from "../../Component/GoBack/GoBack";
function DetailChungTu({ loading, setLoading }) {
	const [detail, setDetail] = useState(null);
	const [diary, getDiary] = useState([]);
	const [ketqua, getKetqua] = useState(null);
	const [avail, setAvail] = useState(true);
	const [quyenDuyet, setQuyenDuyet] = useState(0);
	const { id } = useParams();
	const token = localStorage.getItem("myToken");

	const urlParts = window.location.href.split("/");
	const actionChungTu = urlParts[urlParts.indexOf("quanlychungtu") + 1];

	const getQuyenDuyet = async () => {
		await axios
			.get(
				`${process.env.REACT_APP_BE_URL}/chung-tu/kiem-tra-duyet/${id}/${token}`
			)
			.then((res) => {
				console.log("Quyền duyệt:", res.data);
				setQuyenDuyet(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getNhatKy = async () => {
		setLoading(true);
		let data = await new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/nhat-ki/${id}/${token}`)
				.then((data) => {
					resolve(data);
					data.data.map((i) => {
						if (i.maTT === "Đã hủy") setAvail(false);
						const parts = i.thoiGianCapNhat.split("T");

						const datePart = parts[0];
						const complexTimePart = parts[1];

						const timePart = complexTimePart.split(".")[0];

						const formattedTime = datePart + " - " + timePart;

						return (i.thoiGianCapNhat = formattedTime);
					});
					getDiary(data.data);
				})
				.catch((err) => reject(err));
		});
	};
	const getRes = async () => {
		let data = await new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_BE_URL}/chung-tu/ket-qua-duyet/${id}/${token}`
				)
				.then((data) => {
					resolve(data);
					data.data.map((i) => {
						if (i.ketQua !== null) setAvail(false);
						if (i.thoiGianDuyet !== null) {
							const parts = i.thoiGianDuyet.split("T");

							const datePart = parts[0];
							const complexTimePart = parts[1];

							const timePart = complexTimePart.split(".")[0];

							const formattedTime = datePart + " - " + timePart;

							return (i.thoiGianDuyet = formattedTime);
						} else {
							return;
						}
					});
					getKetqua(data.data);
				})
				.catch((err) => reject(err));
		});
		setLoading(false);
	};

	const getNoiDung = async () => {
		let data = await new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_BE_URL}/chung-tu/noi-dung/${id}/${token}`)
				.then((data) => {
					resolve(data);
					const parts = data.data.ngayTao.split("T");

					const datePart = parts[0];
					const complexTimePart = parts[1];

					const timePart = complexTimePart.split(".")[0];

					const formattedTime = datePart + " - " + timePart;
					data.data.ngayTao = formattedTime;

					console.log("noidungddd 20/12", data.data);
					setDetail(data.data);
				})
				.catch((err) => reject(err));
		});
	};

	const handleDuyet = (value) => {
		//value => 1 = đồng ý, 0 = từ chối
		const submit = {
			result: value,
			toKen: token,
			timeUpdate: getCurrentDate(),
			maCT: id,
		};
		console.log("Data SUbmit", submit);
		axios
			.post(
				`${process.env.REACT_APP_BE_URL}/chung-tu/gui-ket-qua-duyet`,
				submit
			)

			.then((res) => {
				console.log(res.data);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getQuyenDuyet();
		getNhatKy();
		getNoiDung();
		getRes();
	}, []);

	return (
		<div className="DTCT">
			<GoBack value={`/quanlychungtu/${actionChungTu}`} />
			<div className="top">
				{detail && <NoiDungChungTu detail={detail} />}
				{diary && <TrackLog diary={diary} />}
			</div>

			<div className="bottom">
				{ketqua && <KetQuaDuyet ketqua={ketqua} />}
				{!loading && (
					<ButtonContainer
						id={id}
						avail={avail}
						quyenDuyet={quyenDuyet}
						onHandleDuyet={handleDuyet}
						setLoading={setLoading}
					/>
				)}
			</div>
		</div>
	);
}

export default DetailChungTu;
