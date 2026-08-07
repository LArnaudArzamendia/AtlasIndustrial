fetch('whatsapp.html')
    .then(response=>{
        if(!response.ok){
            throw new Error('No se pudo cargar whatsapp.html');
        }
        return response.text();
    })
    .then(data=>{
        document.getElementById('float-wsp').innerHTML=data;
    })
    .catch(error=>{
        console.error(error);
    });