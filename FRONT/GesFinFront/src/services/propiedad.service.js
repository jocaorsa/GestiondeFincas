import { api } from "./api";


export const getOnePropiedad = async () => {
    const { data } = await api.get(`/propiedad/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}

export const getAllPropiedad = async () => {
    const { data } = await api.get('/propiedad', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}

export const createPropiedad = async (newPropiedad) => {
    console.log(newPropiedad)
    try {
        const res = await api.post(
            '/propiedad',
            {
                tipo_propiedad:newPropiedad.tipo_propiedad,
                piso: newPropiedad.piso,
                num: newPropiedad.num,
                letra: newPropiedad.letra,                             
                comunidad_id: newPropiedad.comunidad_id
            },
            {
                headers: { token: localStorage.getItem('token') },
            }
            )
            console.log(res)
            return res
        
    } catch (error) {
        console.error('Fallo al crear propiedad')
        
    }
}

export const deleteOnePropiedad = async (id) => {
  try {
    const response = await api.delete(`/propiedad/${id}`);
    console.log('propiedad eliminado', response);
    return response.data; // Añade este return para devolver la respuesta del servidor
  } catch (error) {
    console.error('Error eliminando propiedad', error);
    throw error; // Lanza el error para que pueda ser capturado en la función que llama a deleteOne
  }
};

export const updateOnePropiedad = async (id, tipo_propiedad, piso, num, letra, comunidad_id, propiedadData) => {
    console.log(propiedadData)
      if (tipo_propiedad.length === 0) {
        tipo_propiedad=propiedadData.tipo_propiedad
    }
    if (piso.length === 0) {
        piso=propiedadData.piso
    }
    if (num.length === 0) {
        num=propiedadData.num
    }
    if (letra.length === 0) {
        letra=propiedadData.letra
    }
    if (comunidad_id.length === 0) {
        comunidad_id=propiedadData.comunidad_id
    }
  
    console.log(id, tipo_propiedad, piso, num, letra, comunidad_id)
    const { data } = await api.put(`/propiedad/${id}`,
        {   "tipo_propiedad":tipo_propiedad,
            "piso":piso,
            "num": num,
            "letra": letra,
            "comunidad_id": comunidad_id
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
