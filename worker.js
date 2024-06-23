import { Worker, isMainThread, parentPort } from'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

// nova forma de trabalhar com path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (isMainThread) {
    // Este é o thread principal
    console.log('Thread principal está em execução.');

    // Criar um novo Worker Thread
    const worker = new Worker(__filename);

    // Receber mensagem do Worker Thread
    worker.on('message', (message) => {
        console.log(`Mensagem recebida do Worker: ${message}`);
    });

    // Enviar mensagem para o Worker Thread
    worker.postMessage('Olá, Worker!');

} else {
    console.log("\n");
    // Este é o Worker Thread
    console.log('Worker Thread está em execução.');

    // Receber mensagem do Thread principal
    parentPort.on('message', (message) => {
        console.log(`Mensagem recebida do Thread principal: ${message}`);

        // Enviar mensagem de volta para o Thread principal
        parentPort.postMessage('Olá, Thread principal!');
    });
}

