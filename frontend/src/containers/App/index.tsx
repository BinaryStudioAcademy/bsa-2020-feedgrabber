import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import {history} from '../../helpers/history.helper';
import {store} from '../../store';
import Routing from 'containers/Routing';
import SubdomainRouter from "../../components/helpers/SubdomainRouter";
import {I18nextProvider} from "react-i18next";
import i18n from "../../localization/i18n";

const App: React.FC = () => (
        <Scrollbars autoHide>
            <Provider store={store}>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-right"
                        getState={state => state.toastr}
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        closeOnToastrClick
                    />
                <I18nextProvider i18n={i18n}>
                    <SubdomainRouter>
                        <Router history={history}>  <Routing/>
                        </Router>
                    </SubdomainRouter>
                </I18nextProvider>
            </Provider>
        </Scrollbars>
);

export default App;
