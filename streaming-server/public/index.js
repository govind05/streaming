const axios = require('axios');

let videos = ['06.Events Revisited', "06.Interfaces", '10.Computation'];
console.log(videos);

videos = videos.map(video => video.replace(/.mp4/, ""))

console.log(videos);

const getVidoes = () => {
  axios.get('http://localhost:3000/video')
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
getVidoes();
let videosList = videos.map(video => {
  
  let li = document.createElement('li');
  // console.log(li)
  let a = document.createElement('a');
  // console.log(a);
  a.href = `http://localhost:3000/video/${video}`;
  a.innerText = video;
  li.appendChild(a);
  console.log(li)
  return li;
})

console.log(videosList);

const videoList = document.getElementById('videoList');
videosList.map(video => {
  videoList.appendChild(video);
})
console.log(videoList)