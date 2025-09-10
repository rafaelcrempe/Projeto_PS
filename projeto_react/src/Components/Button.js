function Button ({
    className,
    creatImage,
    onSubmit,




}){
    return (

        <>
            <button onClick={creatImage} className={className} onSubmit={onSubmit} />
        </>

    );
}




// function Form({
//     func,
//     title,
//     children

// }) {

//     return(
//         <div className='cardForm' >
//             <h3>{title}</h3>
//             <form onSubmit={(e) => e.preventDefault() }>
//             {children}

//             <Button onClick={ () => send() } disabled={loading} >
//                 {loading? (
//                     <Spinner animation="border" role="status">
//                         <span> className="visually-hidden"
//                             Loading...
//                         </span>
//                     </Spinner>
//                 ):(
//                     <>salvar</>
//                 )}
//                 </Button>
//             </form>
//         </div>
//     );
// }

// export {Form}



