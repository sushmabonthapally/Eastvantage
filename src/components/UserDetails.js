import React, {useState, useEffect} from 'react';
import './UserDetails.css'

const UserDetails = ()=>{
    const [user, setUser] = useState(null);

    const fetchUser = async()=>{
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json();
        const { name, email } = data.results[0];
        const userData = {name: `${name.first} ${name.last}`, email}
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData))
    }

    useEffect(()=>{
        const userFromStorage = JSON.parse(localStorage.getItem("user"))
        if(userFromStorage){
            setUser(userFromStorage)
        }
        else{
        fetchUser()
        }
    },[])

    const handleRefreshClick = ()=>{
        fetchUser();
    }

  return(
    <div>
        { user?(
            <>
             <h1>Name: {user.name}</h1>
             <p><b>Email:</b> {user.email}</p>
            </>
        ):(
            <p>Loading...</p>
        )}
        <button onClick={handleRefreshClick} className = "btn">Refresh</button>
    </div>
  )
}


export default UserDetails