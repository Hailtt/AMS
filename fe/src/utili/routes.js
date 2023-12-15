import Layout from "../Layout/Layout";
import Empty from "../Layout/Empty";
import CreateChungTu from "../Page/CreateChungTu/CreateChungTu";
import Login from "../Page/Login/Login";
import DetailChungTu from "../Page/DetailChungTu/DetailChungTu";
import PageFormChungTu from "../Page/PageFormChungTu/PageFormChungTu";
import QuanLyChungTu from "../Page/QuanLyChungTu/QuanLyChungTu";

export const PrivateRoutes = [
	{
		path: "/",
		component: CreateChungTu,
		layout: Layout,
	},
	{
		path: "/detailchungtu",
		component: DetailChungTu,
		layout: Layout,
	},
	{
		path: "/createchungtu",
		component: CreateChungTu,
		layout: Layout,
	},
	{
		path: "/createchungtu/formchungtu/:id/:formId",
		component: PageFormChungTu,
		layout: Layout,
	},
	{
		path: "/quanlychungtu",
		component: QuanLyChungTu,
		layout: Layout,
	},
	{
		path: "/chitietchungtu/:id/:actions",
		component: DetailChungTu,
		layout: Layout,
	},
];

export const PublicRoutes = [
	{
		path: "/login",
		component: Login,
		layout: Empty,
	},
	{
		path: "/",
		component: Login,
		layout: Empty,
	},
];
