import Header from "../Component/Header/Header";
import CreateChungTu from "../Page/CreateChungTu/CreateChungTu";

function Layout() {
	return (
		<div className="layout">
			<Header />
			<div className="content">
				<CreateChungTu />
			</div>
		</div>
	);
}
export default Layout;
