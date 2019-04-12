import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-old',
  templateUrl: './navbar-old.component.html',
  styleUrls: ['./navbar-old.component.scss']
})
export class NavbarOldComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
    $(window).scroll(function(){
      $(".logo-fico").css("width", 180 - $(window).scrollTop() / 3); 
    });

}

}
