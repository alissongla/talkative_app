import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/modules';
import Lessons from './pages/lessons';
import Exercise from './pages/exercises';

const Routes = createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
    Main,
    Lessons,
    Exercise,
  })
);

export default Routes;