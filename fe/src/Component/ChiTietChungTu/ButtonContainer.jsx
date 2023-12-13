import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ButtonContainer({ diary, ketqua, id }) {

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

    console.log("diary: ", diary)
    console.log("ketqua: ", ketqua)

    return (
        <div className='button-container'>
            <Button onClick={huyChungTu} className='button'>Hủy chứng từ</Button>
        </div>
    )
}

export default ButtonContainer;