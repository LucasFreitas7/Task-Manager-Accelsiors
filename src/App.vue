<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
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
