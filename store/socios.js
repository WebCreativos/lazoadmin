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
      let search = `?_start=${(params.page - 1) * 25}&_limit=${params.page * 25}&_sort=id:desc`;
      if(params.name) {
        search = `${search}&_where[_or][0][name_contains]=${params.name}&_where[_or][1][last_name_contains]=${params.name}&_where[_or][2][address_contains]=${params.name}&_where[_or][3][user.username_contains]=${params.name}`
      }

      const {
        data: data
      } = await this.$axios.get(`/socios` + search)
  
      const {
        data: length
      } = await this.$axios.get('/socios/count'+search);
  
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
  