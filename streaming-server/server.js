const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
//Get all videos.
app.get('/video', (req, res) => {
  const path = './videos';
  const videos = fs.readdirSync(path);
  console.log(videos)
  const videoList = videos.map(video => ({
    name: video.replace(/.mp4/, ''),
    videoSrc: `http://localhost:3000/video/${video}`,
    req: 'GET',
  }))

  res.send(videoList)
})

//Request for video by video id
app.get('/video/:videoName', (req, res) => {
  const path = `./videos/${req.params.videoName}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  // console.log(req.headers)

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
})

//Request for audio by audio ID.
app.get('/audio/:audioName', (req, res) => {
  const path = `./audio/${req.params.audioName}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'media/mp3',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'media/mp3',
    }
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
})

//Get all audios.
app.get('/audio', (req, res) => {
  const path = './audio';
  const audios = fs.readdirSync(path);
  const audioList = audios.map(audio => ({
    name: audio.replace(/.mp3/, ''),
    audioSrc: `http://localhost:3000/audio/${audio}`,
    req: 'GET'
  }));
  res.send(audioList);
});

app.listen(3000, () => {
  console.log('Started server on port 3000....');
});

