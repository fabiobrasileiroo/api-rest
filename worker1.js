import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (isMainThread) {
    // Este é o thread principal
    console.log('Thread principal está em execução.');

    // Criar o primeiro Worker Thread
    const worker1 = new Worker(__filename, { workerData: { name: 'Worker 1' } });

    // Criar o segundo Worker Thread
    const worker2 = new Worker(__filename, { workerData: { name: 'Worker 2' } });

    // Função para lidar com mensagens de um Worker Thread
    function handleMessageFromWorker(message, workerName) {
        console.log(`Mensagem recebida do ${workerName}: ${message}`);
    }

    // Receber mensagem do Worker 1
    worker1.on('message', (message) => handleMessageFromWorker(message, worker1.workerData.name));

    // Receber mensagem do Worker 2
    worker2.on('message', (message) => handleMessageFromWorker(message, worker2.workerData.name));

    // Enviar mensagem para os Workers
    worker1.postMessage('Olá, Worker 1!');
    worker2.postMessage('Olá, Worker 2!');

} else {
    // Este é o Worker Thread
    console.log(`${workerData.name} está em execução.`);

    // Receber mensagem do Thread principal
    parentPort.on('message', (message) => {
        console.log(`Mensagem recebida do Thread principal por ${workerData.name}: ${message}`);

        // Enviar mensagem de volta para o Thread principal
        parentPort.postMessage(`Olá, Thread principal! Esta é uma resposta de ${workerData.name}.`);
    });
}
