import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label: 'Список', exаct: true},
    {to: '/auth', label: 'Авторизация', exаct: false},
    {to: '/quiz-creator', label: 'Создать тест', exаct: false}
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLink() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                    to={link.to}
                    exact={link.exаct}
                    activeClassName={classes.activ}
                    onClick={this.clickHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLink()}
                    </ul>
                </nav>
              {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null} 
            </React.Fragment>
        );
    }
}

export default Drawer;