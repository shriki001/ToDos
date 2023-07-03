const amqp = require("amqplib");

class Consumer {
  constructor(io) {
    this.url = "amqp://admin:admin@rabbitmq";
    this.queue = "my_queue";
    this.io = io;
    this.init();
  }

  init = async (_) => {
    this.connection = await amqp.connect(this.url);
    console.log("connected to amqp");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue);
    this.consume();
  };

  consume = (_) => {
    this.channel.consume(this.queue, (message) => {
      console.log(`get message: ${message.content.toString()}`)
      this.io.emit("data_from_server", message.content.toString());
      this.channel.ack(message);
    });
  };
}

module.exports = (io) => new Consumer(io);
