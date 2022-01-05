import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import * as moment from 'moment';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ProduitService } from '../service/produit.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );
  user = this.serviceUser.getuser();
  produits: any;
  charger: boolean;
  filterForm: FormGroup;
  @Output() onListChange = new EventEmitter<string[]>();
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'brand' },
    { value: 2, name: 'other' },
  ];
  status: any[] = [
    { value: 0, name: 'FB Connect' },
    { value: 1, name: 'Signup' },
    { value: 2, name: 'On Action' },
  ];

  constructor(
    private ServiceClub: ClubService,
    private Service: ProduitService,
    private serviceUser: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: new FormControl(),
      last_login: new FormControl(),
      created_at: new FormControl(),
      company: new FormControl(),
      company_type: new FormControl(),
      score: new FormControl(),
      status: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe((value) => {
      value.last_login = moment(value.last_login).format('YYYY-MM-DD');
      value.created_at = moment(value.created_at).format('YYYY-MM-DD');

      this.onListChange.emit(value);
      console.log(value);
    });
  }
}
