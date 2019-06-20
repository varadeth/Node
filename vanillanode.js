const fs = require('fs');
const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    if (url==='/') 
    {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if( url==='/message' && method === 'POST') {
        const body =[];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=> {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,(err)=>{
                if(!err){
                    res.writeHead(302,{'Location':'/'});
                    return res.end();
                }
                else {
                    console.log("Error "+err+" occurred");
                }
            });
            console.log(parsedBody);
        });
    }
    
    res.write('<html>');
    res.write('<head><title>Server</title></head>');
    res.write('<body><h1>Hello</h1></body>')
    res.write('</html>');
    res.end();
}

exports.handler = requestHandler;
exports.message = "Some Text";