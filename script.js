//spotify logic
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay =document.getElementById("masterPlay");
let myProgressBar =document.getElementById("myProgressBar");
let gif =document.getElementById("gif");
let masterSongName =document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from( document.getElementsByClassName("songItemPlay"));
let timestamp =Array.from( document.getElementsByClassName("timestamp"));

let songs =[
    {songName: "Tere Hawaale - Laal Singh Chaddha", filePath: "songs/1.mp3",coverPath: "covers/1.jpg"},
    {songName: "Soniyo - Raaz ", filePath: "songs/2.mp3",coverPath: "covers/2.jpg"},
    {songName: "Apna Bana Le", filePath: "songs/3.mp3",coverPath: "covers/3.jpg"},
    {songName: "Tum Se Hi", filePath: "songs/4.mp3",coverPath: "covers/4.jpg"},
    {songName: "Soch - Harrdy Sandhu", filePath: "songs/5.mp3",coverPath: "covers/5.jpg"},
    {songName: "Do Gallan (Let's Talk)", filePath: "songs/6.mp3",coverPath: "covers/6.jpg"},
    {songName: "Tu Hi Haqeeqat - Tum Mile mp3 ", filePath: "songs/7.mp3",coverPath: "covers/7.jpeg"},
    {songName: "Safar", filePath: "songs/8.mp3",coverPath: "covers/8.jpg"},
]
songItem.forEach((element,i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});

//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused||audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
});
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    
  //update progress bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
   
    

});
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});


const makeAllPlay =()=>{
    songItemPlay.forEach((element)=>{
        element.classList.add("fa-circle-play")
        element.classList.remove("fa-circle-pause")
      });
}
//Playing songs by items
songItemPlay.forEach((element)=>{
    element.addEventListener("click", (e)=>{
        makeAllPlay();
        // console.log(e.target)
        songIndex= parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src=`songs/${songIndex+1}.mp3`
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    });
});

//Next
document.getElementById("next").addEventListener('click',()=>{
    if (songIndex>=7) {
        songIndex=0;
    }
     else {
        songIndex+=1;
   }
   audioElement.src=`songs/${songIndex+1}.mp3`;
//    console.log(songIndex);
   audioElement.play();
   masterSongName.innerText=songs[songIndex].songName;
   audioElement.currentTime=0;
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');

});


//Previous
document.getElementById("previous").addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex=7;
    }
     else {
        songIndex-=1;
   }
   audioElement.src=`songs/${songIndex+1}.mp3`;
   masterSongName.innerText=songs[songIndex].songName;
//    console.log(songIndex);
   audioElement.play();
   audioElement.currentTime=0;
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');

});
