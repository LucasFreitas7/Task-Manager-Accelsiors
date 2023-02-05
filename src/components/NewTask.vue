<template>
    <v-container>
      <template>
        <div class="new-task">
            <v-select
              :items="items"
              label="Activity"
              v-model="task.activty"
            ></v-select>
            <v-text-field
                label="Message"
                hide-details="auto"
                v-model="task.comment"
            ></v-text-field>
            <v-text-field
            label="Duration *"
            hide-details="auto"
            type="number"
            v-model.number="task.duration"
            step="0.5"
            min="0.5"
            max="12"
            ></v-text-field>
            <div class="input-date">
              <v-col
              cols="12"
              sm="6"
              md="4"
              >
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                  </template>
                  <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                      Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                  >
                      OK
                  </v-btn>
                  </v-date-picker>
              </v-menu>
              </v-col>
          </div>
        <v-btn
            class="ma-2"
            color="green"
            :loading="loading"
            @click="newTask()"
            >
            New Task
        </v-btn>
        <AlertTask  v-if="warning != ''"   :message="warning"/>
        <AlertTask  v-if="warningSucess != ''" :message="warningSucess" :success="true"/>
        </div>
        </template>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import AlertTask from "@/components/AlertTask.vue"
    export default {
      name: 'NewTask',
      components:{
        AlertTask
      },
      data: () => ({
        items: ['Cook', 'Videogame', 'Workout', 'Study', 'Walk'],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        loading: false,
        warning: '',
        contId: 0,
        warningSucess: '',
        task: {},
      }),
      computed:{
        ...mapGetters(['getAll'])
      },
      methods:{
        ...mapActions(['addTask']),
        newTask(){
          this.warning = ''
          this.task.id = this.contId + 1
          this.contId++
          this.task.done = false
          this.task.date = this.date
          var exist = false
          this.getAll.map(e=> {
          if(e.date === this.task.date && e.activty ===  this.task.activty)
            exist = true
          })
          if(exist === true){
            this.warning = 'Already exist a activty on this day, please try again'
            setTimeout(() => {
              this.warning = ''
            },"3000")
            return
          }
          if((this.task.activty === ''  || !this.task.activty)  &&  (this.task.duration === '' || !this.task.duration)){
            this.warning = 'More then one inputs its missing'
            setTimeout(() => {
              this.warning = ''
            }, "3000")
            return
          }
          else if((this.task.activty === ''  || !this.task.activty)){
            this.warning = 'Activity is a required field'
            setTimeout(() => {
              this.warning = ''
            }, "3000")
            return
          }
          else if((this.task.duration === '' || !this.task.duration)){
            this.warning = 'Duration is a required field'
            setTimeout(() => {
              this.warning = ''
            }, "3000")
            return
          }
          else if(this.task.duration < 0.5 || this.task.duration > 12){
            this.warning = 'Duration needs to be in a range 0.5 to 12'
            setTimeout(() => {
              this.warning = ''
            }, "3000")
            return
          }
          this.addTask(this.task)
          this.task = {}
          this.warningSucess = 'Task created with success'
          setTimeout(() => {
            this.warningSucess = ''
          }, "2000")
          return
        }
  
      },
      created(){
        this.contId= this.getAll.length
      }
    }
  </script>
  
  <style>
  .col-md-4{
    padding: 0 !important;
  }

  .new-task{
    width: 40%;
  }

  @media (max-width: 600px) {
    .new-task{
      width: 90%;
    }
  }
  </style>
  