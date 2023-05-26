const amqplib = require("amqplib")

const queueName = "SEND_TASK"

const msg = process.argv.slice(2).join(' ') || "Hello World"
const sendMsg = async () => {

    // Create Connection with amqp protocl
    const connection = await amqplib.connect("amqp://localhost")
    // Create channel 
    const channel = await connection.createChannel()
    // Create Queue
    await channel.assertQueue(queueName, { durable: true })
    // Send Message 
    channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true })

    console.log(`The meesage was send :  ${msg}`)

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500);
}



sendMsg()

