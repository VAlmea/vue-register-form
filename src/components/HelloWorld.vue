<template>
  <v-parallax height="100%" :src="wallpapper">
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card elevation="2">
            <v-card-title>Register Member</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="member.firstName"
                  :counter="10"
                  :rules="nameRules"
                  label="First Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="member.lastName"
                  :counter="10"
                  :rules="nameRules"
                  label="Last Name"
                  required
                ></v-text-field>

                <div>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="member.dob"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="member.dob"
                      :active-picker.sync="activePicker"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="saveDate"
                    ></v-date-picker>
                  </v-menu>
                </div>

                <v-radio-group label="Gender" v-model="member.gender">
                  <v-radio label="Male" value="M"></v-radio>
                  <v-radio label="Female" value="F"></v-radio>
                </v-radio-group>

                <v-text-field
                  v-model="member.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  v-model="member.userPhoto"
                ></v-file-input>
                <v-card>
                  <v-card-subtitle>
                    Put your sing here
                  </v-card-subtitle>
                  <v-card-text>
                    <VueSignaturePad
                      id="signature"
                      width="100%"
                      height="350px"
                      ref="signaturePad"
                      :options="options"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="clear">Clear</v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="SaveForm"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  data: () => ({
    options: {
      penColor: "",
    },
    member: {
      gender: "M",
      firstName: "",
      lastName: "",
      dob: null,
      signature: null,
      email: "",
      userPhoto:""
    },
    valid: true,
    activePicker: "YEAR",
    menu: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    wallpapper() {
      var number = Math.floor(Math.random() * 10 + 1);
      return require("@/assets/wallpappers/" + number + ".jpg");
    },
  },
  methods: {
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      this.$refs.form.validate();
    },
    clear() {
      this.$refs.member.signaturePad.clearSignature();
    },
    SaveForm() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.member.signature = data;
      console.log(isEmpty);
      console.log(data);
      console.log(this.member.userPhoto);
    },
  },
};
</script>
<style></style>
