import React, { useState } from "react"
import { IoMdSend } from 'react-icons/io';
import './copilot.css';
import { BsDashLg } from 'react-icons/bs';
import { RiAddFill } from'react-icons/ri';

const Copilot = () => {

    const [copilotReply, setCopilotReply] = useState();
    const [loading, setLoading] = useState(Boolean);
    const [query, setQuery] = useState('');
    // const queryRef = useRef<HTMLInputElement>(null);
    const [dispQ, setDispQ] = useState();
    const [showCopilot, setShowCopilot] = useState(false);
    const [error, setError] = useState(false);

    const copilotStyle :React.CSSProperties = {
        position:'absolute',
        bottom:'1%',
        left:'1%',
        borderRadius:`${showCopilot?'1rem':'100%'}`,
        minHeight:`${showCopilot?'40svh':'fit-content'}`,
        maxHeight:`fit-content`,
        overflow:'auto',
        display:'flex',
        // placeItems:'center',
        flexDirection:'column',
        width:`${showCopilot?'350px':'fit-content'}`,
        // border:'solid 1px',
        backgroundColor:'white',
        zIndex:1,
        gap:'8px',
        boxShadow: '0 3px 3px gray'
    }

    const queryBoxStyle:React.CSSProperties = {
        position:'absolute',
        bottom:'1%',
        width:'100%',
        padding:'0.5rem',
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
        backgroundColor:'#1976d2',
        width:'inherit',
        color:'#fff',
        padding:'8px',
        borderRadius:'0 12px 12px 12px',
        fontSize:'14px',
        lineHeight:1.3,
        marginBottom:'2.5rem',
        zIndex:1,   
        // whiteSpace:'pre-line'
    }  

    const askMajiupCopilot = async (q: any) => {
        setQuery('');
        setDispQ(q)
        setError(false)
        setShowCopilot(true);
        setLoading(true);

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
            <strong style={{display:'flex', padding:'0.5rem',justifyContent:'space-between', backgroundColor:'#1976d2', color:'white'}}>
                <span className={`${showCopilot?`show`:`hide`}`}>Majiup AI Copilot</span>
                {
                    showCopilot?<BsDashLg size={20} style={{cursor:'pointer'}} onClick={toggleCopilot} />:<RiAddFill size={20} style={{cursor:'pointer'}} onClick={toggleCopilot} />
                }
            </strong>
            <div className={`${showCopilot?`show`:`hide`}`} style={queryBoxStyle}>
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Ask majiup copilot" style={inputStyle} type="text" />    
                <IoMdSend color={(query)?'#1a73e8':'gray'} size={20} style={{cursor: query?`pointer`:'auto'}} onClick={()=>query && askMajiupCopilot(query)}/> 
            </div>       
            {                
                <div style={{display:`${showCopilot?'flex':'none'}`, padding:'0.5rem',flexDirection:'column', gap:'6px'}}>
                    {
                        !loading && !copilotReply && showCopilot && <div>Ask majiup copilot something...</div>
                    }
                    {
                        dispQ &&
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <p className={`${showCopilot?`show`:`hide`}`} style={{backgroundColor:'#bbbbbb', lineHeight:1.3, fontSize:'14px',maxWidth:'60%', minWidth:'50px', padding:'8px', borderRadius:'12px 0px 12px 12px'}}>
                                {
                                    dispQ
                                }
                            </p>
                        </div>
                        
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
                        <div style={{width:'85%', overflow:'auto',}}>
                            <p className={`${showCopilot?`show`:`hide`}`} style={answerStyle}>
                                {copilotReply}                            
                            </p>
                        </div>
                         
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