import { Button, Input } from "antd";
import logo from "../../img/Logo-MWG.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
	const initialState = {
		id: null,
		passWord: null,
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = await new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_BE_URL}/user/login`, user)
				.then((res) => {
					resolve(res.data);
					console.log(res.data);
					navigate("/");
					window.location.reload();
					localStorage.setItem("myToken", res.data);
					localStorage.setItem("userID", user.id);
				})
				.catch((err) => reject(err));
		});
		// localStorage.setItem("user", user);
		// navigate("/");
		// window.location.reload();
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
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
						key="id"
						name="id"
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
						key="passWord"
						name="passWord"
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
