import {Terminal as XTerminal} from '@xterm/xterm'
import { useEffect, useRef } from 'react'
import socket from '../socket'
import '@xterm/xterm/css/xterm.css'

const Terminal = () => {
    const TerminalRef = useRef();
    const isRendered = useRef(false)

    useEffect(() => {
        if(isRendered.current) return;
        isRendered.current = true;
        const term = new XTerminal({
            rows: 20,
        });
        term.open(TerminalRef.current)

        term.onData((data) => {
            socket.emit('terminal:write', data)
        });

        socket.on('terminal:data', (data) => {
            term.write(data);
        })

    }, [])

    return (
    <div ref={TerminalRef} id='terminal'/>
)
}

export default Terminal;