import react from React;
import {
    HomeOutlined
} from '@ant-design/icons';

function Header() {
    return(
        <header>
            <div className="left-side">
                <div>
                    <HomeOutlined />
                </div>

                <div></div>
            </div>

            <div className="right-side"></div>
        </header>
    )
}