<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="130">
        <v-toolbar flat>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn> 
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="$refs.calendar" class="font-weight-light">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-toolbar flat>
          <v-select solo v-model="type" dense hide-details class="font-weight-light" label="Tipo de calendario"
            :items="[{value:'month',text:'Mensual'},{value:'day',text:'Diario'}]"></v-select>
        </v-toolbar>

      </v-sheet>
      <v-sheet height="600">
        <v-calendar locale="es" ref="calendar" :events="value" v-model="focus" color="teal darken-3"
          :event-color="getEventColor" :type="type" @click:event="showEvent" :value="now" @click:more="viewDay"
          @click:date="viewDay"></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar class="elevation-0" :color="selectedEvent.color" dark>
              <v-toolbar-title class="font-weight-light" v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="selectedEditable = !selectedEditable">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-text-field outlined label="Titulo" :readonly="!selectedEditable" background-color="white"
                v-model="selectedEvent.data.titulo"></v-text-field>
              <v-textarea outlined label="Detalles" :readonly="!selectedEditable" background-color="white"
                :filled="!selectedEditable" v-model="selectedEvent.data.detalles"></v-textarea>
              <v-text-field type="fecha" outlined label="Fecha" :readonly="!selectedEditable" background-color="white"
                :filled="!selectedEditable" v-model="selectedEvent.data.fecha"></v-text-field>
              <v-text-field type="hora" outlined label="hora" :readonly="!selectedEditable" background-color="white"
                :filled="!selectedEditable" v-model="selectedEvent.data.hora"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn outlined color="red" class="font-weight-light rounded-lg" @click="selectedOpen = false">
                Cerrar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-3" class="white--text font-weight-light rounded-lg"
                v-if="selectedEditable" @click="selectedOpen = false">
                Guardar&nbsp;<v-icon>mdi-content-save</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
  import moment from 'moment';
  export default {
    props: {
      value: Array,
      getColorCalendar: Function
    },
    data: () => ({
      now: null,
      focus: '',
      selectedEvent: {
        data: {},
        editable: false
      },
      changedMonths:0,
      type: 'month',
      selectedEditable: false,
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted() {
      this.now = moment().format('YYYY-MM-DD');
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay({
        date
      }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor(event) {
        return event.color
      },
      setToday() {
        this.focus = ''
      },
      prev() {
        this.$refs.calendar.prev()
        this.changedMonths--
        let date = moment(this.now).add(this.changedMonths,'months').endOf('month').format('YYYY-MM-DD')
        this.$emit('prev', date)
      },
      next() {
        this.$refs.calendar.next()
        this.changedMonths++
        let date = moment(this.now).add(this.changedMonths,'months').endOf('month').format('YYYY-MM-DD')
        console.log(date)
        this.$emit('next', date)
      },
      showEvent({
        nativeEvent,
        event
      }) {
        console.log(nativeEvent.target, event)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
    },
  }

</script>

<style>
</style>
