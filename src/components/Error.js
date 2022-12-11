import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css'

export const Error = ({ user }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setInterval(() => {
                navigate('/')
            }, 2000)
        }
        if (!user) {
            setInterval(() => {
                navigate('/login')
            }, 2000)
        }
    }, [user, navigate])

  return (
    <div className='error'>Invalid url!</div>
  )
}
