import { api } from "./api"


export const getOneComunidad = async () => {
    const { data } = await api.get(`/comunidad/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllComunidades = async () => {
    const { data } = await api.get('/comunidad', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createComunidad = async (newComunidad) => {
    console.log(newComunidad)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newComunidad.name,
                apellidos: newComunidad.apellidos,
                tlf_usu: newComunidad.tlf_usu,
                email: newComunidad.email,                             
                password: newComunidad.password,
                role: newComunidad.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear comunidad')
        
    }
}

export const deleteOne = async (id) => {
  try {
    const response = await api.delete(`/comunidad/${id}`);
    console.log('comunidad eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando comunidad', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOneComunidad = async (id, name, apellidos, tlf_usu, email, password, role, comunidadData) => {
    console.log(comunidadData)
      if (name.length === 0) {
        name=comunidadData.name
    }
    if (apellidos.length === 0) {
        apellidos=comunidadData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=comunidadData.tlf_usu
    }
    if (email.length === 0) {
        email=comunidadData.email
    }
    if (password.length === 0) {
        password=comunidadData.password
    }
    if (role.length === 0) {
        role=comunidadData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/comunidad/${id}`,
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
