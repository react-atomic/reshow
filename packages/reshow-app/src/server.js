const React = require('react');
const ReactServer = require('react-dom/server');

const server = (app)=>
{
    const myApp = React.createFactory(app);
    return ({process, fs, JSON, Buffer})=>{
        process.env.node_env = 'production';
        const fd = process.stdin.fd;
        const bSize = 4096;
        const buffer = new Buffer(bSize);
        let temp = fs.readSync(fd, buffer, 0, bSize);
        let context='';
        while(temp){
            context += buffer.toString('utf-8', 0, temp);
            temp  = fs.readSync(fd, buffer, 0, bSize);
        }
        const myJson = JSON.parse(context);
        const result = ReactServer.renderToString(
            myApp( myJson )
        );
        const len = result.length;
        process.stdout.write('<!--start-->');
        let last=0;
        while(last < len){
            process.stdout.write(result.substr(last,1000));
            last+=1000;
        }
    };
};

module.exports = server;
