import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className='bg-slate-200 sticky top-0 left-0 '>
        <div className='flex justify-between items-center max-w-4xl mx-auto p-3' >
            <Link to='/'>
            <h1 className='font-bold'>REACT</h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/listaDeExercicios'>
                    <li>Lista de Exercícios</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}