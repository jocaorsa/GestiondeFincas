import { api } from "./api";


export const getOneUser = async () => {
    const { data } = await api.get(`/usuario/${localStorage.id}`,{headers: {token: localStorage.getItem( 'token' ) }})
    console.log(data)
    return data
}


export const getAllUsers = async () => {
    const { data } = await api.get('/usuario', {headers: {token: localStorage.getItem( 'token' ) } } )
    return data
}

export const createUser = async (newUser) => {
    console.log(newUser)
    try {
        const res = await api.post(
            '/auth/singup',
            {
                name:newUser.name,
                apellido: newUser.apellido,
                tle_usu: newUser.tlf_usu,
                email: newUser.email,                             
                password: newUser.password,
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

export const deleteUser = async () => {
    try {
        const user = await api.delete(
            `usuario/${localStorage.id}`,
            {headers: { token: localStorage.getItem('token')}}
        )
        console.log('Usuario eliminado')
    } catch (error) {
        console.error('Error eliminando usuario')
    }
}