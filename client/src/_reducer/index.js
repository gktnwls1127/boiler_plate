import { combineReducers } from 'redux'
import user from './user_reducer'

const rootReducer = combineReducers({ // 여러가지의 reducer을 합쳐서 rootReducer로 만듬
    user
})

export default rootReducer;