import { configureStore } from "@reduxjs/toolkit";
import { Store } from "./AthunkStore";
import { ReportReducer } from "./Report";

export const configstore = configureStore({reducer:{Store ,ReportReducer}})
