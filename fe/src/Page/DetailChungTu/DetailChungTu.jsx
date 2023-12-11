import { useEffect, useState } from "react";
import axios from "axios";
import NoiDungChungTu from "../../Component/ChiTietChungTu/NoiDungChungTu";
import TrackLog from "../../Component/ChiTietChungTu/TrackLog";
import Loading from "../Loading/Loading";
import KetQuaDuyet from "../../Component/ChiTietChungTu/KetQuaDuyet";
import ButtonContainer from "../../Component/ChiTietChungTu/ButtonContainer";
function DetailChungTu() {
	const [detail, setDetail] = useState(null);
	const [diary, getDiary] = useState(null);
	const [ketqua, getKetqua] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${process.env.REACT_APP_BE_URL}/api/chungtu/noi-dung/CT12230001`)
			.then((res) => {
				const parts = res.data.ngayTao.split("T");

				const datePart = parts[0];
				const timePart = parts[1];

				const formattedTime = datePart + " - " + timePart;
				res.data.ngayTao = formattedTime;
				setDetail(res.data);
			})
			.catch((err) => {
				alert(err);
			});

		axios
			.get(`${process.env.REACT_APP_BE_URL}/api/chungtu/nhat-ki/CT12230001`)
			.then((res) => {
				res.data.map((i) => {
					const parts = i.thoiGianCapNhat.split("T");

					const datePart = parts[0];
					const timePart = parts[1];

					const formattedTime = datePart + " - " + timePart;

					return (i.thoiGianCapNhat = formattedTime);
				});
				getDiary(res.data);
			})
			.catch((err) => {
				alert(err);
			});

		axios
			.get(
				`${process.env.REACT_APP_BE_URL}/api/chungtu/ket-qua-duyet/CT12230001`
			)
			.then((res) => {
				res.data.map((i) => {
					if (i.thoiGianDuyet !== null) {
						const parts = i.thoiGianDuyet.split("T");

						const datePart = parts[0];
						const timePart = parts[1];

						const formattedTime = datePart + " - " + timePart;

						return (i.thoiGianDuyet = formattedTime);
					} else {
						return;
					}
				});
				getKetqua(res.data);
			})
			.catch((err) => {
				alert(err);
			});
		setLoading(false);
	}, []);

	return (
		<div className="DTCT">
			{loading && (
				<div className="loading-screen">
					<Loading />
				</div>
			)}
			<div className="top">
				{detail && <NoiDungChungTu detail={detail} />}
				{diary && <TrackLog diary={diary} />}
			</div>

			<div className="bottom">
				{ketqua && <KetQuaDuyet ketqua={ketqua} />}
				<ButtonContainer />
			</div>
		</div>
	);
}

export default DetailChungTu;
