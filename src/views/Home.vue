<template>
  <register-form :customer="customer" />
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "Home",
  props: ["id"],
  components: {
    RegisterForm,
  },
  data: () => ({
    customer: null,
  }),
  created() {
    this.customer = this.$store.state.customers.find((c) => c.id == this.id);
  },
};
</script>
