import React, { useRef, useMemo, useCallback, useReducer } from 'react'
// import Hello from './Hello'
// import Wrapper from './Wrapper'
// import './App.css'
// import Counter from './Counter'
// import InputSampleTutorial from './InputSampleTutorial'
// import InputSample from './InputSample'
import UserList from './UserList'
import CreateUser from './CreateUser'
// import Counter from './Counter'
import useInputs from './hooks/useInputs'
import produce from 'immer'

// #### React 맛보기 (1) ####
// function App() {
//   const name = 'Jinho'
//   const style= {
//     color: 'blue',
//   }
//   return (
//     <div>
//       <Hello name={name}/>
//       <Hello></Hello>
//       <div style={style}>CSS by attribute</div>
//       <div className='gray-box'>CSS by className</div>
//       <Wrapper>
//         <p>Hello!</p>
//       </Wrapper>
//       <Hello name={name} isSpecial={true}/>
//       <Hello name={name}/>  
//       <Hello isSpecial></Hello>
//     </div>
//   )
// }

// #### React 맛보기 (2) ####
// function App(){
//   return (
//     <>
//       <Counter/>
//       <hr/>
//       <InputSampleTutorial/>
//       <hr/>
//       <InputSample/>
//     </>
//   );
// }

// #### React 맛보기 (3) ####
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      // return {
      //   ...state,
      //   users: state.users.concat(action.user)
      // };

      // immer 를 사용할 지 여부는 선택사항.
      return produce(state, draft => {
        draft.users.push(action.user);
      });

      // produce가 (state, draft=>{}) 2개의 인자를 받을 경우 "2번째 함수 내에서 변경된 state 값"을 반환함
      // produce가 (draft=>{}) 1개의 인자를 받을 경우, "state를 변경하는 함수(=함수형 업데이트)"를 반환함 (state를 return할 필요는 없음)
      // 이를 이용하여 setSomething(produce(draft()=>{}))와 같이 구현 가능

    case 'TOGGLE_USER':
      // return {
      //   ...state,
      //   users: state.users.map(
      //     user => user.id === action.id ? { ...user, active: !user.active } : user
      //   )
      // }
      
      return produce(state, draft => {
        const user = draft.users.find(user=>user.id===action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // };

      return produce(state, draft => {
        const index = draft.users.findIndex(user=>user.id===action.id);
        draft.users.splice(index, 1)
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;
  // const { username, email } = state.inputs;

  const nextId = useRef(4);

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []);

  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username: username,
        email: email,
        active: false
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]);

  // Context API(UserDispatch)와 이를 참조하는 userContext를 이용하여 User 컴포넌트에서 직접 dispatch 호출

  // const onToggle = useCallback((id) => {
  //   dispatch({ type: 'TOGGLE_USER', id });
  // }, []);

  // const onRemove = useCallback((id) => {
  //   dispatch({ type: 'REMOVE_USER', id });
  // }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  )
}

export default App;
