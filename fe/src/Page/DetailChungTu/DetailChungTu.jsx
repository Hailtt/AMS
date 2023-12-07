import { useEffect, useState } from "react";
import axios from 'axios';
import NoiDungChungTu from "../../Component/ChiTietChungTu/NoiDungChungTu";
import TrackLog from "../../Component/ChiTietChungTu/TrackLog";
import Loading from "../Loading/Loading";
function DetailChungTu() {
	const [detail, setDetail] = useState(null);
	const [diary, getDiary] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(()=>{
		setLoading(true);
		axios.get('http://192.168.137.160:8080/api/chungtu/noi-dung/CT12230001')
		.then( res => {
			setDetail(res.data);
			

		})
		.catch( err => {
			alert(err);
		})

		axios.get("http://192.168.137.160:8080/api/chungtu/nhat-ki/CT12230001")
		.then(res => {
			getDiary(res.data);
		})
		.catch(err => {
			alert(err);
		})
		setLoading(false);
	}, [])



	return (
		<div className="DTCT">
			{loading && (
				<div className="loading-screen">
					<Loading />
				</div>
			)}
			{detail  && <NoiDungChungTu detail={detail}/>}
			
			<div className="right">
				{diary && <TrackLog diary={diary}/>}
			</div>
		</div>
	);
}

export default DetailChungTu;
