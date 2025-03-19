import { ConvexProvider, ConvexReactClient } from "convex/react";
import {api} from "./_generated/api";

const convex = new ConvexReactClient("https://beloved-horse-349.convex.cloud");

export { convex, ConvexProvider,api };
