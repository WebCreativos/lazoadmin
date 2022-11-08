import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  sociosList: {
    data: [],
    meta: {}
  },
  socio: {
    name: '',
    doc: '',
    address: '',
    direccion_cobranza: '',
    phone: '',
    email: '',
    tipo: '',
    cuota: '',
    user: {},
    mascotas: [{}],
  }
})
export const getters = {
  getField,
  getAll(state) {
    return state.sociosList
  }
}
export const actions = {
  async find({
    commit
  }, id) {
    const {
      data: data
    } = await this.$axios.get(`/socios/${id}`)
    commit('set', data)
  },
  async findAll({
    commit
  }, query = {}) {

    let params = {
      _where: {
        _or: []
      }
    }
    if (query.params.name_contains) {
      params._where._or.push({
        'name_contains': query.name_contains
      })
      params._where._or.push({
        'address_contains': query.name_contains
      })
      params._where._or.push({
        'user.username_contains': query.name_contains
      })
    }

    const {
      data: data
    } = await this.$axios.get('/socios', {
      params: {
        ...params,
        _start: (query.page - 1) * 25,
        _limit: query.page * 25,
        _sort: 'id:desc',
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'indices'
        })
      },
    })
    const {
      data: length
    } = await this.$axios.get('/socios/count', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'indices'
        })
      },

    })
    commit('setList', {data:data,length:length})
  },


  async create({
    state,
    commit
  }) {
    this.$axios.post('/users', state.socio.user).then(response => {
      const user = response.data.id
      this.$axios.post('/socios', {
        ...state.socio,
        user: user
      }).then(response => {
        commit("clear")
      })
    }).catch(error => {
      console.log(error);
    });

    return data
  },
  async update({
    state
  }) {
    const {
      data: data
    } = await this.$axios.put(`/socios/${state.socio.id}`, {
      data: state.socio
    })
    commit('set', data)
  },
  async pay({
    state,
    dispatch
  },params) {
    params.payment_date = params.payment_date.add(params.months, 'months').format('YYYY-MM-DD')
    const {
      data: data
    } = await this.$axios.put(`/socios/${params.id}`, {
      data: params
    })
    dispatch('findAll')
  },
  set({
    commit
  }, data) {
    commit('set', data)
  },


  clear({
    commit
  }) {
    commit('set', {
      name: '',
      doc: '',
      address: '',
      direccion_cobranza: '',
      phone: '',
      email: '',
      tipo: '',
      cuota: '',
      user: {},
      mascotas: [{}],
    })
  }
}
export const mutations = {
  updateField,
  set(state, data) {
    state.socio = data
  },
  setList(state, data) {
    state.sociosList = data
  }

}
