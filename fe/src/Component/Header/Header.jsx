import { HomeFilled, BellOutlined, UserOutlined } from "@ant-design/icons";
import { NavList, UserList } from "./List.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

function Header() {
	const usenavigate = useNavigate();
	const [opeNav, setOpenNav] = useState(false);

	const handleLogout = (path) => {
		usenavigate(path);
		localStorage.removeItem("myToken");
		window.location.reload();
	};

	const userID = localStorage.getItem("userID");
	return (
		<header>
			<div className="left-side">
				<MenuOutlined className="menu-icon" style={{ fontSize: "23px" }} />
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
				<p className="text">
					Xin chào: <strong>{userID} </strong>
				</p>
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
