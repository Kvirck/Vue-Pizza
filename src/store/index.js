import { createStore } from 'vuex';

export default createStore({
  state: {
    pizzas: [],
    category: null,
    sortBy: {
      id: 0,
      name: 'rating',
    },
    cartItems: new Map([]),
  },
  getters: {
    getTotalCount: (state) => {
      let tottalCount = 0;
      state.cartItems.forEach((pizza) => (tottalCount += pizza.count));
      console.log(`state.cartItems`,state.cartItems);
      return tottalCount;
    },
    getTotalPrice(state) {
      let totalPrice = 0;
      state.cartItems.forEach((pizza) => {
        const pizzaPrice = pizza.price * pizza.count;
        totalPrice += pizzaPrice;
      });
      return totalPrice;
    },
  },
  mutations: {
    GET_PIZZA(state, pizzas) {
      state.pizzas = pizzas;
    },
    SET_CATEGORY(state, categoryIndex) {
      state.category = categoryIndex;
    },
    SET_SORT(state, sortItem) {
      switch (sortItem.sortBy) {
        case 'rating': {
          state.pizzas.sort((a, b) => a.rating - b.rating);
          state.sortBy = { name: sortItem.sortBy, id: sortItem.id };
          break;
        }
        case 'price': {
          state.pizzas.sort((a, b) => a.price - b.price);
          state.sortBy = { name: sortItem.sortBy, id: sortItem.id };
          break;
        }
        case 'title': {
          state.pizzas.sort((a, b) => a.title - b.title);
          state.sortBy = { name: sortItem.sortBy, id: sortItem.id };
          break;
        }
      }
    },
    ADD_PIZZA_TO_CART(state, pizza) {
      const isAllReadyExists = state.cartItems.get(pizza.id);
      if (isAllReadyExists) {
        state.cartItems.set(pizza.id, { ...pizza, count: isAllReadyExists.count + 1 });
      }
      if (!isAllReadyExists) {
        state.cartItems.set(pizza.id, { ...pizza, count: 1 });
      }
    },
  },
  actions: {
    async getPizzaAction({ commit }) {
      const response = await fetch('http://localhost:3000/pizzas');
      const jsonPizzas = await response.json();
      commit('GET_PIZZA', jsonPizzas);
    },
    async getFilteredPizza({ commit }, categoryIndex) {
      const response = await fetch(`http://localhost:3000/pizzas?category=${categoryIndex}`);
      const jsonPizzas = await response.json();
      commit('SET_CATEGORY', categoryIndex);
      commit('GET_PIZZA', jsonPizzas);
    },
  },
  modules: {},
});
