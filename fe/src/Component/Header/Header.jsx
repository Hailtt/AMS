import { HomeFilled, BellOutlined, UserOutlined } from "@ant-design/icons";
import { NavList, UserList } from "./List.js";
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const usenavigate = useNavigate();

	const handleLogout = (path) => {
		usenavigate(path);
		localStorage.removeItem("user");
		window.location.reload();
	};
	return (
		<header>
			<div className="left-side">
				<Link className="home" to="/">
					<HomeFilled className="icon" />
					<h3>AMS</h3>
				</Link>

				<nav>
					<ul className="list">
						{NavList.map((i) => (
							<li className="item" key={i.key}>
								<Link className="link" to={i.path}>
									{i.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<div className="right-side">
				<BellOutlined style={{ fontSize: 27 }} className="icon" />

				<div className="user">
					<UserOutlined style={{ fontSize: 27 }} className="icon" />
					<ul className="list">
						{UserList.map((it, index) => (
							<li
								className="item"
								key={index}
								onClick={() => handleLogout(it.path)}
							>
								{it.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header;
