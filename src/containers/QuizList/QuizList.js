import React from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import classes from './QuizList.css'

class QuizList extends React.Component {

    state = {
        quizes: []
    }

    renderQuizes() {
        return this.state.quizes.map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`https://quiz-react-eac5d.firebaseio.com/quiz.json`)
            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Тест ${index + 1}`
                })
            }
            )

            this.setState({
                quizes: quiz
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <h1>Список тестов</h1>
                <ul>
                    {this.renderQuizes()}
                </ul>
            </div>
        );
    }
};

export default QuizList;