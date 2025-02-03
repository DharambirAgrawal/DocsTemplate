'use client'
import { useEffect } from "react"
const ClientComponents = () => {
    useEffect(() => {
        const setCookie = async () => {
            const res = await fetch(`https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev/api/cookies`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
                },
                body: JSON.stringify({
                  name: 'hel',
                  value: 'rld',
                })
              });

           
            
        }
        setCookie()
    }, [])
  return (
    <div>ClientComponents</div>
  )
}

export default ClientComponents