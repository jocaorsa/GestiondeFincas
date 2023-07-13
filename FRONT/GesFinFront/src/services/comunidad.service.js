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
            '/comunidad',
            {
                nombre:newComunidad.nombre,
                direccion: newComunidad.direccion,
                tlf_com: newComunidad.tlf_com,
                cif: newComunidad.cif,                             
                per_contacto: newComunidad.per_contacto,
                ascensor: newComunidad.ascensor,
                localizacion: newComunidad.localizacion,                             
                img: newComunidad.img,
/*                 seguro_id: newComunidad.seguro_id
 */            },
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

export const updateOneComunidad = async (id, nombre, direccion, tlf_com, cif, per_contacto, ascensor,localizacion, img, seguro_id, comunidadData) => {
    console.log(comunidadData)
      if (nombre.length === 0) {
        nombre=comunidadData.nombre
    }
    if (direccion.length === 0) {
        direccion=comunidadData.direccion
    }
    if (tlf_com.length === 0) {
        tlf_com=comunidadData.tlf_com
    }
    if (cif.length === 0) {
        cif=comunidadData.cif
    }
    if (per_contacto.length === 0) {
        per_contacto=comunidadData.per_contacto
    }
    if (ascensor.length === 0) {
        ascensor=comunidadData.ascensor
    }
    if (localizacion.length === 0) {
        cif=comunidadData.localizacion
    }
    if (img.length === 0) {
        img=comunidadData.img
    }
    /* if (seguro_id.length === 0) {
        seguro_id=comunidadData.seguro_id
    } */
    console.log(id, nombre, direccion, tlf_com, cif, per_contacto, ascensor,localizacion, img, seguro_id)
    const { data } = await api.put(`/comunidad/${id}`,
        {   "nombre":nombre,
            "direccion":direccion,
            "tlf_com":tlf_com,
            "cif":cif,
            "per_contacto":per_contacto,
            "ascensor":ascensor,
            "localizacion":localizacion,
            "img":img
            /* "seguro_id":seguro_id */
            
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
