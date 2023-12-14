import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ButtonContainer({ avail, id }) {

    const navigate = useNavigate();

    const huyChungTu = async() => {
        const res = window.confirm("Bạn có chắc muốn hủy chứng từ?")
        if (res) {
            let data = await new Promise((resolve, reject) => {
                axios.get(`${process.env.REACT_APP_BE_URL}/chung-tu/huy-chung-tu/${id}`)
                    .then(data => resolve(data))
                    .catch(err => reject(err))
            })
            navigate("/quanlychungtu");
        }
    }

    return (
        <div className='button-container'>
            {avail ? <Button onClick={huyChungTu} className='button' danger>Hủy chứng từ</Button> : <Button onClick={huyChungTu} className='button' danger disabled>Hủy chứng từ</Button>}
        </div>
    )
}

export default ButtonContainer;