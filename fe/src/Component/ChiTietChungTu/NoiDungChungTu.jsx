import {
    FileAddFilled
} from '@ant-design/icons';

function NoiDungChungTu() {
    return (
        <div className="NDCT">
            <div className="title">
                <h1 className="name">{`Đơn xin nghỉ phép`}</h1>

                <div className="id-container">
                    <span className="id">Mã chứng từ: <b>{`CT122300001`}</b></span>
                </div>
                
                <h4 className="status">{`ĐANG CHỜ`}</h4>
            </div>

            <div className="form-content">
                <table className='table'>

                    <tr>
                        <td>Tên</td>
                        <td><b>Duy Lân</b></td>
                    </tr>

                    <tr>
                        <td>Mã nhân viên</td>
                        <td><b>227001</b></td>
                    </tr>

                    <tr>
                        <td>Ngày tạo đơn</td>
                        <td><b>10/12/2023 -  8:30 AM</b></td>
                    </tr>

                    <tr>
                        <td>Số ngày nghỉ</td>
                        <td><b>2</b></td>
                    </tr>

                    <tr>
                        <td>Ngày bắt đầu</td>
                        <td><b>11/12/2023</b></td>
                    </tr>

                    <tr>
                        <td>Ngày kết thúc</td>
                        <td><b>13/12/2023</b></td>
                    </tr>

                    <tr>
                        <td>Lý do</td>
                        <td><b>Khám bệnh</b></td>
                    </tr>

                    <tr>
                        <td>Tài liệu đi kèm</td>
                        <td><FileAddFilled /></td>
                    </tr>

                </table>
            </div>

            <div className='duyet-info'>
                <h3 className='title'>Người duyệt</h3>
            </div>
        </div>
    )
}

export default NoiDungChungTu;