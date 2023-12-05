import Header from "../Component/Header/Header";
import CreateChungTu from "../Page/CreateChungTu/CreateChungTu";
import QuanLyChungTu from "../Page/QuanLyChungTu/QuanLyChungTu";
import PageFormChungTu from "../Page/PageFormChungTu/PageFormChungTu";

function Layout() {
	return (
		<div className="layout">
			<Header />
			<div className="content">
				{/* <CreateChungTu /> */}
				{/* <QuanLyChungTu /> */}
				<PageFormChungTu />
			</div>
		</div>
	);
}
export default Layout;
