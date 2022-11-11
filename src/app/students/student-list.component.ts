import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { StudentService } from "./student.service";
import { IStudent } from "./student";

@Component({
    selector: 'pm-student',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']

})
export class StudentListComponent implements OnInit, OnDestroy{
    
    pageTitle: string = 'Student List!';
    imgWidth: number = 50;
    imgMargin: number = 2;
    showImg: boolean = false;
    errorMessage: string = '';
    sub! : Subscription;
    inputId! : string;
    inputId2! : string;


    private _listFilter: string = ' ';
    get listFilter() : string{
        return this._listFilter;
    }
    set listFilter(value : string){
        this._listFilter = value;
        console.log('Hits setter:', value);
        this.filteredStudents = this.performFilter(value);
    }

    filteredStudents : IStudent[] = [];
    students: IStudent[] = [];
    constructor(private studentService : StudentService,
                private http:HttpClient){}
    

    performFilter(filterBy : string) : IStudent[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.students.filter((student : IStudent) => 
        student.id.includes(filterBy));
    }

    toggleImg(): void{
        this.showImg = !this.showImg;
    }
    ngOnInit(): void {
        this.sub = this.studentService.getStudents().subscribe({
            next: students => {
                this.students = students;
                this.filteredStudents = this.students;
            },
            error: err => this.errorMessage = err
        });
    }

    private Url = 'https://localhost:7193/api/Students';
    status! : string;
    studentById : IStudent = { id: "", studentId: 0, name: "name", dept : "dept", uniName : "uniName", contactNo: "contactNo"};
    studentPost : IStudent = { id: "", studentId: 0, name: "", dept : "", uniName : "", contactNo: ""};
    deleteStudentById(id : string) : void {
      this.http.delete(`https://localhost:7193/api/Students/${id}`).subscribe();
      this.ngOnInit();
      this.inputId = '';
    }
    getStudentById(id : string) : void {
        this.http.get(`https://localhost:7193/api/Students/${id}`).subscribe(
            (student: any) => {
                this.studentById = student;
                console.log(this.studentById);
                this.inputId2 = '';
            }
        );
    }
    postStudent() : void {
        this.http.post(`https://localhost:7193/api/Students`, this.studentPost).subscribe(
            () => {
                console.log('posted ' + this.studentPost);
                this.ngOnInit();
                this.studentPost.id = '';
                this.studentPost.studentId = 0;
                this.studentPost.name = '';
                this.studentPost.uniName = '';
                this.studentPost.contactNo = '';
            }
        );
    }
    studentEdit : IStudent = { id: "", studentId: 0, name: "", dept : "", uniName : "", contactNo: ""};
    clicked : boolean = false;
    editStudent(id : string) : void{
        this.http.get(`https://localhost:7193/api/Students/${id}`).subscribe(
            (student: any) => {
                this.studentEdit = student;
                this.clicked = true;
            }
        );
    }

    putStudent(student : IStudent) : void{
        this.deleteStudentById(student.id);
        student.id = '';
        this.http.post(`https://localhost:7193/api/Students`, student).subscribe(
            () => {
                console.log('posted ' + this.studentPost);
                this.clicked = false;
                this.ngOnInit();
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}