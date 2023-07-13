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
            '/seguro',
            {
                compania:newSeguro.compania,
                poliza: newSeguro.poliza,
                tlf_seg: newSeguro.tlf_seg,
                fecha_contrato: newSeguro.fecha_contrato,                             
                fecha_fin_contrato: newSeguro.fecha_fin_contrato,
                mediador_id: newSeguro.mediador_id,
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

export const updateOneSeguro = async (id, compania, poliza, tlf_seg, fecha_contrato, fecha_fin_contrato, mediador_id, seguroData) => {
    console.log(seguroData)
      if (compania.length === 0) {
        compania=seguroData.compania
    }
    if (poliza.length === 0) {
        poliza=seguroData.poliza
    }
    if (tlf_seg.length === 0) {
        tlf_seg=seguroData.tlf_seg
    }
    if (fecha_contrato.length === 0) {
        fecha_contrato=seguroData.fecha_contrato
    }
    if (fecha_fin_contrato.length === 0) {
        fecha_fin_contrato=seguroData.fecha_fin_contrato
    }
    if (mediador_id.length === 0) {
        mediador_id=seguroData.mediador_id
    }
    console.log(id, compania, poliza, tlf_seg, fecha_contrato, fecha_fin_contrato, mediador_id)
    const { data } = await api.put(`/seguro/${id}`,
        {   "compania":compania,
            "poliza":poliza,
            "tlf_seg": tlf_seg,
            "fecha_contrato": fecha_contrato,
            "fecha_fin_contrato": fecha_fin_contrato,
            "mediador_id": mediador_id
        }, 
        {
        headers: { token: localStorage.getItem('token') }  
        }
    )
    console.log(data)
    return data
}
