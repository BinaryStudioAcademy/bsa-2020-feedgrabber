import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { history } from '../../helpers/history.helper';
import { store } from '../../store';
import Routing from 'containers/Routing';

const App: React.FC = () => (
    <Scrollbars autoHide>
        <Provider store={store} >
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                getState={state => state.toastr}
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                closeOnToastrClick
            />
            <Router history={history}>
                <Routing />
            </Router>
        </Provider>
    </Scrollbars>
);

export default App;