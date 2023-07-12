import { api } from "./api";


export const getOneMediador = async () => {
    const { data } = await api.get(`/mediador/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllMediadores = async () => {
    const { data } = await api.get('/mediador', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createMediador = async (newMediador) => {
    console.log(newMediador)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newMediador.name,
                apellidos: newMediador.apellidos,
                tlf_usu: newMediador.tlf_usu,
                email: newMediador.email,                             
                password: newMediador.password,
                role: newMediador.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear mediador')
        
    }
}

export const deleteOne = async (id) => {
  try {
    const response = await api.delete(`/mediador/${id}`);
    console.log('mediador eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando mediador', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOnemediador = async (id, name, apellidos, tlf_usu, email, password, role, mediadorData) => {
    console.log(mediadorData)
      if (name.length === 0) {
        name=mediadorData.name
    }
    if (apellidos.length === 0) {
        apellidos=mediadorData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=mediadorData.tlf_usu
    }
    if (email.length === 0) {
        email=mediadorData.email
    }
    if (password.length === 0) {
        password=mediadorData.password
    }
    if (role.length === 0) {
        role=mediadorData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/mediador/${id}`,
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
