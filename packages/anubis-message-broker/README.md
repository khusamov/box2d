Брокер сообщений
----------------

```typescript
import {MessageBroker, MessageEmitter, IMessage} from 'message-broker'

// Настройка брокера сообщений.

const commandQueue: ICommand[] = []
const messageQueue: IMessage[] = []
const messageEmitter = new MessageEmitter

commandQueue.push(new MessageEmitCommand(messageQueue, messageEmitter, commandQueue))

const messageBroker = new MessageBroker(messageQueue, messageEmitter)

// Далее работа идет только с messageBroker.

class Message implements IMessage {}

const disposer = messageBroker.on(Message, () => {
	//...
})

messageBroker.emit(new Message)

disposer.dispose()
```