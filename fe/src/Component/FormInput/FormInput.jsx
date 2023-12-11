import React, { useState } from "react";
import _ from "lodash";

const FormInput = ({ data, currentStep, handleChangeInput }) => {
	return (
		<div className="AMS-forminput">
			{_.map(data, (item) => (
				<div key={item.key} className="info">
					<label className="label">{item.label}</label>
					{item.tag == "input" ? (
						<item.tag
							type={item.dataType}
							className={`tag-${item.tag} `}
							placeholder={"Nhập " + item.label}
							onChange={(e) => handleChangeInput(item.key, e.target.value)}
							readOnly={currentStep == "nhapthongtin" ? false : true}
						/>
					) : (
						<item.tag className={`tag-${item.tag}`}> </item.tag>
					)}
				</div>
			))}
		</div>
	);
};

export default FormInput;
