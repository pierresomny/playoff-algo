import {ReactElement} from "react";
import {useParams} from "react-router-dom";

/**
 * Exercise component
 * @constructor
 */
export const Exercise = (): ReactElement => {
	const {exerciseUid} = useParams<{ exerciseUid: string }>();
	return <div>
		{`${exerciseUid}`}
	</div>
}