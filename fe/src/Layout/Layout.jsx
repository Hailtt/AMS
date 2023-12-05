import Header from "../Component/Header/Header";
import CreateChungTu from "../Page/CreateChungTu/CreateChungTu";
import QuanLyChungTu from "../Page/QuanLyChungTu/QuanLyChungTu";

function Layout() {
	return (
		<div className="layout">
			<Header />
			<div className="content">
				{/* <CreateChungTu /> */}
				<QuanLyChungTu />
			</div>
		</div>
	);
}
export default Layout;
