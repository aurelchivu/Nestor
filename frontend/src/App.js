import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GroupCreateScreen from './screens/GroupCreateScreen';
import GroupContentScreen from './screens/GroupContentScreen';
import GroupEditScreen from './screens/GroupEditScreen'
import GroupsListScreen from './screens/GroupsListScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PeopleByGroupScreen from './screens/PeopleByGroupScreen';
import PeopleEditScreen from './screens/PeopleEditScreen';
import PeopleListScreen from './screens/PeopleListScreen';
import PeopleCreateScreen from './screens/PeopleCreateScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/groups/:id/edit' component={GroupEditScreen} exact />
          <Route
            path='/groups/:id/content'
            component={GroupContentScreen}
            exact
          />
          <Route
            path='/groups/creategroup'
            component={GroupCreateScreen}
            exact
          />
          <Route
            path='/groups/:name/people'
            component={PeopleByGroupScreen}
            exact
          />
          <Route path='/groups' component={GroupsListScreen} exact />
          <Route
            path='/people/createpeople'
            component={PeopleCreateScreen}
            exact
          />
          <Route path='/people/:id/edit' component={PeopleEditScreen} exact />
          <Route path='/people' component={PeopleListScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

