import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import {history} from '../../helpers/history.helper';
import {store} from '../../store';
import Routing from 'containers/Routing';
import SubdomainRouter from "../../components/SubdomainRouter";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {I18nextProvider} from "react-i18next";
import i18n from "../../localization/i18n";

const App: React.FC = () => (
    <DndProvider backend={HTML5Backend} >
        <Scrollbars autoHide>
            <Provider store={store}>
                <I18nextProvider i18n={i18n} >
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
                    <SubdomainRouter>
                        <Router history={history}>  <Routing/>
                        </Router>
                    </SubdomainRouter>
                </I18nextProvider>
            </Provider>
        </Scrollbars>
    </DndProvider>
);

export default App;
