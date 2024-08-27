import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home.tsx";
import {ReactElement} from "react";
import {Playoff} from "./pages/playoff/Playoff.tsx";
import {Exercise} from "./pages/playoff/exercise/Exercise.tsx";

export const App = (): ReactElement => {
	
	return (
		<Routes>
			<Route path={'/'} element={<Home/>}/>
			<Route path={'playoff/:playoffUid'} element={<Playoff/>}>
				<Route path={':exerciseUid'} element={<Exercise/>}/>
			</Route>
		</Routes>
	)
}
