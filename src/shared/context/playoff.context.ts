import {createContext} from "react";
import {Playoff} from "@playoff/core/model/playoff.model.ts";

export type PlayoffContextType = {
	playoff?: Playoff
}

export const PlayoffContext = createContext<PlayoffContextType>({})