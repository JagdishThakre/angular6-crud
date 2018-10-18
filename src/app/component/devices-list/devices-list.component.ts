import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevicesService } from '../../services/devices.service';
@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
    data: any;
    interfaces: any[] = [];
    deviceForm: FormGroup;
    interfaceForm: FormGroup;
    submitAttempt: boolean = false;
    editForm: boolean = false;
    editInterfaceForm: boolean = false;

    editIndex: number;
    viewIndex: number = 0;
    editInterfaceIndex : number;
    constructor(
        public formBuilder: FormBuilder,
        public devicesService: DevicesService
    ) {
    }

    ngOnInit() {
        this.data = this.devicesService.devices;
        this.deviceForm = this.formBuilder.group({
            hostname: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$")
            ])],
            ipadd: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$")

            ])],
            interfaces: [[]]
        });

        this.interfaceForm = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$")
            ])],
            ip: ['', Validators.compose([
                Validators.required,
                Validators.pattern("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$")

            ])]
        });
    }

    addHost() {
        this.submitAttempt = true;
        if (this.deviceForm.valid) {
            this.devicesService.addHost(this.deviceForm.value).subscribe(data => {
                if (data.code == 200) {
                    this.submitAttempt = false;
                    this.deviceForm.reset();
                } else {
                    alert(data.msg)
                }
            })
        }
    }
    deleteHost(index) {
        this.devicesService.removeHost(index).subscribe(data => {
            this.data = [];
            this.data = data.data;
        })
    }
    openEditForm(i) {
        this.editForm = true;
        this.editIndex = i;
        this.deviceForm.controls['hostname'].patchValue(this.data[i].hostname);
        this.deviceForm.controls['ipadd'].patchValue(this.data[i].ipadd);
    }
    editHost() {
        if (this.deviceForm.valid) {
            this.devicesService.editHost(this.editIndex, this.deviceForm.value).subscribe(data => {
                if (data.code == 200) {
                    this.editForm = false;
                    this.data = [];
                    this.data = data.data;
                    this.deviceForm.reset();
                } else {
                    alert(data.msg)
                }
            })
        }
    }

    view(index) {
        this.viewIndex = index;
        this.interfaces = this.devicesService.devices[this.viewIndex].interfaces;
    }
    addInterface() {
        this.submitAttempt = true;
        if (this.interfaceForm.valid) {
            this.devicesService.addInterface(this.viewIndex, this.interfaceForm.value).subscribe(data => {
              console.log("add interface", data)
                if (data.code == 200) {
                    this.submitAttempt = false;
                    this.interfaceForm.reset();
                } else {
                    alert(data.msg)
                }
            })
        }
    }
    openInterfaceEditForm(index){
        this.editInterfaceIndex = index;
        this.editInterfaceForm = true;
        this.interfaceForm.controls['name'].patchValue(this.interfaces[index].name);
        this.interfaceForm.controls['ip'].patchValue(this.interfaces[index].ip);
    }
    editInterface() {
        if (this.interfaceForm.valid) {
            this.devicesService.editInterface(this.viewIndex, this.editInterfaceIndex, this.interfaceForm.value).subscribe(data => {
                if (data.code == 200) {
                    this.editInterfaceForm = false;
                    this.interfaces = [];
                    this.interfaces = data.data;
                    this.interfaceForm.reset();
                } else {
                    alert(data.msg)
                }
            })
        }
    }
    deleteInterface(index) {
        this.devicesService.removeInterface(this.viewIndex,index).subscribe(data => {
            this.interfaces = [];
            this.interfaces = data.data;
        })
    }
}
