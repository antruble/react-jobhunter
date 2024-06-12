import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './views/Layout/Layout';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import AddJobPage from './views/AddJobPage';
import RegisterPage from './views/RegisterPage'
import JobDetailPage from './views/job/JobDetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
