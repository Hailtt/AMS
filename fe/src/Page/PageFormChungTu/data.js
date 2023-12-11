export const DATA_NghiPhep = {
	loaiCT: "Đơn xin nghỉ phép",
	maCT: "CT12230001",
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
	loaiCT: "",
	maCT: "",
	trangThai: "",
	tenNguoiTao: "",
	maNguoiTao: "",
	ngayTao: "",
	noiDung: {},
	nguoiDuyet: [{}],
};

// {
// 	"maLoai": "ABC123",
// 	"nguoiTao": "John Doe",
// 	"thoiGianTao": "2023-12-31",
// 	"noiDung": {
// 	  "key1": "value1",
// 	  "key2": "value2"
// 	},
// 	"nguoiDuyet": [
// 	  {
// 		"duyet1": "value1"
// 	  },
// 	  {
// 		"duyet1": "value1"
// 	  },
// 	  {
// 		"duyet2": "value2"
// 	  }
// 	]
//   }
