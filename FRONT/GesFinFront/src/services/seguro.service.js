import { api } from "./api";


export const getOneSeguro = async () => {
    const { data } = await api.get(`/seguro/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllSeguros = async () => {
    const { data } = await api.get('/seguro', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createSeguro = async (newSeguro) => {
    console.log(newSeguro)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newSeguro.name,
                apellidos: newSeguro.apellidos,
                tlf_usu: newSeguro.tlf_usu,
                email: newSeguro.email,                             
                password: newSeguro.password,
                role: newSeguro.role,
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear seguro')
        
    }
}

export const deleteOne = async (id) => {
  try {
    const response = await api.delete(`/seguro/${id}`);
    console.log('seguro eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando seguro', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOneSeguro = async (id, name, apellidos, tlf_usu, email, password, role, seguroData) => {
    console.log(seguroData)
      if (name.length === 0) {
        name=seguroData.name
    }
    if (apellidos.length === 0) {
        apellidos=seguroData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=seguroData.tlf_usu
    }
    if (email.length === 0) {
        email=seguroData.email
    }
    if (password.length === 0) {
        password=seguroData.password
    }
    if (role.length === 0) {
        role=seguroData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/seguro/${id}`,
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
