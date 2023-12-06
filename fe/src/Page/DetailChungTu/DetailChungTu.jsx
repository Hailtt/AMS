import NoiDungChungTu from "../../Component/ChiTietChungTu/NoiDungChungTu";
import { DATA_NghiPhep } from "./data";
function DetailChungTu() {
	const { tenchungtu, form } = DATA_NghiPhep;
	return (
		<div className="DTCT">
			<NoiDungChungTu data={form.data} tenchungtu={tenchungtu} />
			<div className="track-log"></div>
		</div>
	);
}

export default DetailChungTu;
