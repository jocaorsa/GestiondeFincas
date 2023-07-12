import { api } from "./api";


export const getOneIncidencia = async () => {
    const { data } = await api.get(`/incidencia/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllIncidencias = async () => {
    const { data } = await api.get('/incidencia', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createIncidencia = async (newIncidencia) => {
    console.log(newIncidencia)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newIncidencia.name,
                apellidos: newIncidencia.apellidos,
                tlf_usu: newIncidencia.tlf_usu,
                email: newIncidencia.email,                             
                password: newIncidencia.password,
                role: newIncidencia.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear incidencia')
        
    }
}

export const deleteOne = async (id) => {
  try {
    const response = await api.delete(`/incidencia/${id}`);
    console.log('incidencia eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando incidencia', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOneIncidencia = async (id, name, apellidos, tlf_usu, email, password, role, incidenciaData) => {
    console.log(incidenciaData)
      if (name.length === 0) {
        name=incidenciaData.name
    }
    if (apellidos.length === 0) {
        apellidos=incidenciaData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=incidenciaData.tlf_usu
    }
    if (email.length === 0) {
        email=incidenciaData.email
    }
    if (password.length === 0) {
        password=incidenciaData.password
    }
    if (role.length === 0) {
        role=incidenciaData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/incidencia/${id}`,
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
