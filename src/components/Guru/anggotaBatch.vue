<template>
<main class="d-flex flex-nowrap">
  <sidebar/>
  <div class="d-flex flex-column flex-fill p-3">
    <div class="card" style="margin-bottom:3%">
      <h3 class="card-header text-warning">Detail</h3>
      <div class="card-body">
        <table class="table table-borderless align-middle m-0" v-if="listBatchSatuan.name">
          <tr>
            <td style="width:10%">Name</td>
            <td style="width:2%">:</td>
            <td style="">{{listBatchSatuan.name}}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>:</td>
            <td>{{moment(listBatchSatuan.start_date).format('DD MMMM YYYY')}}</td>
          </tr>
          <tr>
            <td>Pay</td>
            <td>:</td>
            <td>{{listBatchSatuan.pay}}</td>
          </tr>
        </table>
        <div v-else class="text-center w-100">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <!--Anggota Batch-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Aggota Batch</h3>
    </div>
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="text-center" scope="col">Username</th>
          <th class="text-center" scope="col">Email</th>
          <th class="text-center" scope="col">Status</th>
          <th class="text-center" scope="col">Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listAnggotaBatch.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listAnggotaBatch">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listAnggotaBatch">
          <td>{{key+1}}</td>
          <td>{{value.name}}</td>
          <td>{{value.email}}</td>
          <td class="text-center">{{value.status}}</td>
          <td>{{value.address}}</td>
          <td v-if="value.status == 'mendaftar'" @click="accMurid(value.id_murid, key)">
            <button type="button" class="btn btn-sm btn-success m-0">accept</button>
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    
    <!--ujian-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Ujian  </h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="displayAddUjian = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editMode, 'd-none':editMode}" @click="editMode=true">Edit</button>
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':editMode, 'd-none':!editMode}" @click="editMode=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editMode, 'd-none':!editMode}" @click="refreshUjian()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editMode, 'd-none':!editMode}" @click="saveEditUjian()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle" style="margin-bottom:2em">
      <thead>
        <tr>
          <th class="text-center" style="width:1%" scope="col"></th>
          <th class="text-center" style="width:1%" scope="col" v-if="!editMode"></th>
          <th class="text-center" style="width:30%" scope="col">Name</th>
          <th class="text-center" style="width:30%" scope="col">Pengawas</th>
          <th class="text-center" style="width:10%" scope="col">Time</th>
          <th class="text-center" style="width:27%" scope="col">Date</th>
          <th class="text-center" style="width:1%" scope="col" v-if="editMode"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listUjian.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!listUjian">
          <td colspan="10" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-for="(value, key) in listUjian" :class="{'table-danger':editMode && listDeleteUjian.includes(value.id)}">
          <td>{{key+1}}</td>
          <td v-if="!editMode">
              <button class="btn btn-sm btn-outline-warning" type="button" @click="scoreUjian(value.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
          </td>
          <!--name-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].name" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.name}}</td>
          <!--pengawas-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].pengawas" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{value.pengawas}}</td>
          <!--time-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].time" class="form-control form-control-sm" type="time"></td>
          <td class="text-center" v-else>{{value.time}}</td>
          <!--date-->
          <td v-if="editMode && listEditUjian[key] && new Date(value.date) > new Date()"><input v-model="listEditUjian[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td class="" v-else>{{value.date1}}</td>
          <!--delete-->
          <td v-if="editMode && !listDeleteUjian.includes(value.id)" @click="listDeleteUjian.push(value.id)">
            <button type="button" class="btn btn-sm btn-outline-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
            </button>
          </td>
          <td class="align-middle" v-if="editMode && listDeleteUjian.includes(value.id)" @click="listDeleteUjian.splice(listDeleteUjian.indexOf(value.id))">
            <button type="button" class="btn btn-sm btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!--pertemuan-->
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Pertemuan</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editModePertemuan, 'd-none':editModePertemuan}" @click="displayAddPertemuan = true">Add</button>
          <button type="button" class="btn-sm btn btn-outline-warning" :class="{'d-block':!editModePertemuan, 'd-none':editModePertemuan}" @click="editModePertemuan=true">Edit</button> 
          <button type="button" class="btn-sm btn btn-outline-primary" :class="{'d-block':editModePertemuan, 'd-none':!editModePertemuan}" @click="editModePertemuan=false">Back</button>
          <button type="button" class="btn-sm btn btn-outline-danger" :class="{'d-block':editModePertemuan, 'd-none':!editModePertemuan}" @click="refreshPertemuan()">Reset</button>
          <button type="button" class="btn-sm btn btn-outline-success" :class="{'d-block':editModePertemuan, 'd-none':!editModePertemuan}" @click="saveEditPertemuan()">Save</button>
        </div>
      </div>
    </div>
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th v-if="!editModePertemuan" scope="col"></th>
          <th class="text-center" scope="col">Name Pertemuan</th>
          <th class="text-center" scope="col">Pengajar</th>
          <th class="text-center" scope="col">Keterangan</th>
          <th class="text-center" scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listPertemuan.length == 0">
          <td colspan="10">
            <div class="text-center">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-else-if="!listPertemuan">
          <td colspan="15" class="text-center">Data Tidak Tersedia</td>
        </tr>
        <tr v-else v-for="(value, key) in listPertemuan" :class="{
          'table-light':value.name_guru == username && new Date(value.date) <= new Date(),
          'table-warning':value.name_guru == username && new Date(value.date) > new Date(),
          'table-danger':editModePertemuan && listDeletePertemuan.includes(value.id_pertemuan)
        }">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <td v-if="!editModePertemuan" style="width:5%; text-align:center">
            <button class="btn btn-sm btn-outline-warning" type="button" @click="detailPertemuan(listPertemuan[key].id_pertemuan)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </td>
          <!--name pertemuan-->
          <td v-if="editModePertemuan && listEditPertemuan[key] && new Date(listPertemuan[key].date) > new Date()"><input v-model="listEditPertemuan[key].name_pertemuan" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{listPertemuan[key].name_pertemuan}}</td>
          <!--name guru-->
          <td v-if="editModePertemuan && listEditPertemuan[key] && new Date(listPertemuan[key].date) > new Date()">
            <input v-model="listEditPertemuan[key].name_guru" @focus="listPertemuan[key].modeEditGuru=true" @blur="modeHover(key, 'edit', 'guru')" class="form-control form-control-sm" style="z-index:2" type="text">
            <div class="list-group position-absolute overflow-auto" :class="{'d-none':!listPertemuan[key].modeEditGuru, 'd-block':listPertemuan[key].modeEditGuru}" style="z-index:3 height:100px">
              <div  style="height:30vh; width:12vw">
                <div v-for="(value1, key1) in listGuru">
                  <div v-if="!listEditPertemuan[key].name_guru || value1.name.toLowerCase().includes(listEditPertemuan[key].name_guru.toLowerCase())" @click="listEditPertemuan[key].name_guru = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                </div>
              </div>
            </div>
          </td>
          <td v-else>{{listPertemuan[key].name_guru}}</td>
          <!--keterangan-->
          <td v-if="editModePertemuan && listEditPertemuan[key] && new Date(listPertemuan[key].date) > new Date()"><input v-model="listEditPertemuan[key].keterangan" class="form-control form-control-sm" type="text"></td>
          <td v-else>{{listPertemuan[key].keterangan}}</td>
          <!--date-->
          <td v-if="editModePertemuan && listEditPertemuan[key] && new Date(listPertemuan[key].date) > new Date()"><input v-model="listEditPertemuan[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td v-else>{{listPertemuan[key].date}}</td>
          <!--<td v-else>{{moment(listPertemuan[key].date).format('dddd, DD-MMMM-YYYY, HH:mm')}}</td>-->
          <!--<td v-else>{{new Date(listPertemuan[key].date).toUTCString().substring(0, 25)}}</td>-->
          <!--delete-->
          <td style="width:5%;text-align:center" v-if="editModePertemuan && !listDeletePertemuan.includes(listPertemuan[key].id_pertemuan)" @click="listDeletePertemuan.push(listPertemuan[key].id_pertemuan)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
          <td style="width:5%;text-align:center" v-if="editModePertemuan && listDeletePertemuan.includes(listPertemuan[key].id_pertemuan)" @click="listDeletePertemuan.splice(listDeletePertemuan.indexOf(listPertemuan[key].id_pertemuan))"><button type="button" class="btn btn-sm btn-outline-success">v</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</main>

<!--modal add ujian-->
<div :class="{'d-block':displayAddUjian, 'd-none':!displayAddUjian}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddUjian = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Ujian</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddUjian()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddUjian = false">x</button>
        </div>
      </div>
    </div>
    <table class="table ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Pengawas</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in listUjianBaru">
            <td style="width:5%; text-align:center">{{key+1}}</td>
            <td><input v-model="listUjianBaru[key].name" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].pengawas" class="form-control form-control-sm" type="text"></td>
            <td><input v-model="listUjianBaru[key].time" class="form-control form-control-sm" type="time"></td>
            <td><input v-model="listUjianBaru[key].date" class="form-control form-control-sm" type="datetime-local"></td>
            <td style="width:5%; text-align:center" @click="listUjianBaru.splice(key, 1)">x</td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

<!--modal message-->
<div v-if="displayMessage" class="min-vw-100 position-fixed top-0 text-center" style="">
  <div :class="{'alert-danger': !messageStatus, 'alert-success':messageStatus}" class="alert d-none d-lg-block">{{message}}</div>
</div>
<!--modal add Pertemuan-->
<div :class="{'d-block':displayAddPertemuan, 'd-none':!displayAddPertemuan}" class="min-vw-100 min-vh-100 position-fixed top-0" style="">
  <div class="min-vw-100 min-vh-100 bg-black opacity-50 position-absolute" style="z-index:-1" @click="displayAddPertemuan = false"></div>
  <div class="min-vw-80 bg-light p-3 overflow-auto" style="height:80vh;margin:5% 10%;border-radius:10px">
    <div class="nav-tabs d-flex justify-content-between">
      <h3 class="nav-link active bg-light text-warning">Add Pertemuan</h3>
      <div class="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn-sm btn btn-outline-success" @click="saveAddPertemuan()">Save</button>
          <button type="button" class="btn-sm btn btn-outline-primary" @click="listPertemuanBaru.push({name_batch:'',name_pertemuan:'',name_guru:username||'',keterangan:'',datetime:(new Date(new Date().valueOf()+1000*60*60*31).toISOString().substring(0, 16))})">+</button>
          <button type="button" class="btn-sm btn btn-outline-danger" @click="displayAddPertemuan = false">x</button>
        </div>
      </div>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th class="text-center" style="width:24%;" scope="col">Name Pertemuan</th>
          <th class="text-center" style="width:22%;" scope="col">Pengajar</th>
          <th class="text-center" style="width:30%;" scope="col">Keterangan</th>
          <th class="text-center" style="width:24%;" scope="col">Date</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in listPertemuanBaru">
          <td style="width:5%; text-align:center">{{key+1}}</td>
          <!--name pertemuan-->
          <td><input v-model="listPertemuanBaru[key].name_pertemuan" class="form-control form-control-sm" type="text"></td>
          <td>
            <input v-model="listPertemuanBaru[key].name_guru" @focus="value.modeAddGuru=true" @blur="modeHover(key, 'add', 'guru')" class="form-control form-control-sm" style="z-index:2" type="text">
            <div class="list-group position-absolute overflow-auto" :class="{'d-none':!value.modeAddGuru, 'd-block':value.modeAddGuru}" style="z-index:3 height:100px">
              <div  style="height:30vh; width:12vw">
                <div v-for="(value1, key1) in listGuru">
                  <div v-if="!listPertemuanBaru[key].name_guru || value1.name.toLowerCase().includes(listPertemuanBaru[key].name_guru.toLowerCase())" @click="listPertemuanBaru[key].name_guru = value1.name" class="list-group-item list-group-item-action">{{value1.name}}</div>
                </div>
              </div>
            </div>
          </td>
          <!--keterangan-->
          <td><input v-model="listPertemuanBaru[key].keterangan" class="form-control form-control-sm" type="text"></td>
          <!--date-->
          <td><input v-model="listPertemuanBaru[key].datetime" class="form-control form-control-sm" type="datetime-local"></td>
          <td @click="listPertemuanBaru.splice(key, 1)"><button type="button" class="btn btn-sm btn-outline-danger">x</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script setup>
  import sidebar from './sidebar.vue';
</script>
<script>
import axios from "axios";
import moment from 'moment';
moment().format();
export default {
  data: () => ({
    //batch
    listBatchSatuan:{},
    listAnggotaBatch:[],
    //guru
    username: '',
    listGuru: [],
    modeAddGuru: false,
    //ujian
    listUjian:[],
    listEditUjian:[],
    listDeleteUjian:[],
    listUjianBaru:[
      {name:'', pengawas:'', time:'02:00:00', date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))}
    ],
    displayAddUjian: false,
    editMode: false,
    //pertemuan
    listPertemuan:[],
    listEditPertemuan:[],
    listDeletePertemuan:[],
    listPertemuanBaru:[ ],
    editModePertemuan: false,
    displayAddPertemuan: false,
    //message
    displayMessage:false,
  }),
  async mounted() {
    try{
      this.token = await this.$store.getters["auth/token"]
      axios.defaults.headers.common['token'] = this.token;
      this.listPertemuanBaru.push({name_batch: "", name_pertemuan:"", name_guru: this.username || '', keterangan:"", datetime:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})
     
      //get list batch satuan
      this.listBatchSatuan = (await axios.get("guru/listBatchSatuan/"+this.$route.params.id, {})).data.data

      //get list anggota batch / peserta batch
      this.listAnggotaBatch = (await axios.get("guru/listAnggotaBatch/"+this.$route.params.id, {})).data.data
      if(this.listAnggotaBatch.length == 0) this.listAnggotaBatch = false

      //get list ujian
      this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
      if(this.listUjian.length == 0) this.listUjian = false
      for(let i = 0; i < this.listUjian.length; i++){
        this.listUjian[i].date1 = moment(this.listUjian[i].date).format('dddd, DD MMMM YYYY, HH:mm')
        this.listUjian[i].date2 = moment(this.listUjian[i].date).format()
        this.listUjian[i].datetime = moment(this.listUjian[i].date).format('YYYY-MM-DDTHH:mm')
      }
      //clone list Ujian
      this.listEditUjian = JSON.parse(JSON.stringify(this.listUjian))

      //list pertemuan
      this.listPertemuan = ( await axios.get("guru/listPertemuanBatch/"+this.$route.params.id, {})).data.data
      if(this.listPertemuan.length == 0) this.listPertemuan = false
      for(let i = 0; i < this.listPertemuan.length; i++){
        this.listPertemuan[i].date = moment(this.listPertemuan[i].date).format('dddd, DD MMMM YYYY, HH:mm')
        this.listPertemuan[i].datetime = moment(this.listPertemuan[i].date).format('YYYY-MM-DDTHH:mm')
      }
      //clone list pertemuan
      this.listEditPertemuan = JSON.parse(JSON.stringify(this.listPertemuan))

      //get list guru
      this.listGuru = (await axios.get("guru/listGuru", {})).data.data
      if(this.listGuru.length == 0) this.listGuru = false
      //name guru
      this.nameGuru = await this.$store.getters["auth/user"].name
    }catch(err){
        console.log("error")
        console.log(err)
      }
  },
  methods:{
    async accMurid(id, idList){
      try{
        //ambil list anggota batch
        axios.defaults.headers.common['token'] = this.token;
        await axios.get("guru/accAnggotaBatch/"+id);
        this.listAnggotaBatch[idList].status = 'terdaftar'
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddUjian(){
      try{
        // let addUjian = {tugasName:[], tugasDescription:[]}
        while(this.listUjianBaru.length){
          if(new Date(this.listUjianBaru[0].date) <= new Date()){
            this.messageF(`Date Tidak Valid`, false)
            throw 'Date Tidak Valid'
          }else if(this.listUjianBaru[0].name && this.listUjianBaru[0].pengawas && this.listUjianBaru[0].time && this.listUjianBaru[0].date){
            await axios.post("guru/addUjian/"+this.$route.params.id, {
              name: this.listUjianBaru[0].name,
              pengawas: this.listUjianBaru[0].pengawas,
              time: this.listUjianBaru[0].time,
              date: this.listUjianBaru[0].date,
            })
          }else{
            this.messageF(`Lengkapi Semua Data`, false)
            throw 'lengkapi semua data'
          }
          this.listUjianBaru.splice(0,1)
        }
        this.refreshUjian(`berhasil menambahkan Ujian`, true)
        this.displayAddUjian = false
        this.listUjianBaru.push({name:'',pengawas:'',time:'02:00:00',date:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveEditUjian(){
      try{
        //delete tugas
        for(let i = 0; i < this.listDeleteUjian.length; i++){
          await axios.delete("guru/deleteUjian/"+this.listDeleteUjian[i], {})
        }
        //edit tugas
        for(let i = 0; i < this.listEditUjian.length; i++){
          if(this.listEditUjian[i].name != this.listUjian[i].name || this.listEditUjian[i].time != this.listUjian[i].time ||
             this.listEditUjian[i].pengawas != this.listUjian[i].pengawas || this.listEditUjian[i].datetime != this.listUjian[i].datetime){
            if(new Date(this.listEditUjian[i].datetime) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            await axios.put("guru/updateUjian/"+this.listUjian[i].id, {
              name: this.listEditUjian[i].name, 
              pengawas: this.listEditUjian[i].pengawas,
              time: this.listEditUjian[i].time,
              date: this.listEditUjian[i].datetime,
            })
          }
        }
        this.editMode = false
        this.refreshUjian(`Berhasil Mengupdate Ujian`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshUjian(ket, status){
      try{
        //get list ujian
        this.listUjian = (await axios.get("guru/listUjian/"+this.$route.params.id, {})).data.data
        if(this.listUjian.length == 0) this.listUjian = false
        //clone list Ujian
        for(let i = 0; i < this.listUjian.length; i++){
          this.listUjian[i].date1 = moment(this.listUjian[i].date).format('dddd, DD MMMM YYYY, HH:mm')
          this.listUjian[i].date2 = moment(this.listUjian[i].date).format()
          this.listUjian[i].datetime = moment(this.listUjian[i].date).format('YYYY-MM-DDTHH:mm')
        }
        this.listEditUjian = JSON.parse(JSON.stringify(this.listUjian))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`refresh materi`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async scoreUjian(id){
      try{
        this.editMode ? true : this.$router.push({ name: 'scoreUjian', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveAddPertemuan(){
      try{
        let idBatch = this.listBatchSatuan.id
        let idGuru = null
        for(let i = 0; this.listPertemuanBaru.length; i){
          if(
            this.listPertemuanBaru[i].name_guru &&
            this.listPertemuanBaru[i].name_pertemuan &&
            this.listPertemuanBaru[i].keterangan &&
            this.listPertemuanBaru[i].datetime
          ){
            //date tidak valid
            if(new Date(this.listPertemuanBaru[i].datetime) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            //search id guru
            idGuru = null
            if(!this.listPertemuanBaru[i].name_guru) this.listPertemuanBaru[i].name_guru = this.nameGuru
            for(let o = 0; o < this.listGuru.length; o++){
              if(this.listPertemuanBaru[i].name_guru == this.listGuru[o].name){
               idGuru = this.listGuru[o].id
              }
            }
            if(!idGuru) { //jika nama batch yang diinputkan tidak tersedia di nama batch
              this.messageF(`guru ${this.listPertemuanBaru[i].name_guru} tidak tersedia`, false)
              throw `guru ${this.listPertemuanBaru[i].name_guru} tidak tersedia`
            }
            //kirim data
            await axios({
              method: 'post',
              url: "guru/addPertemuan/"+idBatch,
              data: {
                pengajar: idGuru,
                name: this.listPertemuanBaru[i].name_pertemuan,
                ket: this.listPertemuanBaru[i].keterangan,
                date: this.listPertemuanBaru[i].datetime,
              },
              headers: {'Content-Type': 'multipart/form-data' }
            })
          }else{
            this.messageF(`Lengkapi Semua Data`, false)
            throw 'lengkapi semua data'
          }
          this.listPertemuanBaru.splice(0,1)
        }
        this.displayAddPertemuan = false
        this.refreshPertemuan(`Berhasil Menambahkan Pertemuan`, true)
        this.listPertemuanBaru.push({name_batch: "", name_pertemuan:"", name_guru: this.username || '', keterangan:"", datetime:(new Date(new Date().valueOf() + 1000*60*60*31).toISOString().substring(0, 16))})
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async saveEditPertemuan(){
      try{
        let idBatch = this.listBatchSatuan.id
        let idGuru
        //delete tugas
        for(let i = 0; i < this.listDeletePertemuan.length; i++){
         await axios.delete("guru/deletePertemuan/"+this.listDeletePertemuan[i])
        }
        this.listDeletePertemuan = []
        //edit tugas
        for(let i = 0; i < this.listEditPertemuan.length; i++){
          if(
            this.listEditPertemuan[i].name_pertemuan != this.listPertemuan[i].name_pertemuan || 
            this.listEditPertemuan[i].keterangan != this.listPertemuan[i].keterangan || 
            this.listEditPertemuan[i].name_guru != this.listPertemuan[i].name_guru || 
            this.listEditPertemuan[i].datetime != this.listPertemuan[i].datetime){
            //date tidak valid
            if(new Date(this.listEditPertemuan[i].datetime) <= new Date()){
              this.messageF(`Date Tidak Valid`, false)
              throw 'Date Tidak Valid'
            }
            //search id guru
            if(this.listEditPertemuan[i].name_guru != this.listPertemuan[i].name_guru){
              idGuru = null
              if(!this.listEditPertemuan[i].name_guru) this.listEditPertemuan[i].name_guru = this.nameGuru
              for(let o = 0; o < this.listGuru.length; o++){
                if(this.listEditPertemuan[i].name_guru == this.listGuru[o].name) idGuru = this.listGuru[o].id
              }
              if(!idGuru) { //jika nama batch yang diinputkan tidak tersedia di nama batch
                this.messageF(`guru ${this.listEditPertemuan[i].name_guru} tidak tersedia`, false)
                throw `guru ${this.listEditPertemuan[i].name_guru} tidak tersedia`
              }
            }else idGuru = this.listPertemuan[i]['id guru']
            await axios.put("guru/updatePertemuan/"+this.listPertemuan[i].id_pertemuan, {
              pengajar: idGuru,
              batch: idBatch,
              name: this.listEditPertemuan[i].name_pertemuan, 
              ket: this.listEditPertemuan[i].keterangan,
              date: this.listEditPertemuan[i].datetime,
            })
          }
        }
        this.refreshPertemuan(`Berhasil Mengupdate Pertemuan`, true)
        this.editModePertemuan = false
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async refreshPertemuan(ket, status){
      try{
        //list pertemuan
        this.listPertemuan = ( await axios.get("guru/listPertemuanBatch/"+this.$route.params.id, {})).data.data
        if(this.listPertemuan.length == 0) this.listPertemuan = false
        for(let i = 0; i < this.listPertemuan.length; i++){
          this.listPertemuan[i].date = moment(this.listPertemuan[i].date).format('dddd, DD MMMM YYYY, HH:mm')
          this.listPertemuan[i].datetime = moment(this.listPertemuan[i].date).format('YYYY-MM-DDTHH:mm')
        }
        //clone list pertemuan
        this.listEditPertemuan = JSON.parse(JSON.stringify(this.listPertemuan))
        //ket
        if(ket) this.messageF(ket, status)
        else this.messageF(`Refresh Pertemuan`, true)
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async modeHover(i, position, sub){
      try{
        let time = 400
        if(position == 'add'){
          if(sub == 'batch') setTimeout(()=>{this.listPertemuanBaru[i].modeAddBatch=false}, time)
          else if(sub == 'guru') setTimeout(()=>{this.listPertemuanBaru[i].modeAddGuru=false}, time)
        }else if(position == 'edit'){
          if(sub == 'batch') setTimeout(()=>{this.listPertemuan[i].modeEditBatch=false}, time)
          else if(sub == 'guru') setTimeout(()=>{this.listPertemuan[i].modeEditGuru=false}, time)
          console.log('jalan')
        }
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    async detailPertemuan(id){
      try{
        if(!this.editMode) this.$router.push({ name: 'detailPertemuan', params: { id } })
      }catch(err){
        console.log("error")
        console.log(err)
      }
    },
    messageF(text, s){
      this.displayMessage = true
      this.messageStatus = s
      this.message = text || 'terjadi error'
      setTimeout(()=>{
        this.displayMessage = false
        this.message = `terjadi error`
      }, 3000)
    }
  }
}
</script>