
import Header from './Componets/Header';
import Footer from './Componets/Footer';
import HomePage from './Componets/HomePage';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import LoginPage from './Componets/LoginPage';
import Profile from './Componets/Profile';
import RegisterScreen from './Componets/RegisterScreen';
import SearchVeteran from './Componets/SearchVeteran';
import VeteranWall from './Componets/VeteranWall';
import Following from './Componets/Following';
import RegisterOrg from './Componets/RegisterOrg';
import OrgHomePage from './Componets/OrgHomePage';  
import LoginOrg from './Componets/LoginOrg';
import Invites from './Componets/Invites';
import CreateEvent from './Componets/CreateEvent';
import SearchEvents from './Componets/SearchEvents';
import EventPage from './Componets/EventPage';
import SendInvitePage from './Componets/SendInvitePage';
import CreatedEventPage from './Componets/CreatedEventPage';
import InterestedEvents from './Componets/InterestedEvents';
function App() {
  return (
    <Router>

    <Header></Header>
    
    <main className='py-3' >
   <Container>
    <Routes>
    <Route path='/'  element={<LoginPage/>} />
    <Route path='/HomePage'  element={<HomePage/>} />
    <Route path='/profile'  element={<Profile/>} />
    <Route path='/register' element={<RegisterScreen/>} />
    <Route path='/SearchVeteran' element={<SearchVeteran/>} />
    <Route path='/SearchVeteran/:Keyword' element={<SearchVeteran/>} />
    <Route path='/veteran/:id' element={<VeteranWall/>} />
    <Route path='/Following' element={<Following/>} />
    <Route path='/RegisterOrg' element={<RegisterOrg/>} /> 
    <Route path='/OrgHomePage' element={<OrgHomePage/>} /> 
    <Route path='/loginOrg' element={<LoginOrg/>} /> 
    <Route path='/Invites' element={<Invites/>} /> 
    <Route path='/CreatEvent' element={<CreateEvent/>} /> 
    <Route path='/SerachEvent' element={<SearchEvents/>} />
    <Route path='/event/:id' element={<EventPage/>} />
    <Route path='/sendInvite/:id' element={<SendInvitePage/>} />
    <Route path='/CreatedEvents' element={<CreatedEventPage/>} />
    <Route path='/InteresetedEvents' element={<InterestedEvents/>} />


    </Routes>
    </Container>
    </main>
    
    <Footer></Footer>

    </Router>
  );
}

export default App;
