Брокер сообщений
----------------

Главная идея брокера сообщений в том, что сообщения:
1) сначала попадают в очередь сообщений IMessage[] при помощи метода MessageBroker.emit(), 
2) а затем оттуда извлекаются командой MessageEmitCommand при помощи метода IMessage[].shift()
3) и отправляются в передатчик сообщений MessageEmitter при помощи метода MessageEmitter.emit()
4) и вызываются все слушатели этого сообщения.

То есть сообщения обрабатываются не сразу в в порядке очереди команд ICommand[].

```typescript
import {ICommand} from 'base-types'
import {MessageBroker, IMessage} from 'message-broker'

// Настройка брокера сообщений.

const commandQueue: ICommand[] = []
const messageBroker = new MessageBrokerCreator(commandQueue).create()

messageBroker.start()

// Далее работа идет только с messageBroker.

class MyMessage implements IMessage {
	// Любые данные для передачи в сообщении.
}

const myMessageDisposer = messageBroker.on(MyMessage, (myMessage: MyMessage) => {
	//...
})

messageBroker.emit(new MyMessage)

myMessageDisposer.dispose()

// Остановка обработки очереди сообщений.

messageBroker.stop()
```