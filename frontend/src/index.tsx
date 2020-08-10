import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './styles/common.scss';
import './styles/reset.scss';

import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
