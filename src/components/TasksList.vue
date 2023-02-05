<template>
    <v-container>
      <v-tabs>
          <v-tab @click="handleClickOnFilter('all')">All tasks</v-tab>
          <v-tab @click="handleClickOnFilter('completed')">Done tasks</v-tab>
          <v-tab @click="handleClickOnFilter('active')">Undone Tasks</v-tab>
      </v-tabs>
      <div class="warning-text">
          <p class="text-task" v-if="activeClass === 'completed' && this.allFiltered.length === 0"> You dont have completed tasks</p>
          <p class="text-task" v-if="activeClass === 'all' && this.allFiltered.length === 0"> You dont have any tasks</p>
          <p class="text-task" v-if="activeClass === 'active' && this.allFiltered.length === 0"> You have already completed all your tasks</p>
      </div>
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="(task,i) in allFiltered"
          :key="i"
        >
          <v-expansion-panel-header>{{ task.activty}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="panel-icons">
              <v-icon>schedule</v-icon> = {{durationFormat(task.duration) }}
            </div>
            <div v-if="task.comment != ''" class="panel-icons">
              <v-icon>comment</v-icon> = {{ task.comment }}
            </div>
            <div class="panel-icons">
              <v-icon>calendar_month</v-icon> = {{ task.date }}
            </div>
            <div class="panel-buttons">
              <div>
                <v-btn
                    v-if="task.done === false"
                    class="ma-2"
                    color="success"
                    @click="toogleFetch(task)"
                >
                  Done Task
                </v-btn>
                <v-btn
                    v-else
                    class="ma-2"
                    color="error"
                    @click="toogleFetch(task)"
                  >
                  Undone Task
                </v-btn>
              </div>
              <div v-if="activeClass === 'all'">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="cyan"
                  @click="emitTaskEdit(i)"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
              </v-btn>
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  @click="deleteTask(task)"
                  small
                  color="red"
                >
                  <v-icon dark>
                    delete
                  </v-icon>
              </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="button-delete-done">
        <v-btn
        v-if="activeClass === 'completed' && this.allFiltered.length > 0"
        @click="clearDone"
        tile
        color="error"
      >
        <v-icon left>
          delete
        </v-icon>
        Delete all done tasks
      </v-btn>
      </div>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
    export default {
      name: 'TaskList',
      data: () => ({
        activeClass: 'all',
        allFiltered: []
        }),
      computed:{
        ...mapGetters(['getAll', 'undoneAll', 'doneAll'])
      },
      watch:{
        getAll(newValue){
        this.allFiltered = newValue
        },
        doneAll(newValue, oldValue){
          if(newValue.length < oldValue.length && this.activeClass === 'completed'){
            this.allFiltered = newValue
          }
        },
        undoneAll(newValue, oldValue){
          if(newValue.length < oldValue.length && this.activeClass === 'active'){
            this.allFiltered = newValue
          }
        }
      },
      methods:{
        ...mapActions(['toggleChange', 'deleteTask', 'clearDone']),
        handleClickOnFilter(filter){
            this.activeClass = filter;
            switch (filter) {
            case 'all':
                this.allFiltered = this.getAll;
                break;
            case 'completed':
                this.allFiltered = this.doneAll;
                break;
            case 'active':
                this.allFiltered = this.undoneAll;
                break;
            default:
                break;
        }
      },
      emitTaskEdit(id){
            this.$emit('edit', id)

        },
        toogleFetch(task){
          this.toggleChange(task)
        },
        durationFormat(duration){
          if(duration == 1){
            return '1 hour'
          }
          else if(duration == 0.5){
            return '30 minutes'
          }
          else{
            return duration + 'hours'
          }
        },
      },
      created(){
        this.allFiltered = this.getAll
      }
    }
  </script>
  
  <style>
  .filter-activity{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px;
  }
  
  .activity-text{
    padding-right: 10px;
  }
  
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  }
  
  .panel-icons{
    padding-top: 10px;
  }
  
  .panel-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .warning-text{
    display: flex;
    justify-content: center;
  }

  .text-task{
    margin-top: 50px;
  }

  .button-delete-done{
    margin-top: 10px;
  }
  .v-slide-group__prev{
    display: none;
    margin-left: -40px;
  }
  .v-tab{
    font-size: 0.7rem !important;
    max-width: 150px !important
  }
  </style>
  