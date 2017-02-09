import React from 'react'
import ReactDOM from 'react-dom'

import Todo from './component/todo'

class App extends React.Component {
    render () {
        return (
            <div className='page-wrapper' style={{padding: '14px'}}>
                <Todo />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
