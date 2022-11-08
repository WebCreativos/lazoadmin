<template>
  <v-dialog v-model="value" persistent>
    <generalCardComponent width="800">
      <GeneralCardTitleComponent class="white--text">
        {{title}}
        <template  v-slot:button>
          <v-btn icon @click="$emit('input', false)">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </template>
      </GeneralCardTitleComponent>
      <v-card-text class="pa-3">
        <formsFieldsTextComponent solo dense label="color" v-model="data.nombre">
        </formsFieldsTextComponent>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="white--text rounded-lg black--text" color="secondary" @click="add()">
          AGREGAR
        </v-btn>
      </v-card-actions>
    </generalCardComponent>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        data: {
          nombre: ""
        },
      }
    },
    methods: {
      add() {
        this.$emit('add', this.data)
      }
    }
  }

</script>

<style>

</style>
