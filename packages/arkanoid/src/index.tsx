import {createRoot} from 'react-dom/client';
import {Application} from './components/application/Application';
import './index.module.scss'

const container = document.getElementById('application')
const root = createRoot(container!)
root.render(<Application/>)