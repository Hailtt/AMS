import React, { useEffect } from "react";
import {
    CheckOutlined,
    CloseOutlined,
    LoadingOutlined
} from '@ant-design/icons';

let max = -1;

function TrackLog({diary}) {
    
    const findMax = () => {
        diary.map(i => {
            if (parseInt(i.maTrangThaiCT) > max) return max = i.maTrangThaiCT;
        })
    }

    useEffect(() => {
        findMax()
    }, [diary])

    return(
        <div className="tracklog">
            {diary.map(i => {
                if (i.maTT === "Đồng ý") {
                    return (
                        <React.Fragment>
                            <div className="dongy">
                                <CheckOutlined  className="green"/>
                                <div className="noidung">
                                    <span>{i.nguoiCapNhat + ' ' +  i.maTT + ' '}</span>
                                    <br></br>
                                    <span>{i.thoiGianCapNhat}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }

                if (i.maTT === "Từ chối") {
                    return (
                        <React.Fragment>
                            <div className="tuchoi">
                                <CloseOutlined  className="red"/>
                                <div className="noidung">
                                    <span>{i.nguoiCapNhat + ' ' +  i.maTT + ' '}</span>
                                    <br></br>
                                    <span>{i.thoiGianCapNhat}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }

                if (i.maTT === "Đã hủy") {
                    return (
                        <React.Fragment>
                            <div className="dahuy">
                                <CloseOutlined  className="gray"/>
                                <div className="noidung">
                                    <span>{i.nguoiCapNhat + ' - ' +  i.maTT + ' '}</span>
                                    <br></br>
                                    <span>{i.thoiGianCapNhat}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }

                if (parseInt(i.maTrangThaiCT) == max) {
                    if (i.maTT === "Đang chờ") {
                        return (
                            <React.Fragment>
                                <div className="latest">
                                    <LoadingOutlined/>
                                    <div className="noidung">
                                        <span><b>{i.maTT + ' - ' +  i.nguoiCapNhat + ' '}</b></span>
                                        <br></br>
                                        <span><b>{i.thoiGianCapNhat}</b></span>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                } else {
                    if (i.maTT === "Đang chờ") {
                        return (
                            <React.Fragment>
                                <div className="chitiet">
                                    {i.maTT + ' ' +  i.nguoiCapNhat + ' '}
                                    <br></br>
                                    {i.thoiGianCapNhat}
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <div className="chitiet">
                                    {i.maTT + ' - ' +  i.nguoiCapNhat + ' '}
                                    <br></br>
                                    {i.thoiGianCapNhat}
                                </div>
                            </React.Fragment>
                        )
                    }
                }
            })}
        </div>
    )
}

export default TrackLog