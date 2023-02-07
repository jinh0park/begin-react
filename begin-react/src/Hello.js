import React from 'react';

function Hello({name, isSpecial}) {
    return <div>My name is {name} {isSpecial?<b>*</b>:null}</div>
}

Hello.defaultProps = {
    name: 'noname'
}

export default Hello;