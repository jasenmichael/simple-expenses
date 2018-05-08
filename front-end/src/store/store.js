import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  simpleExpenses: {
    id: '',
    user_name: '',
    categories: [ 'Office Expenses', 'Business Property', 'Repairs and Maintenance', 'Supplies', 'Taxes and Licenses', 'Travel', 'Deductible meals', 'Utilities' ],
    businesses: ['Deli Cafe', 'Ready Builder', 'Bay Area Ren Faire', 'Michigan Ren Faire'],
    receipts: [],
    receiptQueue: [],
    edit: null
  },
  loadLocalData () {
    this.simpleExpenses = JSON.parse(localStorage.getItem('simple_expenses')) || this.simpleExpenses
  },
  saveLocalData () {
    localStorage.setItem('simple_expenses', JSON.stringify(this.simpleExpenses))
    var local = localStorage.getItem('simple_expenses')
    var store = JSON.stringify(this.simpleExpenses)
    if (local === store) {
      console.log('you are in sync')
      console.log('=======')
    }
  },
  createPdf (receipts) {
    let bizPage = []
    let pdfList = []
    this.simpleExpenses.businesses.forEach((business) => {
      bizPage = {
        business: business,
        categories: {

        }   // push each catPage to bizPage
      }
      receipts.forEach((receipt) => {
        if (bizPage.categories[receipt.category]) {
          // add receipt
          bizPage.categories[receipt.category].push(receipt)
        } else {
          //
          bizPage.categories[receipt.category] = [receipt]
        }
        // if (business === receipt.business) {
        //   catPage = {
        //     category: {
        //       name: receipt.category,
        //       receipts: []
        //     }
        //   }
        //   this.simpleExpenses.categories.forEach((category) => {
        //     // category push
        //     if (category === receipt.category) {
        //       catPage.category.receipts.push(receipt)
        //     }
        //   })
        //   bizPage.categories.push(catPage)
      })
      pdfList.push(bizPage)
    })
    console.log(pdfList)
  },
  mounted () {}
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state
})
