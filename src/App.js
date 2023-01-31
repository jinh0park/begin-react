import React, {useState, useRef, useMemo, useCallback} from 'react'
// import Hello from './Hello'
// import Wrapper from './Wrapper'
// import './App.css'
// import Counter from './Counter'
// import InputSampleTutorial from './InputSampleTutorial'
// import InputSample from './InputSample'
import UserList from './UserList'
import CreateUser from './CreateUser';

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
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user=>user.active).length;
}

function App(){
  const [users, setUsers] = useState([
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
  ]);

  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;

  const onChange = useCallback((e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]); // useMemo를 간단하게 쓰는 것, deps에 있는 변수가 바뀔 때에만 함수 호출

  const nextId = useRef(4); 

  const onCreate = () => {
    const newUser = {
      id: nextId.current,
      username: username,
      email: email,
      active: false
    };
    setUsers([
      ...users,
      newUser
    ])
    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter((user)=>(user.id!==id)));
  }

  const onToggle = id => {
    setUsers(
      users.map((user)=>({...user, active:id===user.id?!user.active:user.active}))
    ); // 위 부분에서 user 하나만 변경하더라도 전체를 순회하면서 user를 업데이트 하므로, onToggle 시에 useEffect가 모든 user에 대해서 실행된다!
  }

  const count = useMemo(()=>countActiveUsers(users), [users]);

  return(
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수 : {count}</div>
    </>
  )
}

export default App;
