export default function MessageList(props) {
  return (
    <>
      {/* <div className="inline-block min-w-full align-middle"> */}
      {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"> */}
      <div className="flex flex-col gap-2 ">
        {props.messages.map((message) => (
          <div className="flex flex-col bg-background-light border border-slate-300 rounded-md p-3 hover:bg-white cursor-pointer" key={message.id} onClick={() => props.setSelectedMessage(message)}>
            <span className=" font-bold text-lg">{message.subject} </span>
            <span className="text-gray-600">From: {message.sender}</span>
            <span className="text-gray-600">To: {message.receiver}</span>
            <span className="text-sm text-right">{message.time.split(", ")[0]}</span>
            <span className="text-sm text-right">{message.time.split(", ")[1]}</span>
          </div>
        ))}
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
