import React from 'react'
import { Link } from 'react-router-dom'
import classes from './FinishedQuiz.css'
import Button from '../../components/UI/Button/Button'

const FinishedQuiz = props => {
    let res = [...props.results]
    const success = res.filter(c => c === 'success')

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    console.log(index);

                    const cls = [
                        'fa',
                        props.results[index] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[index]]
                    ];

                    return (
                        <li key={index}>
                            <strong>{index + 1} </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p>Правильно {success.length} из {props.results.length}</p>
            <Button onClick={props.onRetry} type={'primary'}>Повтарить</Button>
            <Link to="/">
                <Button type={'success'}>Перейти в список тестов</Button>
            </Link>

        </div>
    )
}

export default FinishedQuiz