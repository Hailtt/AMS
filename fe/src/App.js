import "./SCSS/main.scss";
import Loading from "./Page/Loading/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { PrivateRoutes, PublicRoutes } from "./utili/routes";

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setIsLogin(localStorage.getItem("myToken"));
		if (localStorage.getItem("myToken")) {
			setIsLogin(true);
		}
	}, []);
	return (
		<div>
			{loading && <Loading />}
			{isLogin ? (
				<Routes>
					{PrivateRoutes.map((route, index) => {
						let DefaultLayout = Fragment;
						if (route.layout !== null) {
							DefaultLayout = route.layout;
						}
						const Page = route.component;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<DefaultLayout>
										<Page
											key={index}
											loading={loading}
											setLoading={setLoading}
										/>
									</DefaultLayout>
								}
							/>
						);
					})}
				</Routes>
			) : (
				<Routes>
					{PublicRoutes.map((route, index) => {
						let DefaultLayout = Fragment;
						if (route.layout === null) {
							DefaultLayout = Fragment;
						} else if (route.layout) {
							DefaultLayout = route.layout;
						}
						const Page = route.component;

						return (
							<Route
								key={index}
								path={route.path}
								element={
									<DefaultLayout>
										<Page key={index} />
									</DefaultLayout>
								}
							/>
						);
					})}
				</Routes>
			)}
		</div>
	);
}

export default App;
