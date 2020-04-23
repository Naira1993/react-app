import React from 'react';
import { Route } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';



class App extends React.Component {
  render() {
    return (
      <Layout>
        <Route path="/" component={QuizList} exact/>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
      </Layout>
    );
  }

}

export default App;
