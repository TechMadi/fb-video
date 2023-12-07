import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  confirmValidator:ValidatorFn=(control)=>{
    if(!control.value){
      return {error:true,required:true}
    }else if (control.value !== this.registerForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  registerForm:FormGroup=new FormGroup({
    userName:new FormControl(''),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl(''),
confirmPassword:new FormControl('',[Validators.required,this.confirmValidator]),
    agree:new FormControl(true,[Validators.required])
  })

  hide:boolean=true


  validateConfirmPassword():void{
    setTimeout(()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity())
  }


  submitForm=()=>{

  }
}
