import React, { useState, useEffect } from 'react'
import '../components/css/Table.css';
import { encode } from "base-64";
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Users = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [paginationData, setPaginationData] = useState({
    "countElements": 0,
    "countPages": 0,
    "itemsPerPages": 10,
    "last": false,
    "page": 0
  });

  useEffect(() => {

    loadUsers(1);

  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (id.length === 0) {
      loadUsers(1);
    } else {
      loadUserById(parseInt(id));
    }
  }

  const loadUsers = (page) => {

    if (paginationData.page && page == paginationData.page) return;

    fetch('http://localhost:8080/api/users?page=' + (page - 1))
      .then(response => response.json())
      .then(responseJson => {
        const { countElements, countPages, itemsPerPages, last, page } = responseJson;
        setPaginationData({
          "countElements": countElements,
          "countPages": countPages,
          "itemsPerPages": itemsPerPages,
          "last": last,
          "page": page + 1
        });
        console.log(paginationData);
        //almacenamos los usuarios obtenidos
        setUsers(responseJson.users);
      });
  }

  const navigateEdit = () => {

  }

  const deleteUser = (id) => {

    const username = "edgardo";
    const password = "password";
    const response = fetch("http://localhost:8080/api/users/" + id, {
      method: 'delete',
      headers: new Headers({
        'Authorization': 'Basic ' + encode(username + ":" + password)
      })
    }).then((response) => {
      if (response.status == 200) {
        alert("Usuario eliminado exitosamente!");
        const newUsers = users.filter(u => u.id != id);
        setUsers(newUsers);
      }
      if (response.status == 401) {
        alert("No tienes permiso para realizar esta accion");
      }
    })
  }

  const loadUserById = (id) => {

    fetch("http://localhost:8080/api/users/" + id)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          return alert(data.message);
        }
        setUsers([data]);
        setPaginationData({
          "countElements": 1,
          "countPages": 0,
          "itemsPerPages": 10,
          "last": false,
          "page": 0
        });
      })
  }


  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Gestión de Usuarios</h2>
        <p className="lead">Listado de usuarios registrado en nuestra base de datos.</p>
      </div>
      <div className="row g-5 mb">
        <div className='col-md-7 col-lg-8'>
          <form className=" p-2">
            <div className="input-group">
              <input type="number" min={0} value={id} onChange={e => setId(e.target.value)} className="form-control" placeholder="Buscar usuario por Id" />
              <button onClick={submit} type="submit" className="btn btn-secondary">
                Buscar</button>
            </div>
          </form>
        </div>
        <div className="col-md-5 col-lg-4 order-md-last">
          <NavLink to="/new-user">
            <button class="w-100 btn btn-success btn-md btn-new-user" type="submit"><i class="bi bi-person-plus-fill"></i>Nuevo Usuario</button>
          </NavLink>
        </div>

      </div>

      <div className="row">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button className="btn btn-warning mini-btn" onClick={() => {
                    navigate('/edit-user', {state: { id: user.id }})
                  }}>
                      <i class="bi bi-pencil-fill"></i>
                  </button>
                  
                  <button className="btn btn-danger mini-btn" onClick={() => deleteUser(user.id)}>
                    <i class="bi bi-trash2-fill"></i>
                  </button>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
        <div className="py-2">
          {paginationData.countElements > 0 ? (
            <h5>Usuarios encontrados {paginationData.countElements}</h5>
          ) : <h5>No hay usuarios registrados</h5>}
        </div>
        {paginationData.countPages > 1 ? (
          <div className="row mb">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                {Array.from(Array(paginationData.countPages + 1), (e, i) => {
                  if (i == 0) return null;
                  return <li key={i} onClick={() => loadUsers(i)} className={`page-item ${paginationData.page == i ? 'active' : ''}`}  ><a className="page-link"  >{i}</a></li>
                })}
              </ul>
            </nav>
          </div>
        ) : null}

      </div>
    </div >

  )
}

export default Users