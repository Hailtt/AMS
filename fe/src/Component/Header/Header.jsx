import {
    HomeFilled,
    BellOutlined,
    UserOutlined
} from '@ant-design/icons';
import {List} from "./List.js"

function Header() {
    return(
        <header>
            <div className="left-side">
                <div className='home'>
                    <HomeFilled style={{fontSize: 19}}/>
                    <h3>AMS</h3>
                </div>

                <nav>
                    <ul className='list'>
                        {List.map(i => (
                            <li className='item' key={i.key}>{i.name}</li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="right-side">
                <BellOutlined style={{fontSize: 27}}/>
                <UserOutlined style={{fontSize: 27}}/>
            </div>
        </header>
    )
}

export default Header