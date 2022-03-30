import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import MainDetail from './pages/Main/Detail';
import MainAdd from './pages/Main/Add';

import Login from './pages/Auth/Login';
import Join from './pages/Auth/Join';

import Community from './pages/Community/Community';
import CommunityAdd from './pages/Community/Add';
import COmmunityDetail from './pages/Community/Detail';

import JobPosting from './pages/JobPosting/JobPosting';
import JobPostingAdd from './pages/JobPosting/Add';
import JobPostingDetail from './pages/JobPosting/Detail';

import ProfileDetail from './pages/Profile/Detail';

import AddAdmin from './pages/Admin/Add';

import NoAccess from './pages/NoAccess';

import 'react-datepicker/dist/react-datepicker.css';

import Header from './components/Ui/Header';

import PrivateRoute from './components/Route/PrivateRoute';
import AdminRoute from './components/Route/AdminRoute';

import Loading from './components/Ui/Loading';

import { useSelector, useDispatch } from 'react-redux';
import uiSlce from './slices/ui';
import userSlice from './slices/user';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const AppInner = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  //api 요청 후 accessToekn이 유효하지 않다면 재발급 후 다시 요청, refreshToken이 유효하지 않다면 사용자에게 다시 로그인 요청
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;

        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const type = error.response.data.type;

            if (type === 'refresh') {
              dispatch(userSlice.actions.initUser());
              alert('다시 로그인해주세요.');
              return;
            } else if (type === 'access') {
              const originalRequest = config;
              const refreshToken = localStorage.getItem('refreshToken');

              const {
                data: { data },
              } = await axios.post(
                'api/token/refresh-token',
                {},
                {
                  headers: {
                    authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
                  },
                }
              );

              //새로운 토큰 저장
              dispatch(userSlice.actions.setAccessToken(data));
              //419 요청에 실패했던 요청 새로운 토큰으로 재요청
              originalRequest.headers.authorization = `${process.env.REACT_APP_JWT_KEY} ${data.accessToken}`;

              return axios(originalRequest);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  //localStorage가 존재한다면 유효한지 판단 후 자동 로그인
  useEffect(() => {
    const requestVerifyRefreshToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return;
      }

      try {
        const {
          data: { isValid },
        } = await axios.post(
          'api/token/verify/refresh-token',
          {},
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
            },
          }
        );

        if (!isValid) {
          throw new Error('Pass');
        }

        const {
          data: { data },
        } = await axios.post(
          'api/token/refresh-token',
          {},
          {
            headers: {
              authorization: `${process.env.REACT_APP_JWT_KEY} ${refreshToken}`,
            },
          }
        );

        //새로운 토큰 저장
        dispatch(userSlice.actions.setUser(data));
      } catch (error) {
        localStorage.removeItem('refreshToken');
      } finally {
        console.log('finally');
      }
    };

    requestVerifyRefreshToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main/detail/:id" element={<MainDetail />} />
        <Route element={<AdminRoute />}>
          <Route path="/main/add" element={<MainAdd />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/detail/:id" element={<COmmunityDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/community/add" element={<CommunityAdd />} />
        </Route>
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/jobposting/detail/:id" element={<JobPostingDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/jobposting/add" element={<JobPostingAdd />} />
        </Route>
        <Route path="/profile/detail/:id" element={<ProfileDetail />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/add" element={<AddAdmin />} />
        </Route>
        <Route path="/noaccess" element={<NoAccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppInner;
