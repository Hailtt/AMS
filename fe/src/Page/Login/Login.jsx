import { Button, Input } from "antd";
import logo from "../../img/Logo-MWG.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
	const initialState = {
		username: null,
		password: null,
	};

	const [user, setUser] = useState(initialState);
	const navigate = useNavigate();
	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("http://192.168.137.160:8080/user/login", {username: user.username, password: user.password},{withCredentials:true})
		.then(result=>{

			navigate("/")
		})
		.catch(err => {
			console.log(err)
			navigate("/")
		})
	};

	return (
		<div className="login">
			<h1 className="title">
				<i>AMS</i>
			</h1>

			<div className="form">
				<div className="image">
					<img src={logo} alt="logo" width={60} height={60} />
				</div>
				<h2 className="title">Đăng nhập</h2>

				<div className="input">
					<h4 className="label">Tên đăng nhập</h4>
					<Input
						className="input-area"
						size="large"
						key="username"
						name="username"
						value={user.username}
						placeholder="Tên đăng nhập"
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<div className="input">
					<h4 className="label">Mật khẩu</h4>
					<Input
						className="input-area"
						type="password"
						size="large"
						key="password"
						name="password"
						value={user.password}
						placeholder="Mật khẩu"
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<Button
					className="button"
					size="large"
					type="primary"
					onClick={handleSubmit}
				>
					Đăng nhập
				</Button>
			</div>
		</div>
	);
}

export default Login;
