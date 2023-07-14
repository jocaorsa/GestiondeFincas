import { api } from "./api";


export const getOneUser = async () => {
    const { data } = await api.get(`/usuario/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}
export const getOneUserAll = async () => {
    const { data } = await api.get(`/usuario/${localStorage.id}/all`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}


export const getAllUsers = async () => {
    const { data } = await api.get('/usuario', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createUser = async (newUser) => {
    console.log(newUser)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newUser.name,
                apellidos: newUser.apellidos,
                tlf_usu: newUser.tlf_usu,
                email: newUser.email,                             
                password: newUser.password,
                role: newUser.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear Usuario')
        
    }
}

export const deleteOne = async (id) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    console.log('Usuario eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando usuario', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOneUsuario = async (id, name, apellidos, tlf_usu, email, password, role, userData) => {
    console.log(userData)
      if (name.length === 0) {
        name=userData.name
    }
    if (apellidos.length === 0) {
        apellidos=userData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=userData.tlf_usu
    }
    if (email.length === 0) {
        email=userData.email
    }
    if (password.length === 0) {
        password=userData.password
    }
    if (role.length === 0) {
        role=userData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/usuario/${id}`,
        {   "name":name,
            "apellidos":apellidos,
            "tlf_usu": tlf_usu,
            "email": email,
            "password": password,
            "role": role
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
