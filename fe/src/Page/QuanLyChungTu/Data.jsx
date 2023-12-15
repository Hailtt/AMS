import { Button } from "antd";
import { Link } from "react-router-dom";

export const status = ["Đang chờ", "Đồng ý", "Từ chối", "Đã hủy"];

export const type = ["Đơn xin nghỉ phép", "Khuyến mãi"];

export const columntao = [
	{
		key: "maCT",
		title: "Mã chứng từ",
		dataIndex: "maCT",
		align: "center",
	},
	{
		key: "maLoaiCT",
		title: "Loại chứng từ",
		dataIndex: "maLoaiCT",
		align: "center",
	},
	{
		key: "nguoiTao",
		title: "Người gửi",
		dataIndex: "nguoiTao",
		align: "center",
	},
	{
		key: "thoiGianTao",
		title: "Thời gian tạo",
		dataIndex: "thoiGianTao",
		align: "center",
	},
	{
		key: "maTT",
		title: "Trạng thái",
		dataIndex: "maTT",
		align: "center",
		render: (text) => {
			return text == "Đang chờ" ? (
				<span style={{ color: "#D1D100" }}>{text}</span>
			) : text == "Đồng ý" ? (
				<span style={{ color: "#00FF00" }}>{text}</span>
			) : text == "Từ chối" ? (
				<span style={{ color: "#FF0000" }}>{text}</span>
			) : text == "Đã hủy" ? (
				<span style={{ color: "#808080" }}>{text}</span>
			) : (
				<span>N/A</span>
			);
		},
	},
	{
		key: "detail",
		title: "Chi tiết",
		dataIndex: "detail",
		align: "center",
		render: (text, record) =>
			record.maTT === "Đang chờ" ? (
				<Link className="link" to={`/chitietchungtu/${record.maCT}/duyetCT`}>
					<Button style={{ width: "70px" }}>Duyệt</Button>
				</Link>
			) : (
				<Link className="link" to={`/chitietchungtu/${record.maCT}/xemCT`}>
					<Button style={{ width: "70px" }}>Xem</Button>
				</Link>
			),
	},
];

export const columnduyet = [
	{
		key: "maCT",
		title: "Mã chứng từ",
		dataIndex: "maCT",
		align: "center",
	},
	{
		key: "maLoaiCT",
		title: "Loại chứng từ",
		dataIndex: "maLoaiCT",
		align: "center",
	},
	{
		key: "nguoiTao",
		title: "Người gửi",
		dataIndex: "nguoiTao",
		align: "center",
	},
	{
		key: "thoiGianTao",
		title: "Thời gian tạo",
		dataIndex: "thoiGianTao",
		align: "center",
	},
	{
		key: "maTT",
		title: "Trạng thái",
		dataIndex: "maTT",
		align: "center",
		render: (text) => {
			return text == "Đang chờ" ? (
				<span style={{ color: "#D1D100" }}>{text}</span>
			) : text == "Đồng ý" ? (
				<span style={{ color: "#00FF00" }}>{text}</span>
			) : text == "Từ chối" ? (
				<span style={{ color: "#FF0000" }}>{text}</span>
			) : text == "Đã hủy" ? (
				<span style={{ color: "#808080" }}>{text}</span>
			) : (
				<span>N/A</span>
			);
		},
	},
	{
		key: "detail",
		title: "Chi tiết",
		dataIndex: "detail",
		align: "center",
		render: (text, record) => {
			return record.status == "Đang chờ" ? (
				<Button style={{ width: "70px" }}>Duyệt</Button>
			) : (
				<Button style={{ width: "70px" }}>Xem</Button>
			);
		},
	},
];

export const daDuyet = [
	{
		maCT: "CT12230001",
		maLoaiCT: "Đơn xin nghỉ phép",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "10/12/2023 - 8:30 AM",
		maTT: "Đang chờ",
	},
	{
		maCT: "CT12230002",
		maLoaiCT: "Đề xuất khuyến mãi",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "10/12/2023 - 8:10 AM",
		maTT: "Đồng ý",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
	{
		maCT: "CT12230003",
		maLoaiCT: "Đề xuất bảo dưỡng",
		nguoiTao: "Duy Lân - 227001",
		thoiGianTao: "8/12/2023 - 9:30 AM",
		maTT: "Từ chối",
	},
];
