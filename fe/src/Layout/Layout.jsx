import Header from "../Component/Header/Header";

function Layout({ children }) {
	return (
		<div className="layout">
			<Header />
			<div className="content">{children}</div>
		</div>
	);
}
export default Layout;
