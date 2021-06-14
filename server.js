const express = require('express');
const cors = require('cors');
const fs = require('fs')
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
const ffmpeg = require('fluent-ffmpeg')
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const { getInfo } = require('ytdl-getinfo')
app.use(cors());

ffmpeg.setFfmpegPath('C://ffmpeg//bin//ffmpeg.exe')

app.post('/download', function (req,res){
    console.log('Scarico...')
    var url = req.body.url;
    getInfo(url,['--format=bestaudio']).then(info => {
        
        var title = info.items[0].title
        filenamemp3 = title+'.mp3'
        res.contentType('video/mp4')
        res.attachment('video.mp4')
        ytdl(url, {
            format: 'mp4'
            }).pipe(fs.createWriteStream('./Downloads/video.mp4'))
        res.redirect('/')
    })
    
    
})
app.get('/convert', (req,res)=>{
    console.log('Converto...')
    res.contentType('audio/mp3')
    res.attachment(filenamemp3)

    ffmpeg('Downloads/video.mp4')
        .toFormat('mp3')
        .on('end',function(){
            console.log('fatto!')
        })
        .on('error', function(err){
            console.log('Error occured: '+err.message)
        })
        .pipe(res,{end:true})
})
app.get('/', (req,res) => {
    res.sendFile(path.resolve('index.html'))
})


app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});