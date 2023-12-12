export const DATA_NghiPhep = {
	maLoai: "LCT001",
	maForm: "8ca04426-cb08-483c-b464-f902c303d393",
	form: {
		id: "formNP1",
		name: "form nghỉ phép 1",
		data: [
			{
				key: "userid",
				label: "Mã nhân viên",
				tag: "input",
				dataType: "text",
				value: "",
			},
			{
				key: "name",
				label: "Tên nhân viên",
				tag: "p",
				dataType: "text",
				value: "",
			},
			{
				key: "songaynghi",
				label: "Số ngày nghỉ",
				tag: "input",
				dataType: "text",
				value: "",
			},
			{
				key: "ngaybatdau",
				label: "Ngày bắt đầu",
				tag: "input",
				dataType: "date",
				value: "",
			},
			{
				key: "ngayketthuc",
				label: "Ngày kết thúc",
				tag: "input",
				dataType: "date",
				value: "",
			},
			{
				key: "tailieudinhkem",
				label: "Tài liệu",
				tag: "input",
				dataType: "file",
				value: "",
			},
		],

		nguoiduyet: [
			{
				key: "nguoiduyetcap1",
				label: "Người duyệt cấp 1",
				index: 1,
				userId: "",
			},
			{
				key: "nguoiduyetcap1",
				label: "Người duyệt cấp 1",
				index: 2,
				userId: "",
			},
			{
				key: "nguoiduyetcap2",
				label: "Người duyệt cấp 2",
				index: 3,
				userId: "",
			},
		],
	},
};

export const DATA_Nhap = {
	maLoai: "",
	maForm: "",
	nguoiTao: "",
	thoiGianTao: "",
	noiDung: {},
	nguoiDuyet: [{}],
};

// {
//     "maLoai": "LCT001",
//     "maForm":"FORM001",
//     "nguoiTao":"227001",
//     "thoiGianTao":"{{currentDate}}",
//     "noiDung":{
//         "content 1":"Nội dung nè",
//         "content 2":"Nội dung 2 nè"
//     },
//     "nguoiDuyet":[
//         {
//             "lvl":1,
//             "result": null,
//             "required":0,
//             "user_update":"227002",
//             "time_update":null
//         },
//         {
//             "lvl":1,
//             "result": null,
//             "required":0,
//             "user_update":"227020",
//             "time_update":null
//         },
//         {
//             "lvl":2,
//             "result": null,
//             "required":1,
//             "user_update":"227003",
//             "time_update":null
//         }
//     ]
// }
