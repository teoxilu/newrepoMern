import React, { useEffect, Suspense } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';

import { DefaultLayout } from '~/layouts';
import { publicRoutes } from '~/routes';

const App = () => {
    const dispatch = useDispatch();

    //check Firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log('user', user);

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        //cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Suspense
            fallback={
                <div className="col text-center p-5">
                    __ React Redux EC
                    <LoadingOutlined /> MMERCE __
                </div>
            }
        >
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            let CustomRoute = Route;
                            if (route.customRoute) {
                                CustomRoute = route.customRoute;
                            }

                            return (
                                <Route
                                    // exact
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Suspense>
    );
};

export default App;
