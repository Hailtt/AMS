import { Button, Input } from 'antd';

function Login() {
    return (
        <div className="login">
            <h1>AMS</h1>

            <div className="form">
                <h2>Đăng nhập</h2>

                <div className="input">
                    <h4>Tên đăng nhập</h4>
                    <Input />
                </div>

                <div className="input">
                    <h4>Tên đăng nhập</h4>
                    <Input />
                </div>

                <Button type='primary'>Đăng nhập</Button>
            </div>
        </div>
    )
}

export default Login