import React from 'react'

var Todo = React.createClass({
    getInitialState () {
        return {
            todos: [
                {
                    title: 'first todo',
                    completed: false
                },
                {
                    title: 'second todo',
                    completed: false
                },
                {
                    title: 'other todo',
                    completed: false
                }
            ],
            showCompletedOnly: false,
            showActiveOnly: false,
            newTodoTitle: ''
        }
    },
    handleTitleChange (e, i) {
        let { todos } = this.state
        todos[i].title = e.target.value
        this.setState({ todos })
    },
    handleDeleteClick (i) {
        let { todos } = this.state
        todos.splice(i, 1)
        this.setState({ todos })
    },
    handleToggleDone (i) {
        let { todos } = this.state
        todos[i].completed = !todos[i].completed
        this.setState({ todos })
    },
    handleFilterChange (filterType) {
        switch (filterType) {
            case 'ALL':
                this.setState({
                    showCompletedOnly: false,
                    showActiveOnly: false
                })
                break
            case 'COMPLETED':
                this.setState({
                    showCompletedOnly: true,
                    showActiveOnly: false
                })
                break
            case 'ACTIVE':
                this.setState({
                    showCompletedOnly: false,
                    showActiveOnly: true
                })
                break
            default:
                this.setState({
                    showCompletedOnly: false,
                    showActiveOnly: false
                })
        }
    },
    handleNewTodoChange (e) {
        this.setState({
            newTodoTitle: e.target.value
        })
    },
    handleAddTodoClick () {
        let { todos, newTodoTitle } = this.state
        todos.push({
            title: newTodoTitle,
            completed: false
        })
        this.setState({
            todos,
            newTodoTitle: ''
        })
    },
    clearCompletedTodos () {
        let { todos } = this.state
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                todos.splice(i, 1)
                i--
            }
        }
        this.setState({ todos })
    },
    handleKeyDown (e) {
        if (e.keyCode === 13) {
            this.handleAddTodoClick()
        }
    },
    render () {
        let { todos, showCompletedOnly, showActiveOnly, newTodoTitle } = this.state

        return (
            <div id='todos-wrapper'>
                <div className='radio-buttons control'>
                    <label className='radio'>
                        <input id='show-all' type='radio' checked={!showCompletedOnly && !showActiveOnly} onChange={() => this.handleFilterChange('ALL')} />
                        show all todos
                    </label>
                    <label className='radio'>
                        <input id='show-active' type='radio' value='show Active todos' checked={showActiveOnly} onChange={() => this.handleFilterChange('ACTIVE')} />
                        show active todos
                    </label>
                    <label className='radio'>
                        <input id='show-completed' type='radio' value='show Completed todos' checked={showCompletedOnly} onChange={() => this.handleFilterChange('COMPLETED')} />
                        show completed todos
                    </label>
                </div>
                <ul className='todos control' style={{minHeight: '300px', overflow: 'auto'}}>
                    {
                        todos.map((todo, index) => {
                            let {title, completed} = todo
                            if (showCompletedOnly && !completed) {
                                return null
                            } else if (showActiveOnly && completed) {
                                return null
                            } else {
                                return (
                                    <li key={index} className='control has-addons'>
                                        <input type='text' className='input' value={title} onChange={(e) => this.handleTitleChange(e, index)} />
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', width: '90px'}}>{completed ? 'Completed' : 'Active'}</span>
                                        <button className='button is-primary' onClick={() => this.handleToggleDone(index)} style={{width: '100px'}}>{completed ? 'Active' : 'Completed'}</button>
                                        <button className='button is-warning' onClick={() => this.handleDeleteClick(index)}>delete</button>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <button className='control button is-danger' onClick={this.clearCompletedTodos}>Clear all completed todos</button>
                <div className='new-todo-wrapper control has-addons'>
                    <input type='text' className='input' value={newTodoTitle} onChange={this.handleNewTodoChange} onKeyDown={this.handleKeyDown} placeholder='Add your todo here' />
                    <button className='button is-primary' onClick={this.handleAddTodoClick}>Add</button>
                </div>
            </div>
        )
    }
})

export default Todo
