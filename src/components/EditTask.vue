<template>
    <v-container>
      <template>
        <div>
            <v-select
            :items="items"
            label="Activity"
            v-model="getAll[taskId].activty"
          ></v-select>
            <v-text-field
                label="Message"
                hide-details="auto"
                v-model="getAll[taskId].comment"
            ></v-text-field>
            <v-text-field
            label="Duration *"
            hide-details="auto"
            type="number"
            v-model.number="getAll[taskId].duration"
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
            @click="taskEdit(getAll[taskId])"
            >
            Update Task
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
      name: 'EditTask',
      components:{
        AlertTask
      },
      props:{
        taskId:{
            type: Number,
            default: 1
        }
      },
      data: () => ({
        items: ['Cook', 'Videogame', 'Workout', 'Study', 'Walk'],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        warning:'',
        warningSucess:'',
        menu: false,
        loading: false
      }),
      computed:{
        ...mapGetters(['getAll'])
      },
      methods:{
        ...mapActions(['editTask']),
        taskEdit(task){
          this.warning = ''
          this.task = task
          this.task.date = this.date
          var exist = false
          this.getAll.map(e=> {
          if(e.date === this.task.date && e.activty ===  this.task.activty  && e.id != this.task.id)
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
            this.warning = 'Number needs to be in a range 0.5 to 12'
            setTimeout(() => {
              this.warning = ''
            }, "3000")
            return
          }
          this.editTask(this.task)
          this.warningSucess = 'Task updated with success'
          setTimeout(() => {
            this.warningSucess = ''
            this.$emit('close-dialog')
          }, "3000")
          return
        }
  
      },
    }
  </script>
  
  <style>
  .input-date{
    width: 100%;
  }

  .col-md-4{
    max-width: 50%;
  }
  </style>
  