import { useContext } from 'react'
import StompContext from 'app/contexts/StompContext'

const useStomp = () => useContext(StompContext)

export default useStomp
