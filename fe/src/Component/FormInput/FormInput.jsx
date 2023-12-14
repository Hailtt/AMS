import React, { useEffect, useState } from "react";
import _ from "lodash";
import { DATA_FORM } from "./dataForm";
const FormInput = ({ currentStep, handleChangeInput }) => {
	const resData = DATA_FORM.sort((a, b) => a.sort_order - b.sort_order);

	const urlParts = window.location.href.split("/");
	useEffect(() => {
		const formChungTuParam = urlParts[urlParts.indexOf("formchungtu") + 1];
	}, [urlParts]);

	return (
		<div className="AMS-forminput">
			{_.map(resData, (item) => (
				<div key={item.key} className="info">
					<label className="label">{item.label}</label>
					{item.tag == "input" ? (
						<item.tag
							type={item.dataType}
							className={`tag-${item.tag} `}
							placeholder={"Nhập " + item.label}
							onChange={(e) =>
								handleChangeInput(item.key, item.label, e.target.value)
							}
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
