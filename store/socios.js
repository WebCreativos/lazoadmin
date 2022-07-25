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
      commit('cleanSociosList')
      var search = {
        _sort:'fecha_afiliacion:DESC',
        _start: (params.page - 1) * 25,
        _limit: (params.page) * 25,
        ...params
      }
  
      delete search['page']
      const {
        data: data
      } = await this.$axios.get(`/socios`, {
        params: search
      })
  
      const {
        data: length
      } = await this.$axios.get('/socios/count', {
        params: search
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
  