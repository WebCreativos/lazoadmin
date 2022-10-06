export const state = () => ({
  page: 1,
  sociosList: {
    data: [],
    length: 0
  }
})

export const getters = {
  getList(state) {
    return state.sociosList
  }
}



export const actions = {
  async findAll({
    commit
  }, params) {
    console.log(params)
    commit('cleanSociosList')

    params._start = (params.page - 1) * 25
    params._limit=params.page * 25
    delete params.page

    const {
      data: data
    } = await this.$axios.get(`/socios`, {
      params: params
    })

    const {
      data: length
    } = await this.$axios.get('/socios/count', {
      params: params
    });

    commit('setSociosList', {
      data,
      length
    })
  },

  async cleanAll({
    commit
  }) {
    commit('cleanSociosList')
  }

}



//private methods
export const mutations = {
  async setSociosList(state, data) {
    state.sociosList = data
  },
  async cleanSociosList(state) {
    state.sociosList = {
      data: [],
      length: 0
    }
  }

}
