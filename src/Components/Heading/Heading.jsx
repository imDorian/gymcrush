import './Heading.scss'

const Heading = ({close}) => {
 

  return (
    <>
    <img onClick={()=> close()} className='heading' src='/heading.svg' alt='close'/>
    

</> )
}

export default Heading