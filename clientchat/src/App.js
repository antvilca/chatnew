import logo from './logo.svg';
import './App.css';
import './normal.css';
import {useLayoutEffect, useState,useEffect,useRef} from 'react';
//import { json } from 'body-parser';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] =useState([{
    user: "gpt",
    message: "How can I help you?"
  } ]);

  function clearChat(){
    setChatLog([]);
  }
const element = document.getElementById("box");


  

   async function handleSubmit(e){
    e.preventDefault();

    let chatLogNew=[...chatLog,{user:"me",message:`${input}`}
  ]



     setInput("");
     //aqui es como contesta ai
     setChatLog(chatLogNew)
    
// fetch response to the api
const messages =chatLogNew.map((message) => message.message).join("\n")
const response = await fetch ("http://localhost:3081/",{
method:"POST",
headers: {
  "Content-Type":"application/json"
},
body: JSON.stringify({
  message:messages
    
})


  });
  
  
  const data = await response.json();
  await setChatLog([...chatLogNew,{user:"gpt",message:`${data.message}`}])
//console.log(data.message)}


//const scrolly = () => window.scrollTo({bottom:0,behaivor:smooth});

// Call the function whenever a new message is added to the chat



}
  
  return (
   
    <div className="App">
      <aside className="sidemenu">

        <div className="side-menu-button" onClick={ clearChat}>
        <span>+</span>
        New Chat
        </div>
      </aside>
      <section className="chatbox">      
     
     
          <div className="chat-log">
            
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message}
              />

              
            ))
            }  
         
          <div className="chat-message" >
          <div className="chat-message-center">
          <div className="avatar-chatgpt">
          </div>  
          </div>
          <div className="message">
          </div>
          </div>
          </div>
   
          
  
          
      </section>



      <div className="chat-input-holder">
            <form onSubmit={handleSubmit}>

            <input
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"></input>
            </form>
          </div>


    </div>




  );
}


const ChatMessage = ({message,index})=> {

 



return(

  <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
          <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
      {message.user === "gpt" && <svg 
      fill="AF"
      xmlns="http://www.w3.org/2000/svg"
strokeWidth={1.5}
viewBox="0 0 40 40"
>
  
</svg>}
   

                </div>
    

                <div className="message" >
           {message.message} 

        
   </div> 
              </div> 
            


               </div>


);




            }
  












  


export default App;



