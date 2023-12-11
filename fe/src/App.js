import "./SCSS/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import { PrivateRoutes, PublicRoutes } from "./utili/routes";

function App() {
	const [isLogin, setIsLogin] = useState(true);
	useEffect(() => {
		setIsLogin(localStorage.getItem("user"));
	}, []);
	return isLogin ? (
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
								<Page key={index} />
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
	);
}

export default App;
