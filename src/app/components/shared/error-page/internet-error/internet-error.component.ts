import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-internet-error',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './internet-error.component.html',
  styleUrl: './internet-error.component.css'
})
export class InternetErrorComponent {
  statusCode: number;
  message: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract status code and message from the route parameters
    this.route.queryParams.subscribe(params => {
      this.statusCode = +params['statusCode'];
      this.message = params['message'];
    });
  }
}
