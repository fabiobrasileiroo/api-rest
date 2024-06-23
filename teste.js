async function example() {
    console.log('Estado: Pronta -> Executando');
    
    // Simula uma operação assíncrona com await
    await new Promise((resolve) => {
        console.log('Estado: Executando -> Bloqueada (await)');
        setTimeout(() => {
            console.log('Estado: Bloqueada -> Executando (resolvida)');
            resolve();
        }, 2000); // Simula uma operação de I/O com 2 segundos de espera
    });

    console.log('Estado: Executando -> Morta');
}

console.log('Estado: Nova');
example();
Estado: Nova
Estado: Pronta -> Executando
Estado: Executando -> Bloqueada (await)
Estado: Bloqueada -> Executando (resolvida)
Estado: Executando -> Morta