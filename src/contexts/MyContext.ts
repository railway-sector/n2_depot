import { createContext } from "react";

type MyDropdownContextType = {
  buildingnames: any;
  updateBuildingName: any;
};

const initialState = {
  buildingnames: undefined,
  updateBuildingName: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
