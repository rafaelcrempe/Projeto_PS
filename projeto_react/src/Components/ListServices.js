
 function ListServices({


    services,

}){ 
    
    return(
<div>
{services.map(
          s => (

            <div key={s.id}>
            
      
              <h1>{s. professional_id}</h1> <button>{s.status}</button>
              <div style={{ margin: '10px 0' }}>
                <StarRating rating={s.star} readonly={true} />
              </div>
 
              <p>{s.review}</p>
              {/*<Button variant="danger"onclick={() => delServices(s.id)}>Excluir</Button>*/}
              <Button variant="primary" onClick={() => nav( `/services/${s.id}`, {replace: true})}>Ver</Button>
              <Button variant="warning" onClick={() => nav( `/services/edit${s.id}`, {replace: true})}>Editar</Button>
            </div>
            

          )
      )}
</div>
    );
    
    
    
    
}












