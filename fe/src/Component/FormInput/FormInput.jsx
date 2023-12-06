import React, { useState } from "react";

const FormInput = ({ data, nextStep }) => {
	const [test, setTest] = useState({});

	const handlSubmit = (e) => {
		e.preventDefault();
		console.log(test);
	};

	return (
		<form className="AMS-forminput">
			{data.map((item) => (
				<div key={item.key} className="info">
					<label className="label">{item.label}</label>
					{item.tag == "input" ? (
						<item.tag
							type={item.dataType}
							className={`tag-${item.tag}`}
							placeholder={"Nhập " + item.label}
							name={item.key}
							onChange={(e) =>
								setTest((prev) => {
									return { ...prev, [e.target.name]: e.target.value };
								})
							}
						/>
					) : (
						<item.tag className={`tag-${item.tag}`}> </item.tag>
					)}
				</div>
			))}
			<button className="button" type="submit" onClick={nextStep}>
				Tiếp tục
			</button>
		</form>
	);
};

export default FormInput;
