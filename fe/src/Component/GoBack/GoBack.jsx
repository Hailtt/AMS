import React from "react";
import { useNavigate } from "react-router";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
const GoBack = ({ value }) => {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(value);
	};
	return (
		<div className="Goback">
			<button onClick={handleGoBack} className="btn">
				<LeftCircleOutlined />
				<span className="text">Quay lại</span>
			</button>
		</div>
	);
};

export default GoBack;
