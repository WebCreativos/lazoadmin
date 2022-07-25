import moment from 'moment'
export const state = () => ({
  atention: {
    files: [],
    socio: {
      mascotas: []
    },
    mascota: {},
    productos: [],
    proximas: []
  },
  atentionList: {
    data: [],
    length: 0
  }
})

export const getters = {
  getList(state) {
    return state.atentionList
  },
  get(state) {
    return state.atention
  }
}



export const actions = {
  async findAll({
    commit
  }, params) {
    commit('cleanAtentionList')
    var search = {
      _start: (params.page - 1) * 10,
      _limit: (params.page) * 10,
      ...params
    }

    delete search['page']
    const {
      data: data
    } = await this.$axios.get(`/atencion`, {
      params: search
    })

    const {
      data: length
    } = await this.$axios.get('/atencion/count', {
      params: search
    });

    commit('setAtentionList', {
      data,
      length
    })
  },

  async create({dispatch, commit, state }) {
    await this.$axios.post('/atencion', state.atention).then(async response => {
      if (state.atention.proxima_consulta) {
        dispatch('addToAgenda')
      }
      await dispatch('updateMascota')

      let uploadFiles = state.atention.files.filter((file) => file instanceof File)

      dispatch('uploadFile',{id:response.data.id, files:uploadFiles})
    }).catch(error => {
      console.log(error);
    });

  },

  update({dispatch, commit, state }) {
    this.$axios.put('/atencion/' + state.atention.id, state.atention).then(async response => {
      let uploadFiles = state.atention.files.filter((file) => file instanceof File)
      dispatch('uploadFile',{id:response.data.id, files:uploadFiles})
    }).catch(error => {
      console.log(error);
    });
  },


  async uploadFile({state},uploadFile) {
    if (uploadFile.files.length == 0) return

    let data = new FormData()
    data.append('ref', 'atencion')
    data.append('refId', uploadFile.id)
    data.append('field', 'files')
    for (let file in uploadFile.files) {
      if (uploadFile.files[file] instanceof File) {
        data.append('files', uploadFile.files[file], uploadFile.files[file].name)
      }
    }
    this.$axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  },

  addToAgenda({state}) {
    if (state.atention.hora_proxima_consulta)
    var agenda = {
      type: 'consulta',
      consulta: {
        socio: state.atention.socio,
        tipo_consulta: 'Consulta'
      },
      fecha: state.atention.fecha_proxima_consulta,
      hora:moment(state.atention.hora_proxima_consulta,'HH:mm').format('HH:mm:ss.SSS') ,
      titulo: 'Nueva consulta para ' + state.atention.mascota.nombre,
      detalles: state.atention.proxima_consulta,
      referencias: state.atention.proxima_referencia
    }

    this.$axios.post('/agendas', agenda).then(data => {
      //clone atencion 
      let proximaAtencion = {
        socio: state.atention.socio,
        mascota: state.atention.mascota,
        fecha: agenda.fecha,
        hora: agenda.hora,
        detalles: agenda.detalles,
        referencias: agenda.referencias,
      }
      this.$axios.post('/atencion', proximaAtencion)
    })

  },
  updateMascota({state}) {
    this.$axios.put('/mascotas/' + state.atention.mascota.id, state.atention.mascota).then(response => {}).catch(
      error => {
        console.log(error);
      });
  },


  async cleanAll({
    commit
  }) {
    commit('cleanAtentionList')
  },
  async cleanSingle({
    commit
  }) {
    commit('cleanSingle')
  },
  async cleanSelected({
    commit
  }) {
    commit('cleanSelected')
  },



  
  async setSocio({
    commit
  }, params) {
    commit('setSocio', params)
  },
  async setMascota({
    commit
  }, params) {
    commit('setMascota', params)
},
async setSingle({
  commit
}, params) {
  commit('setSingle', params)
}

}



//private methods
export const mutations = {
  async setAtentionList(state, data) {
    state.atentionList = data
  },
  async cleanAtentionList(state) {
    state.atentionList = {
      data: [],
      length: 0
    }
  },

  setSingle(state, atention) {
    console.log(atention.hora,'hora')
    state.atention = atention
    state.atention.hora = moment(atention.hora,'HH:mm').format('HH:mm:ss.SSS')
  },

  async cleanSingle(state) {
    state.atention = {
      files: [],
      socio: {
        mascotas: []
      },
      mascota: {},
      productos: [],
      proximas: []

    }
  },
  async cleanSelected(state) {
    state.atention = {
      files: [],
      socio: state.atention.socio,
      mascota: state.atention.mascota,
      productos: [],
      proximas: []

    }
  },


  setSocio(state, socio) {
    state.atention.socio = socio
  },
  setMascota(state, mascota) {
    state.atention.mascota = mascota
  }

}
