import {ConvexProvider} from "convex/react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {convex} from "../recipes/convex/convex.ts";


createRoot(document.getElementById('root')).render(
<ConvexProvider client={convex}>   <App />
</ConvexProvider>


)
