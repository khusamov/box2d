import {createRoot} from 'react-dom/client';
import './index.module.scss'
import {Application} from './components/Application/Application';

const container = document.getElementById('application')
const root = createRoot(container!)
root.render(<Application/>)