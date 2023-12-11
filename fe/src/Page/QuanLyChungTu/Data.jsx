import { Button } from "antd"
import { Link } from "react-router-dom";

export const status = ["Đang chờ", "Đồng ý", "Từ chối", "Đã hủy"];

export const columntao = [
    {
        key: "maCT",
        title: "Mã chứng từ",
        dataIndex: "maCT",
        align: "center"
    },
    {
        key: "maLoaiCT",
        title: "Loại chứng từ",
        dataIndex: "maLoaiCT",
        align: "center"
    },
    {
        key: "nguoiTao",
        title: "Người gửi",
        dataIndex: "nguoiTao",
        align: "center"
    },
    {
        key: "thoiGianTao",
        title: "Thời gian tạo",
        dataIndex: "thoiGianTao",
        align: "center"
    },
    {
        key: "maTT",
        title: "Trạng thái",
        dataIndex: "maTT",
        align: "center",
        render: (text) => {
            return text == "Đang chờ" ? <span style={{color: "#D1D100"}}>{text}</span>
            : text == "Đồng ý" ? <span style={{color: "#00FF00"}}>{text}</span>
            : text == "Từ chối" ? <span style={{color: "#FF0000"}}>{text}</span>
            : text == "Đã hủy" ? <span style={{color: "#808080"}}>{text}</span>
            : <span>N/A</span>
        }
    },
    {
        key: "detail",
        title: "Chi tiết",
        dataIndex: "detail",
        align: "center",
        render: () => <Link className="link" to="/chitietchungtu"><Button style={{width: "70px"}}>Xem</Button></Link>
    },
]

export const columnduyet = [
    {
        key: "maCT",
        title: "Mã chứng từ",
        dataIndex: "maCT",
        align: "center"
    },
    {
        key: "maLoaiCT",
        title: "Loại chứng từ",
        dataIndex: "maLoaiCT",
        align: "center"
    },
    {
        key: "nguoiTao",
        title: "Người gửi",
        dataIndex: "nguoiTao",
        align: "center"
    },
    {
        key: "thoiGianTao",
        title: "Thời gian tạo",
        dataIndex: "thoiGianTao",
        align: "center"
    },
    {
        key: "maTT",
        title: "Trạng thái",
        dataIndex: "maTT",
        align: "center",
        render: (text) => {
            return text == "Đang chờ" ? <span style={{color: "#D1D100"}}>{text}</span>
            : text == "Đồng ý" ? <span style={{color: "#00FF00"}}>{text}</span>
            : text == "Từ chối" ? <span style={{color: "#FF0000"}}>{text}</span>
            : text == "Đã hủy" ? <span style={{color: "#808080"}}>{text}</span>
            : <span>N/A</span>
        }
    },
    {
        key: "detail",
        title: "Chi tiết",
        dataIndex: "detail",
        align: "center",
        render: (text, record) => {
            return record.status == "Đang chờ" ? <Button style={{width: "70px"}}>Duyệt</Button>
            : <Button style={{width: "70px"}}>Xem</Button>
        }
    },
]

export const daDuyet = [
    {
        id: "CT12230001",
        type: "Đơn xin nghỉ phép",
        nguoigui: "Duy Lân - 227001",
        ngaytao: "10/12/2023 - 8:30 AM",
        ngayduyet: "N/A",
        status: "Đang chờ",
    },
    {
        id: "CT12230002",
        type: "Đề xuất khuyến mãi",
        nguoigui: "Duy Lân - 227001",
        ngaytao: "10/12/2023 - 8:10 AM",
        ngayduyet: "12/12/2023 - 12:00 PM",
        status: "Đồng ý",
    },
    {
        id: "CT12230003",
        type: "Đề xuất bảo dưỡng",
        nguoigui: "Duy Lân - 227001",
        ngaytao: "8/12/2023 - 9:30 AM",
        ngayduyet: "10/12/2023 - 12:00 PM",
        status: "Từ chối",
    },
]