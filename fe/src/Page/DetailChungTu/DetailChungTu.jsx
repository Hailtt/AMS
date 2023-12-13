import { useEffect, useState } from "react";
import axios from "axios";
import NoiDungChungTu from "../../Component/ChiTietChungTu/NoiDungChungTu";
import TrackLog from "../../Component/ChiTietChungTu/TrackLog";
import Loading from "../Loading/Loading";
import KetQuaDuyet from "../../Component/ChiTietChungTu/KetQuaDuyet";
import ButtonContainer from "../../Component/ChiTietChungTu/ButtonContainer";
import { useParams } from "react-router";
function DetailChungTu() {
	const [detail, setDetail] = useState(null);
	const [diary, getDiary] = useState(null);
	const [ketqua, getKetqua] = useState(null);
    const [avail, setAvail] = useState(true);
	const [loading, setLoading] = useState(true);

	const {id} = useParams();

	const getNoiDung = async() => {
		let data = await new Promise((resolve, reject) => {
			axios.get(`${process.env.REACT_APP_BE_URL}/chung-tu/noi-dung/${id}`)
				.then(data => {
					resolve(data);
					const parts = data.data.ngayTao.split("T");

					const datePart = parts[0];
					const timePart = parts[1];

					const formattedTime = datePart + " - " + timePart;
					data.data.ngayTao = formattedTime;
					setDetail(data.data);
				})
				.catch(err => reject(err))
		})
	}

	const getNhatKy = async() => {
		let data = await new Promise((resolve, reject) => {
			axios.get(`${process.env.REACT_APP_BE_URL}/chung-tu/nhat-ki/${id}`)
				.then(data => {
					resolve(data);
					data.data.map((i) => {
						if (i.maTT === "Đã hủy") setAvail(true);
						const parts = i.thoiGianCapNhat.split("T");
	
						const datePart = parts[0];
						const timePart = parts[1];
	
						const formattedTime = datePart + " - " + timePart;
	
						return (i.thoiGianCapNhat = formattedTime);
					});
					getDiary(data.data);
				})
				.catch(err => reject(err))
		})
	}

	const getRes = async() => {
		let data = await new Promise((resolve, reject) => {
			axios.get(`${process.env.REACT_APP_BE_URL}/chung-tu/ket-qua-duyet/${id}`)
				.then(data => {
					resolve(data);
					data.data.map((i) => {
						if (i.ketQua !== null) setAvail(true)
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
					getKetqua(data.data);
				})
				.catch(err => reject(err));
		})
	}

	useEffect(() => {
		setLoading(true);
		getNhatKy();
		getNoiDung();
		getRes();
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
				{!loading && <ButtonContainer diary={diary} ketqua={ketqua} id={id}/>}
			</div>
		</div>
	);
}

export default DetailChungTu;
