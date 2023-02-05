import React, {useEffect, useContext} from 'react'
import { UserDispatch } from './App';


const User = React.memo(function User({user}){
    const dispatch = useContext(UserDispatch);  // 전역으로 설정한 UserDispatch의 props로 전달해준 값(=함수)을 사용 가능

    useEffect(()=>{
    //     console.log('user 설정 또는 변경 됨');
    //     console.log(user);
    //     return () => {
    //         console.log('user 삭제 또는 변경 전...');
    //         console.log(user);
    //     };
    },[user]);
    return (
        <div>
            <b style={{
                cursor: 'pointer',
                color: user.active ? 'green':'black'
            }} onClick={()=>{dispatch({ type: 'TOGGLE_USER', id:user.id });}}>{user.username} </b> 
            <span>{user.email}</span>
            <button onClick={()=>{dispatch({ type: 'REMOVE_USER', id:user.id });}}>삭제</button>
        </div>
    );
});

function UserList({users}){
      return (
        <div>
            {users.map((user)=>(
                <User user={user} key={user.id}/>
            ))}
        </div>
      );
}


export default React.memo(UserList);