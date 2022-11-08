<template>
  <div>
    <v-btn-toggle class="my-3 rounded-lg elevation-1" dense background-color="secondary" color="primary">
      <v-btn color="transparent" class="font-weight-bold" @click="openModalPayment()">
        VALIDAR&nbsp;<v-icon color="green">ion-md-cash</v-icon>
      </v-btn>
      <v-btn class="font-weight-bold" :to="`/socios/editar/${item.id}`" color="transparent">
        EDITAR&nbsp;<v-icon color="black">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="actionDelete(item.id)">
        <v-icon color="red">ion-ios-trash</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-dialog v-model="modalPaymentServices">
      <generalCardComponent width="600">
        <v-toolbar color="gd-primary-to-right font-weight-light" elevation="0">
          <v-toolbar-title class="white--text">Pagar servicios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalPaymentServices = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="ma-2">
          <formsFieldsTextComponent dense label="Cantidad de meses" hide-details type="number"
            v-model="data.months"></formsFieldsTextComponent>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gd-primary-to-right" class="font-weight-light white--text rounded-lg"
            @click="openAlertPayment = true">Pagar servicios</v-btn>
        </v-card-actions>
      </generalCardComponent>
    </v-dialog>
    <modalSuccess :action="payServices" color="red" v-model="openAlertPayment">
      <template v-slot:icon>
        mdi-alert
      </template>
      <template v-slot:title>
        Esta seguro que va a acreditar <b class="red--text">{{data.months}}</b> cuotas?
      </template>
      <template v-slot:buttonCancel>
        <v-btn rounded class="white--text" color="red" @click="openAlertPayment = false">Cancelar</v-btn>
      </template>
    </modalSuccess>

  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        modalPaymentServices: false,
        data: {
          client: {},
          months: 0
        },
        openAlertPayment: false
      }
    },
    methods: {
      openModalPayment() {
        this.modalPaymentServices = true;
        this.data.client = this.item;
      },
      payServices() {
        var params = {
            id: this.data.client.id,
            months: this.data.months,
            payment_date:moment(this.data.client.payment_date || new Date())
        }
          this.$store.dispatch('socios/pay', params)
      },
      actionDelete(id) {
        this.$store.dispatch('socios/delete', id)
      }
    }
  }

</script>

<style>

</style>
