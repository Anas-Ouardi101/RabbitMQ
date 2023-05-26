const amqplib = require("amqplib")

const queueName = "SEND_TASK"


const resiveMsg = async () => {

    // Create Connection with amqp protocl
    const connection = await amqplib.connect("amqp://localhost")
    // Create channel 
    const channel = await connection.createChannel()
    // Create Queue
    await channel.assertQueue(queueName, { durable: true })
    // Prefetch : don't send new task entil i send you that the last tsk is done and acknologed :
    channel.prefetch(1)

    // what Queue you well lesten :
    console.log(`waiting message on Queue ${queueName}`)

    // Consume Message :
    channel.consume(queueName, msg => {
        const secs = msg.content.toString().split(".").length - 1
        console.log(` The message content is : ${msg.content.toString()}`)
        setTimeout(() => {
            console.log("Don resizing imge")
            channel.ack(msg)
        }, secs * 1000)

    }, { noAck: false })

}

resiveMsg()

