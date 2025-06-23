import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import QueryProvider from "./providers/QueryProvider.js";

function App() {
	return (
		<>
			<div className="wrapper">
				<QueryProvider>
					<RouterProvider router={router} />
				</QueryProvider>
			</div>
		</>
	);
}

export default App;
