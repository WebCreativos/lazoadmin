<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-xl">
          <v-toolbar class="elevation-0 teal darken-3 font-weight-thin white--text">
            <v-toolbar-title>Mensajes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-3" class="rounded-lg white--text font-weight-light"
              @click="modalMessage = true">
              AGREGAR MENSAJE
            </v-btn>

          </v-toolbar>
          <v-card-title>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="messages" hide-default-footer calculate-widths>
              <template v-slot:item.actions="{ item }">
                  <v-btn color="red" class="rounded-lg white--text font-weight-light">
                    TODOS
                  </v-btn>
                  <v-btn color="success" class="rounded-lg white--text font-weight-light">
                    PERSONAL
                  </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="modalMessage" persistent width="500">
      <v-card>
        <v-toolbar color="teal darken-3" class="elevation-0">
          <v-toolbar-title class="white--text font-weight-light">AGREGAR MENSAJE</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalMessage = false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pt-4">
          <v-form ref="form">
            <v-text-field v-model="message.titulo" outlined dense label="Titulo"></v-text-field>
            <v-textarea v-model="message.contenido" outlined dense label="Mensaje"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="createMessage()" color="success darken-1" depressed>AGREGAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        modalMessage: false,
        message: {},
        messages: [],
        headers: [{
          text: 'Titulo',
          value: 'titulo'
        }, {
          text: 'Contenido',
          value: 'contenido'
        }, {
          text: '',
          value: 'actions',
          align:'right'
        }]
      }
    },
    created() {
      this.getMessages()
    },
    methods: {
      async createMessage() {
        if (!this.$refs.form.validate()) return
        await this.$axios.post('/mensajes', this.message)
        this.getMessages()
        this.modalMessage = false
      },
      getMessages() {
        this.$axios.get('/mensajes').then(response => {
          this.messages = response.data
        })
      }
    }
  }

</script>

<style>

</style>
