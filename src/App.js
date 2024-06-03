import React, { useState, useEffect }  from 'react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './StateManagement/Store';
import  WarningBox  from './StateManagement/Warning';
import { useSelector } from 'react-redux';
import { setServerDown } from './StateManagement/ServerStatusActions';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { Navbar, Footer } from './LandingPage/layout';
import { Home } from './LandingPage/homepage';

import { CharacterDetails, Characters } from './Components/Character/Characters';
import { CharacterForm } from './Components/Character/CharacterForm';
import { CharacterEdit } from './Components/Character/CharacterEdit';
import { ChartPage } from './Components/Chart/Chart';

import { Genres, GenreDetails } from './Components/Genres/Genres';
import { GenreForm } from './Components/Genres/GenreForm';
import { GenreEdit } from './Components/Genres/GenreEdit';



import CssBaseline from '@mui/material/CssBaseline';
import { fetchCharacters } from './StateManagement/CharacterActions';

import { Authorisation } from './Security/Authorisation';
import { PrivateRoute } from './Security/Routing';
import { Profile } from './LandingPage/ProfilePage';
// import { deleteAllFromJsonServer } from './LocalDB/LocalOperations';

export function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isWarningVisible, setIsWarningVisible] = useState(!isOnline);

  const isServerDown = useSelector(state => state.serverStatus.isServerDown);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();



  useEffect(() => {
    var  socket = new SockJS('http://localhost:8082/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('WebSocket connection established');

        stompClient.subscribe('/topic/newCharacter', (message) => {
            dispatch(fetchCharacters());
        });
        
        return () => {
            stompClient.disconnect();
        };
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
    });
}, [dispatch]);


  useEffect(() => {
    const handleOnlineStatusChange = () => {
      const online = navigator.onLine;
      console.log('Online status changed:', online);
      setIsOnline(online);
      setIsWarningVisible(!online && !isServerDown); 
      console.log('Warning visibility:', !online && !isServerDown);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [isServerDown]); 

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:8082/characters'); 
        
        // const response = await dispatch(fetchCharacters());

        if (response.error) {
          console.log('Server is down');
          dispatch(setServerDown(true));
          setIsWarningVisible(true);
        } else {
          console.log('Server is up');
          dispatch(setServerDown(false));
          setIsWarningVisible(!isOnline); 
          // deleteAllFromJsonServer();
        }
      } catch (error) {
        dispatch(setServerDown(true));
        setIsWarningVisible(true);
      }
    };

    checkServerStatus();

    const intervalId = setInterval(checkServerStatus, 1500); 

    return () => {
      clearInterval(intervalId);
    };
  }, [isOnline, dispatch]);


  


  
  return (
    <>
      <CssBaseline />
        <Provider store={store}>
          <WarningBox isVisible={isWarningVisible} message={isServerDown ? "Server is down, we're trying to get it back up!" 
                                                                        : "Internet connection lost, we're trying to find it!"} />
          <Router>
            <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home/>}/>

                  <Route exact path="/characters" element={<PrivateRoute/>}>
                    <Route path="/characters" element={<Characters />}/>
                  </Route>

                  <Route exact path="/characters/:id" element={<PrivateRoute/>}>
                    <Route path="/characters/:id" element={<CharacterDetails/>}/>
                  </Route>

                  <Route exact path="/characters/add" element={<PrivateRoute/>}>
                    <Route path="/characters/add" element={<CharacterForm/>}/>
                  </Route>

                  <Route exact path="/characters/edit/:id" element={<PrivateRoute/>}>
                    <Route path="/characters/edit/:id" element={<CharacterEdit/>}/>
                  </Route>

                  <Route exact path="/characters/chart" element={<PrivateRoute/>}>
                    <Route path="/characters/chart" element={<ChartPage/>}/>
                  </Route>

                  <Route exact path="/genres" element={<PrivateRoute/>}>
                    <Route path="/genres" element={<Genres/>}/>
                  </Route>

                  <Route exact path="/genres/:id" element={<PrivateRoute/>}>
                    <Route path="/genres/:id" element={<GenreDetails/>}/>
                  </Route>

                  <Route exact path="/genres/add" element={<PrivateRoute/>}>
                    <Route path="/genres/add" element={<GenreForm/>}/>
                  </Route>

                  <Route exact path="/genres/edit/:id" element={<PrivateRoute/>}>
                    <Route path="/genres/edit/:id" element={<GenreEdit/>}/>
                  </Route>

                  <Route exact path="/profile" element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Profile/>}/>
                  </Route>

                  <Route path='/auth/login' element={<Authorisation action="login"/>} />
                  <Route path='/auth/register' element={<Authorisation action="register"/>} />
                </Routes>
      
          
            <Footer />
          </Router>
        </Provider>
      </>
  );
}
