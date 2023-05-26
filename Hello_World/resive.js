const amqplib = require("amqplib")

const queueName = "Hello"


const sendMsg = async () => {

    // Create Connection with amqp protocl
    const connection = await amqplib.connect("amqp://localhost")
    // Create channel 
    const channel = await connection.createChannel()
    // Create Queue
    await channel.assertQueue(queueName, { durable: false })
    // what Queue you well lesten :
    console.log(`waiting message on Queue ${queueName}`)
    // Consume Message 
    channel.consume(queueName, msg =>{
        console.log(` The message content is : ${msg.content.toString()}`)
    },{noAck:true})

    

}



sendMsg()

