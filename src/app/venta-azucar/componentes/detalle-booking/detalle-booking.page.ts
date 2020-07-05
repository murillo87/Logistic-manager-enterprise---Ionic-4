import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-booking',
  templateUrl: './detalle-booking.page.html',
  styleUrls: ['./detalle-booking.page.scss'],
})
export class DetalleBookingPage implements OnInit {

  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
