import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import DaftarBerita from './pages/DaftarBerita.jsx';
import BeritaDetail from './pages/BeritaDetail.jsx';
import Profil from './pages/Profil.jsx';
import Struktur from './pages/Struktur.jsx';
import StrukturOrganisasi from './pages/StrukturOrganisasi.jsx';
import MOTS from './pages/MOTS.jsx';
import IAR from './pages/IAR.jsx';
import ISR from './pages/ISR.jsx';
import REOR from './pages/REOR.jsx';
import SFRSOR from './pages/SFRSOR.jsx';
import Contact from './pages/Contact';
import Artikel from './pages/BeritaDetail.jsx';
import GaleriFoto from './pages/GaleriFoto.jsx';
import GaleriVideo from './pages/GaleriVideo.jsx';
import Layout from './components/Layout.jsx';
import AdminPrivateRoute from './AdminPrivateRoute.jsx';
import CMSNews from './pages/CMSNews.jsx';
import Login from './pages/Login.jsx';
import CMSHome from './cms/home';
import BeritasTable from './cms/beritas';
import CreateBerita from './cms/beritas/create';
import UpdateBerita from './cms/beritas/update';
import IARTable from './cms/iar/index.jsx';
import StrukturTable from './cms/strukturs/index.jsx';
import CreateStrukturPengurus from './cms/strukturs/create.jsx';
import UpdateStrukturPengurus from './cms/strukturs/update.jsx';
import { AuthProvider } from './AuthContext.js';


ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/admin" element={<AdminPrivateRoute component={CMSHome}/>} />
            <Route path="/admin/berita" element={<AdminPrivateRoute component={BeritasTable}/>} />
            <Route path="/admin/berita/create" element={<AdminPrivateRoute component={CreateBerita}/>} />
            <Route path="/admin/berita/edit/:id" element={<AdminPrivateRoute component={UpdateBerita}/>} />
            <Route path="/admin/iar" element={<AdminPrivateRoute component={IARTable}/>} />
            <Route path="/admin/struktur" element={<AdminPrivateRoute component={StrukturTable}/>} />
            <Route path="/admin/struktur/create" element={<AdminPrivateRoute component={CreateStrukturPengurus}/>} />
            <Route path="/admin/struktur/update" element={<AdminPrivateRoute component={UpdateStrukturPengurus}/>} />

            <Route path="/" element={<App />} />
            <Route path="/berita" element={<DaftarBerita />} />
            <Route path="/berita/:id" element={<BeritaDetail />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/struktur-pengurus" element={<Struktur />} />
            <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
            <Route path="/mots" element={<MOTS />} />
            <Route path="/iar" element={<IAR />} />
            <Route path="/isr" element={<ISR />} />
            <Route path="/reor" element={<REOR />} />
            <Route path="/sfrsor" element={<SFRSOR />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/galeri-foto" element={<GaleriFoto />} />
            <Route path="/galeri-video" element={<GaleriVideo />} />
            <Route path="/cms-news" element={<CMSNews />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>

);
