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
            '/proveedor',
            {
                nombre:newProveedor.nombre,
                direccion: newProveedor.direccion,
                tlf_prov: newProveedor.tlf_prov,
                cif: newProveedor.cif,
                per_contacto: newProveedor.per_contacto,
                email: newProveedor.email,                             
                puntuacion: newProveedor.puntuacion,
                servicio: newProveedor.servicio
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear Proveedor')
        
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

export const updateOneProveedor = async (id, nombre, direccion, tlf_prov, email, cif, per_contacto, servicio, puntuacion, proveedorData) => {
    console.log(proveedorData)
      if (nombre.length === 0) {
        nombre=proveedorData.nombre
    }
    if (direccion.length === 0) {
        direccion=proveedorData.direccion
    }
    if (tlf_prov.length === 0) {
        tlf_prov=proveedorData.tlf_prov
    }
    if (cif.length === 0) {
        cif=proveedorData.cif
    }
    if (per_contacto.length === 0) {
        per_contacto=proveedorData.per_contacto
    }
    if (email.length === 0) {
        email=proveedorData.email
    }
    if (puntuacion.length === 0) {
        puntuacion=proveedorData.puntuacion
    }
    if (servicio.length === 0) {
        servicio=proveedorData.servicio
    }
    console.log(id, nombre, direccion, tlf_prov, email, cif, per_contacto, servicio, puntuacion)
    const { data } = await api.put(`/proveedor/${id}`,
        {   "nombre":nombre,
            "direccion": direccion,
            "tlf_prov": tlf_prov,
            "cif": cif,                             
            "per_contacto": per_contacto,
            "email": email,
            "puntuacion": puntuacion,
            "servicio": servicio
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
