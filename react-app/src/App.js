import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MessagePage from './components/messagePage';
import HomePage from './components/HomePage';
import GameDetailPage from './components/gameDetailPage';
import CartPage from './components/cartPage';
import Library from './components/library';
import ReviewEditForm from './components/reviewEdit';
import CartIntermediary from './components/cartIntermediary';
import FriendsList from './components/friendsList';
import AddFriendsList from './components/addFriendsPage';
function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path="/app/:gameId" exact={true}>
          <GameDetailPage />
        </Route>
        <ProtectedRoute path="/library" exact={true}>
          <Library />
        </ProtectedRoute>
        <ProtectedRoute path="/cart" exact={true}>
          <CartPage />
        </ProtectedRoute>
        <ProtectedRoute path="/cart/:gameId" exact={true}>
          <CartPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reviews/:reviewId" exact={true}>
          <ReviewEditForm />
        </ProtectedRoute>
        <ProtectedRoute path="/done" exact={true}>
          <CartIntermediary />
        </ProtectedRoute>
        <Route path="/friends" exact={true}>
          <FriendsList />
        </Route>
        <ProtectedRoute path="/addfriends" exact={true}>
          <AddFriendsList />
        </ProtectedRoute>
        <ProtectedRoute path="/messages/:friendshipId" exact={true}>
          <MessagePage />
        </ProtectedRoute>
        <Route>
          <div className='game-title'> Sorry, page not found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
