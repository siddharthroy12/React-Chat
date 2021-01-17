import './Input.css'

const Input = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}>
        </input>
        <button className="sendButton" onClick={e => {
            e.preventDefault()
            sendMessage(message)
        }}>
            Send
        </button>
    </form>
)

export default Input