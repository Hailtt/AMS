import React, { useEffect } from "react";

function KetQuaDuyet({ketqua}) {

    return (
        <div className="ketquaduyet"> 
            <div className="title">Người duyệt</div>

            <div className="content">
                <table>
                    {ketqua.map(i => {
                        return (
                            <React.Fragment>
                                <tr>
                                    <td className="nhanvien">
                                        <span>Nhân viên</span>
                                        <b><span>{i.nguoiDuyet}</span></b>
                                    </td>

                                    <td className="ketqua">
                                        <span>Kết quả</span>
                                        {i.ketQua === 1 ? (
                                            <b><span>Đồng ý</span></b>
                                        ) : i.ketQua === 0 ? (
                                            <b><span>Từ chối</span></b>
                                        ) : <b><span>...</span></b>}
                                    </td>

                                    <td className="thoigianduyet">
                                        <span>Thời gian</span>
                                        {i.thoiGianDuyet === null ? (
                                            <b><span>...</span></b>
                                        ) : <b><span>{i.thoiGianDuyet}</span></b>}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default KetQuaDuyet;