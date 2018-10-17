import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import { setToken } from './actions/auth';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

store.dispatch(setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4MWVjMDUyN2YwMWUwMDM5OTAwNTdmZmYyOTMyMTNkYzBiZjkzMzg4N2RhNGE3MjczNThlNGI3N2EwNmVkNTM1MTM0YjEzNmUwMWQ4ZDEwIn0.eyJhdWQiOiIxIiwianRpIjoiNzgxZWMwNTI3ZjAxZTAwMzk5MDA1N2ZmZjI5MzIxM2RjMGJmOTMzODg3ZGE0YTcyNzM1OGU0Yjc3YTA2ZWQ1MzUxMzRiMTM2ZTAxZDhkMTAiLCJpYXQiOjE1Mzk3NzcwNzIsIm5iZiI6MTUzOTc3NzA3MiwiZXhwIjoxNTcxMzEzMDcyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.EB-stF6cUi5yU1XG5jW0u9ZomAPMigcbVxwF6-rgLe88Zr2Pw9_tCa-AThddw3hm19IYxDQOCxUJFPnRqtK72PXywJ0w64CFxMQboDEJe1yXSiDNWd-y8bSriJbN6omHAmtZwy6dgdBWK_T_eIposGPQ8wRTjC1f74BSfT3psILLkB8aSWtprecwqdNgKTTSAGlIP4BM5PuLgUjNJ9cQ5ZfXKFKYXlBLM3vVeANsD5aHzxvvtEJ6Fxk8xup4hufzHeL8AzuIQToAlflrEJHYaD3EnXa7klQqfJf05-TRJN54aSqmHZjMJjGdcGUnXNfdHKd3388nVs4-AEMxblGf7g5TWOOXd6NxdSo6YH4lgjomRvPljuRBQubUmBMH4tcnuqYynxZ116ffjcVPTedIJJ_FLNyI3APwQNV2H09lUZu3FAuU2BYalHxCIfjmHl_2Y0u88uljzjiPAvw0fmnPF2_uE_YTt6nWI1TajgYHnGZ_3-VOzzmkCY5UOQfKUkrmnjlAGpzvPYPVWHc9NdHOC5BsXsMZ8vIxmcyXac4hRTOC0oXDY_cNt6K6MwGkt8yIDmqk3IBNgOREACu2FNTU4hiFcylx4FeTL8JKJLAUOq_-Ik1iqFTkbOmQHeNqjJhEJelC13X6rcgd4QPNrrXIoQrPxmsae5CRwmRLtUMv1-4'));
ReactDOM.render(jsx, document.getElementById('app'));