import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
// import OverView from './OverView'
// import QuickStart from './QuickStart'
//import HandleFocus from './HandleFocus'
import Basic from './Basic'
//import Card from './Card'
import Shadcn from './Shadcn'
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Shadcn />
    </React.StrictMode>
)
