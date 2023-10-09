import React, { useRef, useState } from "react"
import { IoMdSend } from 'react-icons/io';
import './copilot.css';
import { BsDashLg } from 'react-icons/bs';
import { RiAddFill } from'react-icons/ri';

const Copilot = () => {

    const [copilotReply, setCopilotReply] = useState();
    const [loading, setLoading] = useState(Boolean);

    const queryRef = useRef<HTMLInputElement>(null);
    const [showCopilot, setShowCopilot] = useState(false);
    const [error, setError] = useState(false);

    const copilotStyle :React.CSSProperties = {
        position:'absolute',
        bottom:'1%',
        left:'1%',
        padding:'1rem',
        borderRadius:'1rem',
        minHeight:`${showCopilot?'40svh':'fit-content'}`,
        maxHeight:`fit-content`,
        overflow:'auto',
        display:'flex',
        // placeItems:'center',
        flexDirection:'column',
        width:'350px',
        // border:'solid 1px',
        backgroundColor:'white',
        zIndex:1,
        gap:'8px',
        boxShadow: '0 3px 3px gray'
    }

    const queryBoxStyle:React.CSSProperties = {
        position:'absolute',
        bottom:'3%',
        width:'90%',
    }

    const inputStyle :React.CSSProperties  = {
        padding:'0.5rem 0.8rem',
        outline:'none',
        border:'none',
        borderBottom:'solid 1px',
        width:'inherit',
        fontSize:'14px'
        
    } 

    const answerStyle :React.CSSProperties = {
        backgroundColor:'gray',
        padding:'8px',
        borderRadius:'0 12px 12px 12px',
        fontSize:'14px',
        lineHeight:1.3,
        width:'80%',
        marginBottom:'2.5rem',
        zIndex:1,
    }  

    const askMajiupCopilot = async () => {
        setError(false)
        setShowCopilot(true);
        setLoading(true);
        const query = queryRef.current?.value;

        try {
        
            const response = await fetch('http://localhost:8081/api/v1/ask-majiup-copilot',{
                method:'POST',
                headers:{
                    // 'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:query
            }) 
            
            const reply = await response.json();
            setCopilotReply(reply.reply);
        } catch (err) {
            // console.log(err)
            setError(true)
        }
        
        

        setLoading(false);
    }

    const toggleCopilot = () => {
        const status = !showCopilot;
        setShowCopilot(status);
    }

    return (
        <div style={copilotStyle}>
            <strong style={{display:'flex', paddingBottom:`${(showCopilot && !copilotReply)?'2rem':''}`,justifyContent:'space-between'}}>
                Majiup Copilot
                {
                    showCopilot?<BsDashLg size={20} style={{cursor:'pointer'}} onClick={toggleCopilot} />:<RiAddFill size={20} style={{cursor:'pointer'}} onClick={toggleCopilot} />
                }
            </strong>
            <div className={`${showCopilot?`show`:`hide`}`} style={queryBoxStyle}>
                <input ref={queryRef} placeholder="Ask majiup copilot" style={inputStyle} type="text" />    
                <IoMdSend size={20} style={{cursor:'pointer'}} onClick={askMajiupCopilot}/> 
            </div>       
            {                
                <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                    {
                        (queryRef.current?.value) && (
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <p className={`${showCopilot?`show`:`hide`}`} style={{backgroundColor:'gray', lineHeight:1.3, fontSize:'14px',maxWidth:'60%', minWidth:'50px', padding:'8px', borderRadius:'12px 0px 12px 12px'}}>
                                    {
                                        queryRef.current?.value
                                    }
                                </p>
                            </div>
                        )
                    }                    
                    {
                        loading &&
                        <div className="animation-box">
                            <div className="loading-styles-0">
                            </div>
                            <div className="loading-styles-1">
                            </div>
                            <div className="loading-styles-2">
                            </div>
                        </div>                                                                        
                    }
                    {
                        (copilotReply && !loading) &&
                        <p className={`${showCopilot?`show`:`hide`}`} style={answerStyle}>
                            {copilotReply}
                        </p> 
                    }
                    {
                        error && 
                        <div>
                            <p style={{fontSize:'14px', color:'red'}}>Check again later!</p>
                        </div>
                    }
                                                  
                </div>
            }
        </div>
    )
}

export default Copilot