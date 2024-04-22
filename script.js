console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songitem"));
let MasterSongName = document.getElementById("MasterSongName");


let songs = [
    {songName: "Jawan Title Track", filePath: "/songs/1.mp3", coverPath: "/covers/banner.jpeg"},
    {songName: "Toh Dhishoom", filePath: "/songs/2.mp3", coverPath: "/covers/dishoom.jpg"},
    {songName: "Brothers Anthem", filePath: "/songs/3.mp3", coverPath: "/covers/brothers.jpeg"},
    {songName: "Haseeno Ka Deewana", filePath: "/songs/4.mp3", coverPath: "/covers/hkd.jpeg"},
    {songName: "Pehli Dafa", filePath: "/songs/5.mp3", coverPath: "/covers/pehli dafa.jpg"},
    {songName: "Dhakkad", filePath: "/songs/6.mp3", coverPath: "/covers/dangal.jpg"},
    {songName: "Bolo Har Har Har", filePath: "/7.mp3", coverPath: "/covers/shivaay.jpg"},
    {songName: "Dil Me Chupa Lunga", filePath: "/songs/8.mp3", coverPath: "/covers/wajah tum ho.jpg"},
    {songName: "Badri Ki Dulhania", filePath: "/songs/9.mp3", coverPath: "/covers/hkd.jpeg"}
]   

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle Play/Pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.currentTime<=0 || audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0
    }
});

//Listen to events
audioElement.addEventListener("timeupdate", ()=>{
    
    //update slidebar
    progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");    
        element.classList.add("fa-music");
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        e.target.classList.remove("fa-music");
        e.target.classList.add("fa-pause-circle");
        songIndex = parseInt(e.target.id);
        audioElement.src=`/songs/${songIndex+1}.mp3`;
        MasterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
});

document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>=8){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove("fa-music");
    document.getElementById(`${songIndex}`).classList.add("fa-pause-circle");
    audioElement.src=`/songs/${songIndex+1}.mp3`;
    MasterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<=0){
        songIndex = 8
    }
    else{
        songIndex -= 1;
    }
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove("fa-music");
    document.getElementById(`${songIndex}`).classList.add("fa-pause-circle");
    audioElement.src=`/songs/${songIndex+1}.mp3`;
    MasterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});