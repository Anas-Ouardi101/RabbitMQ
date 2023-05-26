const amqplib = require("amqplib")

const queueName = "Hello2"
const msg = "Hello 9"


const sendMsg = async () => {

    // Create Connection with amqp protocl
    const connection = await amqplib.connect("amqp://localhost")
    // Create channel 
    const channel = await connection.createChannel()
    // Create Queue
    await channel.assertQueue(queueName, { durable: false })
    // Send Message 
    channel.sendToQueue(queueName, Buffer.from(msg))

    console.log(`The meesage was send :  ${msg}`)

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500);
}



sendMsg()

