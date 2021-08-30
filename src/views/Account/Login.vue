<template>
  <v-card>
      <v-card elevation="2" class="my-16">
            <v-card-title>Register Member</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- FIRST NAME & LAST NAME -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="member.firstName"
                      :rules="nameRules"
                      :counter="10"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="member.lastName"
                      :rules="nameRules"
                      :counter="10"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
          
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>