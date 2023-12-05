export const DATA_NghiPhep = {
	tenchungtu: "Chứng Từ Nghỉ Phép ",
	form: {
		data: [
			{
				key: "userid",
				label: "Mã nhân viên",
				tag: "input",
				dataType: "text",
			},
			{
				key: "name",
				label: "Tên nhân viên",
				tag: "p",
				dataType: "text",
			},
			{
				key: "songaynghi",
				label: "Số ngày nghỉ",
				tag: "input",
				dataType: "text",
			},
			{
				key: "ngaybatdau",
				label: "Ngày bắt đầu",
				tag: "input",
				dataType: "date",
			},
			{
				key: "ngayketthuc",
				label: "Ngày kết thúc",
				tag: "input",
				dataType: "date",
			},
			{
				key: "tailieudinhkem",
				label: "Tài liệu đính kèm",
				tag: "input",
				dataType: "file",
			},
		],
		nguoiduyet: [
			{
				key: "nguoiduyetcap1",
				label: "Người duyệt cấp 1",
				capduyet: 1,
				danhSachNguoiDuyet: [
					{
						maNguoiDuyet: "US00001",
						tenNguoiDuyet: "Thuận Hải",
					},
					{
						maNguoiDuyet: "US00002",
						tenNguoiDuyet: "Thanh Thế",
					},
				],
			},
			{
				key: "nguoiduyetcap2",
				label: "Người duyệt cấp 2",
				capduyet: 2,
				danhSachNguoiDuyet: [
					{
						maNguoiDuyet: "US00003",
						tenNguoiDuyet: "Minh Trí",
					},
				],
			},
		],
	},
};
