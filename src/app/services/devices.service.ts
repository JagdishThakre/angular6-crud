import { Meta, Title } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DevicesService {

    devices: any[] = [
        {
            hostname: "www.abc.com",
            ipadd: "192.123.10.1",
            interfaces: []
        },
        {
            hostname: "www.abcd.com",
            ipadd: "168.111.2.1",
            interfaces: []
        }
    ]
    constructor(
        private http: HttpClient,
        private meta: Meta,
        private titleService: Title
    ) { }

    addHost(data): Observable<any> {
        for (var i = 0, len = this.devices.length; i < len; i++) {
            if (this.devices[i].hostname === data.hostname) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Hostname already exist!" }); })
            } else if (this.devices[i].ipadd === data.ipadd) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Lookup IP address already exist!" }); })
            } else {
                this.devices.push(data);
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices }); })
            }
        }
    }
    addInterface(index, data): Observable<any> {
        for (var k = 0, len = this.devices[index].interfaces.length; k < len; k++) {
            if (this.devices[index].interfaces[k].name === data.name) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Interface already exist!" }); })
            } else if (this.devices[index].interfaces[k].ip === data.ip) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Interface IP address already exist!" }); })
            } else {
                this.devices[index].interfaces.push(data);
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices }); })
            }
        }
        if(this.devices[index].interfaces.length == 0) {
            this.devices[index].interfaces.push(data);
                console.log("this.devices : ", this.devices)
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices }); })
        }
    }
    removeHost(index): Observable<any> {
        this.devices.splice(index, 1);
        return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices }); })
    }
    editHost(index, data): Observable<any> {
        for (var i = 0, len = this.devices.length; i < len; i++) {
            if (i == index) {
            } else if (this.devices[i].hostname === data.hostname) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Hostname already exist!" }); })
            } else if (this.devices[i].ipadd === data.ipadd) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Lookup IP address already exist!" }); })
            } else {
                this.devices[index].hostname = data.hostname;
                this.devices[index].ipadd = data.ipadd;
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices }); })
            }
        }
    }
    editInterface(inIndex, editIndex, data): Observable<any> {
        for (var i = 0, len = this.devices[inIndex].interfaces.length; i < len; i++) {
            if (i == editIndex) {
            } else if (this.devices[inIndex].interfaces[i].name === data.name) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Interface already exist!" }); })
            } else if (this.devices[inIndex].interfaces[i].ip === data.ip) {
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 203, msg: "Interface IP address already exist!" }); })
            } else {
                this.devices[inIndex].interfaces[editIndex].name = data.name;
                this.devices[inIndex].interfaces[editIndex].ip = data.ip;
                return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices[inIndex].interfaces }); })
            }
        }
    }
    removeInterface(inIndex, index): Observable<any> {
        this.devices[inIndex].interfaces.splice(index, 1);
        return Observable.create((observer: Observer<any>) => { return observer.next({ code: 200, data: this.devices[inIndex].interfaces }); })
    }

}
