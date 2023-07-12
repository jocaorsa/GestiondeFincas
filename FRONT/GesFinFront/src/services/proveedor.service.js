import { api } from "./api";


export const getOneProveedor = async () => {
    const { data } = await api.get(`/proveedor/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllProveedores = async () => {
    const { data } = await api.get('/proveedor', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createProveedor = async (newProveedor) => {
    console.log(newProveedor)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newProveedor.name,
                apellidos: newProveedor.apellidos,
                tlf_usu: newProveedor.tlf_usu,
                email: newProveedor.email,                             
                password: newProveedor.password,
                role: newProveedor.role,
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
    const response = await api.delete(`/proveedor/${id}`);
    console.log('proveedor eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando proveedor', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOneUsuario = async (id, name, apellidos, tlf_usu, email, password, role, proveedorData) => {
    console.log(proveedorData)
      if (name.length === 0) {
        name=proveedorData.name
    }
    if (apellidos.length === 0) {
        apellidos=proveedorData.apellidos
    }
    if (tlf_usu.length === 0) {
        tlf_usu=proveedorData.tlf_usu
    }
    if (email.length === 0) {
        email=proveedorData.email
    }
    if (password.length === 0) {
        password=proveedorData.password
    }
    if (role.length === 0) {
        role=proveedorData.role
    }
    console.log(id, name, apellidos, tlf_usu, email, password, role)
    const { data } = await api.put(`/proveedor/${id}`,
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
