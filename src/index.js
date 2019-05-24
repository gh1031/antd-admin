import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RouteConfig from './router';

ReactDOM.render(RouteConfig, document.getElementById('root'));
registerServiceWorker();
