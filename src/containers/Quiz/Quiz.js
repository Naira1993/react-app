import React, { Component } from "react";
import axios from 'axios';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActivQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        results: [],
        quizes: [
            // {
            //     question: 'Какого цвета небо?',
            //     rightAnswerId: 2,
            //     id: 1,
            //     answers: [
            //         { text: 'Черный', id: 1 },
            //         { text: 'Синий', id: 2 },
            //         { text: 'Красный', id: 3 },
            //         { text: 'Зеленый', id: 4 }
            //     ]
            // },
            // {
            //     question: 'В каком году основали Санкт-Петербург?',
            //     rightAnswerId: 3,
            //     id: 2,
            //     answers: [
            //         { text: '1700', id: 1 },
            //         { text: '1705', id: 2 },
            //         { text: '1703', id: 3 },
            //         { text: '1803', id: 4 }
            //     ]
            // }
        ]
    }
    async componentDidMount() {
         try {
            const response = await axios.get(`https://quiz-react-eac5d.firebaseio.com/quiz/${this.props.match.params.id}.json`)
            const quizes = response.data
            this.setState({
                quizes
            })
        } catch (error) {
            console.log(error);
        }
    }

    onAnswerClickHandler = (answerId) => {
        const id = this.state.activeQuestion
        console.log(id);
        
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quizes[this.state.activeQuestion];
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if(!results[id]) {
                results.push('success')
            }


            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

        } else {
            results.push('error')
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
        const timeout = window.setTimeout(() => {
            if (this.isQuizeFinish()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout)
        }, 1000)
    }

    isQuizeFinish() {
        return this.state.activeQuestion + 1 === this.state.quizes.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: []
        })
    } 

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        !this.state.quizes.length ? null :
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quizes}
                                onRetry={this.retryHandler}
                            /> 
                            : < ActiveQuiz
                                answers={this.state.quizes[this.state.activeQuestion].answers}
                                question={this.state.quizes[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quizes.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz