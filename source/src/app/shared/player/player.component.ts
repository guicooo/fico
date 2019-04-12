import { Component, OnInit, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  srcMusic = '';
  nameFile = '';
  public playerOn : boolean = false; 
  public arrayMp3 = [];

  constructor(public toastr: ToastsManager, private _appService : AppService) { }

  ngOnInit() {

    var music : any = document.getElementById('music'); // id for audio element
    var duration = music ? music.duration : ''; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline
    
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    
    pButton.addEventListener("click", play);
    
    music.addEventListener("timeupdate", timeUpdate, false);
    
    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    }, false);
    
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }
    
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    
    var onplayhead = false;
    
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }
    
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);
    
        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }
    
    function timeUpdate() {
        var playPercent = timelineWidth * (music.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        if (music.currentTime == duration) {
            pButton.className = "";
            pButton.className = "fas fa-play";
        }
    }
    
    function play() {
        if (music.paused) {
            music.play();
            pButton.className = "";
            pButton.className = "fas fa-pause";
        } else { // pause music
            music.pause();
            pButton.className = "";
            pButton.className = "fas fa-play";
        }
    }
    
    music.addEventListener("canplaythrough", function() {
        duration = music.duration;
    }, false);
    
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
    
  }

  
readMp3(event: any){
  // console.log(event);
  this.playerOn = true;
  this.nameFile = event.target.files[0].name;
  this.srcMusic = '';
  this.arrayMp3 = [];

  var target = event.currentTarget;
  var file = target.files[0];
  var reader = new FileReader();
  var pButton = document.getElementById('#pButton');
//   pButton.className = "fas fa-play";

  if (target.files && file) {
        var reader = new FileReader();
        reader.onload = (e:any) => {
            this.srcMusic = e.target.result;            
        }
        reader.readAsDataURL(file);
      }
      this.arrayMp3.push({
        Name: file.name,
        Type: file.type,
        Value: event.target.value
      })
      this._appService.arrayMp3 = this.arrayMp3;
      console.log(this._appService.arrayMp3);
  }
  clickInput(){}


}