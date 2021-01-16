import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './screens/Join/Join'
import Chat from './screens/Chat/Chat'

const App = () => (
    <Router>
        <Route path='/' exact component={Join}></Route>
        <Route path='/chat' component={Chat}></Route>
    </Router>
)

export default App