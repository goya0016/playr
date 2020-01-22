const app={
    songs:[
        {
            id: 1,
            artist: "Jassi gill",
            track: "Att karti",
            length: "4.08",
            path: "file:///android_asset/www/media/Att-Karti.mp3",
            src:"img/attkart.jpg"
        },
        {
            id: 2,
            artist: "Akhil",
            track: "Beautiful",
            length: "2.34",
            path: "file:///android_asset/www/media/Beautiful.mp3",
            src:"img/beautiful.jpg"
        },
        {
            id: 3,
            artist: "Laddi chahal",
            track: "Habit",
            length: "3.17",
            path: "file:///android_asset/www/media/Habit.mp3",
            src:"img/habit.jpg"
        },
        {
            id: 4,
            artist: "Sidhu moose wala",
            track: "Its all about you",
            length: "4.02",
            path: "file:///android_asset/www/media/Its_All_About_You.mp3",
            src:"img/its.jpg"
        },
        {
            id: 5,
            artist: "Pinda wale jatt",
            track: "Parmish verma",
            length: "2.06",
            path: "file:///android_asset/www/media/Pinda_AaleJatt.mp3",
            src:"img/pinda.jpg"
        },
    ],
    currentSong:0,
    media:null,
    source:null, 
    statuses:0, 
    status:{
        '0':'MEDIA_NULL',
        '1':'MEDIA_STARTING',
        '2':'MEDIA_RUNNING',
        '3':'MEDIA_PAUSED',
        '4':'MEDIA_STOPPED'
    },
    err:{
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED',
        
    },
    init:function(){
        document.addEventListener('deviceready',app.ready,false);
    },
    ready:function(){
        app.insertdata();        
    },
    succeded:function(){
        console.log('Success');
    },
    failed:function(){
        console.log('failed');
    },
    stat:function(status){
        app.statuses=status;
        console.log(app.status[status]);
        
    },
    insertdata:()=>{
       let div= document.querySelector(".container");
       app.songs.forEach(element=>{
           let img = document.createElement('img');
           img.setAttribute('src',element.src);
           img.setAttribute('alt','logo');
           img.setAttribute('id','logo');

           let p =document.createElement('p');
           p.textContent = element.track;

           let br= document.createElement('br');
           let span = document.createElement('span');
           let span2 = document.createElement('span');

           span.textContent= element.artist;
           span2.textContent= element.length;

           span.setAttribute ('id','artist');
           span2.setAttribute('id','duration');

           p.appendChild(br);
           p.insertAdjacentElement('afterbegin',img);
        p.insertAdjacentElement('beforeend',span);
        span.insertAdjacentElement('beforeend',span2);
        p.setAttribute('data-item-id',element.id);
        div.appendChild(p);

       })

        app.addEventListeners();
    },
    addEventListeners:function(){
        
        document.querySelector('.container').addEventListener('click',app.playsong);
        document.querySelector('.play').addEventListener('click',app.resumesong);
        document.querySelector('.pause').addEventListener('click',app.pausesong);
        document.querySelector('.next').addEventListener('click',app.nextsong);
        document.querySelector('.prev').addEventListener('click',app.prevsong);
        document.querySelector('.up').addEventListener('click',app.displaypage);
        document.querySelector('.down').addEventListener('click',app.displaypage);
    },
    displaypage:()=>{
        document.querySelector(".playing").classList.toggle('active');
        document.querySelector(".pagefirst").classList.toggle('active');
    },
    playsong:(ev)=>{
        ev.preventDefault();
        document.querySelector(".play").classList.toggle('active');
        document.querySelector(".pause").classList.toggle('active');
        document.querySelector(".playing").classList.toggle('active');
        document.querySelector(".pagefirst").classList.toggle('active');

        // app.source=null;

        if(app.media!=null){
            app.media.release();
            app.media = null;
            let art= document.querySelector('.artistsecond');
            let tra= document.querySelector('.title');
            document.querySelector(".play").classList.remove('active');
        document.querySelector(".pause").classList.add('active');
            art.parentNode.removeChild(art);
            tra.parentNode.removeChild(tra);
        }
            
           
            let clicked=ev.target;
            let item = clicked.closest('[data-item-id]');
            let id = parseInt( item.getAttribute('data-item-id') );
            let song = app.songs.find( songName => 
                songName.id === id);
                app.currentSong = song.id;
                let src= song.path;
                // document.get
                app.media = new Media(src, app.succeded, app.failed, app.stat);
                app.media.play();

                let track=document.createElement('p');
                let artist=document.createElement('p');
                track.textContent=song.track;
                artist.textContent=song.artist;
                document.querySelector('.animation').setAttribute('src',song.src);
                document.querySelector('.animation').insertAdjacentElement('afterend',track);
                track.insertAdjacentElement("afterend",artist);
                artist.setAttribute('class','artistsecond');
                track.setAttribute('class','title');

                app.autonext();

        },
    pausesong:()=>{
        app.media.pause();
        document.querySelector(".play").classList.toggle('active');
        document.querySelector(".pause").classList.toggle('active');
    },
    resumesong:()=>{
        app.media.play();     
        document.querySelector(".play").classList.toggle('active');
        document.querySelector(".pause").classList.toggle('active');
    },
    nextsong:()=>{
        app.media.release();
        app.media=null;
        document.querySelector(".play").classList.remove('active');
        document.querySelector(".pause").classList.add('active');
        let art= document.querySelector('.artistsecond')
            let tra= document.querySelector('.title')
            art.parentNode.removeChild(art);
            tra.parentNode.removeChild(tra);
        app.currentSong++;
        if(app.currentSong > app.songs.length){
            app.currentSong=1;
        }else{
            app.currentSong = app.currentSong;
        }
            let id = app.currentSong;
            let path= app.songs.find(element=>element.id==id);
            let src= path.path;
            app.media = new Media(src, app.succeded, app.failed, app.stat);
            app.media.play();

            let track=document.createElement('p');
            let artist=document.createElement('p');
            track.textContent=path.track;
            artist.textContent=path.artist;
            document.querySelector('.animation').setAttribute('src',path.src);
            document.querySelector('.animation').insertAdjacentElement('afterend',track);
            track.insertAdjacentElement("afterend",artist);
            artist.setAttribute('class','artistsecond');
            track.setAttribute('class','title');

    },
    prevsong:()=>{
        app.media.release();
        app.media=null;
        document.querySelector(".play").classList.remove('active');
        document.querySelector(".pause").classList.add('active');
        let art= document.querySelector('.artistsecond')
            let tra= document.querySelector('.title')
            art.parentNode.removeChild(art);
            tra.parentNode.removeChild(tra);
        app.currentSong--;
        if(app.currentSong < 1){
            app.currentSong=5;
        }else{
            app.currentSong = app.currentSong;
        }
            let id = app.currentSong;
            let path= app.songs.find(element=>element.id==id);
            let src= path.path;
            app.media = new Media(src, app.succeded, app.failed, app.stat);
            app.media.play();
        
            let track=document.createElement('p');
            let artist=document.createElement('p');
            track.textContent=path.track;
            artist.textContent=path.artist;
            document.querySelector('.animation').setAttribute('src',path.src);
            document.querySelector('.animation').insertAdjacentElement('afterend',track);
            track.insertAdjacentElement("afterend",artist);
            artist.setAttribute('class','artistsecond');
            track.setAttribute('class','title');
    },
    autonext:()=>{
        let bar= document.querySelector('progress');
        let current= document.querySelector('.current');
        let length= document.querySelector('.length');
        let pos=0;
        let dur=0;
        let mediaTimer = setInterval(function () {
            app.media.getCurrentPosition(
                function (position) {
                    if (position > -1) {
                        console.log((position) + " sec");
                        pos = position/60;
                    }
                },
                function (e) {
                    console.log("Error getting pos=" + e);
                },
                
                );
                let duration = app.media.getDuration();
                dur = duration/60;

                let roundp=pos.toFixed(2);
                let roundd=dur.toFixed(2);

                bar.setAttribute('value',roundp);
                bar.setAttribute('max',roundd);

                current.textContent=roundp;
                length.textContent=roundd;


        }, 1000)

        let check= setInterval(() => {
            if(app.statuses==4){
                app.nextsong();
            }
        }, 1000);
    }
    
}
app.init();