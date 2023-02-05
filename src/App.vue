<template>
  <v-app>
    <v-app-bar
      class=""
      app
      color="#99D9EA"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/accelsiors.png"
          transition="scale-transition"
          width="100"
        />
      </div>


      <v-spacer></v-spacer>

      <v-icon medium color="black">edit_calendar</v-icon>
      <h3>Task Manager</h3>
    </v-app-bar>

    <v-main>
      <TaskManager/>
    </v-main>
  </v-app>
</template>

<script>
import TaskManager from './components/TaskManager';

export default {
  name: 'App',

  components: {
    TaskManager,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

.theme--dark.v-sheet{
  color: black;
}
h3{
  margin-left: 8px;
}

</style>
