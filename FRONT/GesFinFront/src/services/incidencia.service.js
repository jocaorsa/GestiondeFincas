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

export const getAllIncidenciasAll = async () => {
    const { data } = await api.get('/incidencia/all', {headers: {token: localStorage.getItem( 'token' ) } } )
    console.log(data)
    return data
}


export const createIncidencia = async (newIncidencia) => {
    console.log(newIncidencia)
    try {
        const res = await api.post(
            '/incidencia',
            {
                num_incidencia:newIncidencia.num_incidencia,
                comunidad_id: newIncidencia.comunidad_id,
                propiedad_id: newIncidencia.propiedad_id,
                fecha_creacion: newIncidencia.fecha_creacion,                             
                seguro: newIncidencia.seguro,
                estado: newIncidencia.estado,
                descripcion: newIncidencia.descripcion,                             
                img: newIncidencia.img,
                proveedor_id: newIncidencia.proveedor_id
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

export const updateOneIncidencia = async (id, num_incidencia,comunidad_id, propiedad_id, fecha_creacion, seguro,estado, descripcion, img, proveedor_id, incidenciaData) => {
    console.log(incidenciaData)
      if (num_incidencia.length === 0) {
        num_incidencia=incidenciaData.num_incidencia
    }
    if (comunidad_id.length === 0) {
        comunidad_id=incidenciaData.comunidad_id
    }
    if (propiedad_id.length === 0) {
        propiedad_id=incidenciaData.propiedad_id
    }
    if (fecha_creacion.length === 0) {
        fecha_creacion=incidenciaData.fecha_creacion
    }
    if (seguro.length === 0) {
        seguro=incidenciaData.seguro
    }
    if (estado.length === 0) {
        estado=incidenciaData.estado
    }
    if (descripcion.length === 0) {
        descripcion=incidenciaData.descripcion
    }
    if (img.length === 0) {
        img=incidenciaData.img
    }
    if (proveedor_id.length === 0) {
        proveedor_id=incidenciaData.proveedor_id
    }
    console.log(id, num_incidencia,comunidad_id, propiedad_id, fecha_creacion, seguro,estado, descripcion, img, proveedor_id)
    const { data } = await api.put(`/incidencia/${id}`,
        {   "num_incidencia":num_incidencia,
            "comunidad_id": comunidad_id,
            "propiedad_id": propiedad_id,
            "fecha_creacion": fecha_creacion,
            "seguro": seguro,  
            "estado":  estado,
            "descripcion": descripcion,
            "img": img,
            "proveedor_id": proveedor_id
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
