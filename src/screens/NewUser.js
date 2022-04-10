import React, { useState } from 'react'
import { encode } from "base-64";

const NewUser = () => {

  const [user, setUser] = useState({
    "firstname": "",
    "lastname": "",
    "email": "",
    "username": ""
  });

  const submit = () => {

    const username = "edgardo";
    const password = "password";
    const response = fetch("http://localhost:8080/api/users/", {
      method: 'post',
      headers: new Headers({
        'Authorization': 'Basic ' + encode(username + ":" + password),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    }).then(async (response) =>  {
        console.log(response);
        
        const responseJson = await response.json();
        if(response.status != 201){
          alert(JSON.stringify(responseJson));
          return;
        }
        setUser({
          "firstname": "",
          "lastname": "",
          "email": "",
          "username": ""
        });
        alert("Usuario registrado exitosamente!");
    })
      .catch((error) => {
        console.error(error);
      });

  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="container">
      <div className="py-5 text-center row justify-content-md-center">
        <h2>Registrar nuevo usuario</h2>

        <div className='py-5 col-lg-6'>
          <div className="row mb-3">
            <label for="firstname" className="form-label label">Nombre</label>
            <input type="text" value={user.firstname} onChange={onChange} className="form-control" name='firstname' id="firstname" placeholder="Nombre" />
          </div>
          <div className="row mb-3">
            <label for="lastname" className="form-label label">Apellido</label>
            <input type="text" value={user.lastname} onChange={onChange} className="form-control" name='lastname' id="lastname" placeholder="Apellido" />
          </div>
          <div className="row mb-3">
            <label for="email" className="form-label label">Email</label>
            <input type="email" value={user.email} onChange={onChange} className="form-control" name='email' id="email" placeholder="email@example.com" />
          </div>
          <div className="row mb-3">
            <label for="username" className="form-label label">Usuario</label>
            <input type="text" value={user.username} onChange={onChange} className="form-control" name='username' id="username" placeholder="Usuario" />
          </div>
          <div className="row mb-3">
            <button onClick={() => submit()} class="w-100 btn btn-primary btn-md btn-new-user" type="submit"><i class="bi bi-person-plus-fill"></i>Registrar Usuario</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewUser