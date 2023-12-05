import { Button } from "antd"

export const status = ["Đang chờ", "Đồng ý", "Từ chối", "Đã hủy"];

export const columntao = [
    {
        key: "id",
        title: "Mã chứng từ",
        dataIndex: "id",
        align: "center"
    },
    {
        key: "type",
        title: "Loại chứng từ",
        dataIndex: "type",
        align: "center"
    },
    {
        key: "nguoigui",
        title: "Người gửi",
        dataIndex: "nguoigui",
        align: "center"
    },
    {
        key: "ngaytao",
        title: "Thời gian tạo",
        dataIndex: "ngaytao",
        align: "center"
    },
    {
        key: "ngayduyet",
        title: "Thời gian duyệt xong",
        dataIndex: "ngayduyet",
        align: "center"
    },
    {
        key: "status",
        title: "Trạng thái",
        dataIndex: "status",
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
        render: () => <Button style={{width: "70px"}}>Xem</Button>
    },
]

export const columnduyet = [
    {
        key: "id",
        title: "Mã chứng từ",
        dataIndex: "id",
        align: "center"
    },
    {
        key: "type",
        title: "Loại chứng từ",
        dataIndex: "type",
        align: "center"
    },
    {
        key: "nguoigui",
        title: "Người gửi",
        dataIndex: "nguoigui",
        align: "center"
    },
    {
        key: "ngaytao",
        title: "Thời gian tạo",
        dataIndex: "ngaytao",
        align: "center"
    },
    {
        key: "ngayduyet",
        title: "Thời gian duyệt xong",
        dataIndex: "ngayduyet",
        align: "center"
    },
    {
        key: "status",
        title: "Trạng thái",
        dataIndex: "status",
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

export const daTao = [
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