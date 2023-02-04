<template>
  <v-container>
    <NewTask/>
    <TaskList @edit="fetchEditTask"/>
    <AlertBar  @need-close="changeEdit()" :showDialog="isToEdit" :id="editId"/>
  </v-container>
</template>

<script>
import NewTask  from '@/components/NewTask.vue'
import TaskList from '@/components/TasksList.vue'
import AlertBar from '@/components/AlertBar.vue'
  export default {
    name: 'TaskManager',
    data () {
      return {
        isToEdit: false,
        editId: null
      }
    },
    components:{
      NewTask,
      TaskList,
      AlertBar
    },
    methods:{
      fetchEditTask(value){
        this.isToEdit = true
        console.log('ITS to edit = ', this.isToEdit)
        this.editId = value
      },
      changeEdit(){
        console.log('Chegou aqui')
        this.isToEdit = false
        console.log('ITS to edit = ', this.isToEdit)
      }
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

</style>
