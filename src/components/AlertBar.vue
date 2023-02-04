<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
        color="white"
      >
        <EditTask @close-dialog="closeDialog" :taskId="id" />
      </v-dialog>
    </v-row>
  </template>
  
  <script>
  import EditTask from '@/components/EditTask.vue'
    export default {
      name: 'AlertBar',
      components:{
        EditTask,
      },
      watch:{
        showDialog(newValue){
          this.dialog = newValue
        }
      },
      props:{
        id:{
          type: Number,
        },
        showDialog:{
          type: Boolean,
        },
      },
      data () {
      return {
        dialog: this.showDialog,
      }
    },
    methods:{
        closeDialog(){
            this.dialog = false,
            this.$emit('need-close')
        }
    },
    created(){
      console.log('Dialog on Alertbar =',  this.dialog)
    }
    }
  </script>
<style>

.v-dialog{
  background-color: white;
}
</style>
