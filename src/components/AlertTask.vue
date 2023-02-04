<template>
<div>
    <v-alert
      v-if="success"
      dense
      text
      type="success"
    >
      {{ message }}
    </v-alert>
    <v-alert
    v-else
    dense
    outlined
    type="error"
  >
    {{ message }}
  </v-alert>
</div>
</template>
  
  <script>
    export default {
      name: 'AlertTask',
      props:{
        message:{
            type: String,
            default: ''
        },
        success:{
            type: Boolean,
            default: false
        }
      }
}
  </script>
