import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PersonneService } from 'src/app/services/personne.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


/* les donnees*/
export interface PeriodicElement {
  ID: number;
  Nom: string;
  Bureau: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, Nom: 'Hydrogen', Bureau: 'H'},
  {ID: 2, Nom: 'Helium', Bureau: 'He'},
  {ID: 3, Nom: 'Lithium', Bureau: 'Li'},
  {ID: 4, Nom: 'Beryllium', Bureau: 'Be'},
  {ID: 5, Nom: 'Boron',  Bureau: 'B'},
  {ID: 6, Nom: 'Carbon', Bureau: 'C'},
  {ID: 7, Nom: 'Nitrogen', Bureau: 'N'},
  {ID: 8, Nom: 'Oxygen',  Bureau: 'O'},
  {ID: 9, Nom: 'Fluorine',  Bureau: 'F'},
  {ID: 10, Nom: 'Neon',  Bureau: 'Ne'},
];

/*components*/
@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss'],
  encapsulation: ViewEncapsulation.None
})






export class PersonneComponent implements OnInit {
  donnees: any;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  displayedColumns: string[] = [ 'select', 'edit', 'ID', 'Nom', 'Bureau'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}/** The label for the checkbox on the passed row */
checkboxLabel(row?: PeriodicElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID + 1}`;
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


/*constructeur*/
  constructor(private perService: PersonneService) {
   }
/*INIT()*/
  ngOnInit() {
    // this.getAllData(1);
  }
/*recuperer les donnees*/
  async getAllData(id) {
    this.donnees = await this.perService.getAllUsers(id).subscribe(res => {
      // this.data = [...res['users']],
      this.donnees = res,
      console.log(res);
    });





  }





}
