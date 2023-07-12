import { api } from "./api";


export const getOnePropietario = async () => {
    const { data } = await api.get(`/propietario/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllPropietarios = async () => {
    const { data } = await api.get('/propietario', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createPropietario = async (newPropietario) => {
    console.log(newPropietario)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newPropietario.name,
                apellidos: newPropietario.apellidos,
                tlf_usu: newPropietario.tlf_usu,
                email: newPropietario.email,                             
                password: newPropietario.password,
                role: newPropietario.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear propietario')
        
    }
}

export const deleteOnePropietario = async (id) => {
  try {
    const response = await api.delete(`/propietario/${id}`);
    console.log('propietario eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando propietario', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOnePropietario = async (id, name, apellidos, tlf_usu, email, password, role, propietarioData) => {
    console.log(propietarioData)
      if (name.length === 0) {
        name=propietarioData.name
    }
    if (apellidos.length === 0) {
        apellidos=propietarioData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=propietarioData.tlf_usu
    }
    if (email.length === 0) {
        email=propietarioData.email
    }
    if (password.length === 0) {
        password=propietarioData.password
    }
    if (role.length === 0) {
        role=propietarioData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/propietario/${id}`,
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
