import logo from '../../img/Logo-MWG.jpg'

function Loading() {
    return (
        <div className="loading">
            <div className="outer-line">
                <div className="inner-line">
                    <img className='logo' src={logo} />
                </div>
            </div>
        </div>
    )
}

export default Loading;