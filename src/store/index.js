import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers:[
      {
        id:'e29674f3-33db-4fbe-9dfa-d3123b0edd9b',
        name: 'John',
        connecionString:'TestDB',
        familyMembers: false,
        document: true
      },
      {
        id:'b1a779f3-92ba-4276-be75-38b9d2661a76',
        name: 'John',
        connecionString:'TestDB2',
        familyMembers: true,
        document: true
      },     
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
