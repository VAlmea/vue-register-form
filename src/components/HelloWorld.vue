<template>
  <v-parallax height="100%" :src="wallpapper">
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card elevation="2">
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
                <!-- END -->

                <v-row>
                  <!-- DATE OF BIRTH -->
                  <v-col cols="12" md="6">
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
                  </v-col>
                  <!-- END -->

                  <!-- EMAIL -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="member.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <!-- END -->
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <!-- PHONE -->
                    <vue-tel-input-vuetify
                      :preferred-countries="['id', 'gb', 'ua', 'us']"
                      :valid-characters-only="false"
                      select-label="Code"
                      label="Phone Number"
                      @input="onInput"
                      :rules="phoneRules"
                    ></vue-tel-input-vuetify>
                    <!-- END -->
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <!-- GENDER -->
                    <v-radio-group label="Gender" v-model="member.gender">
                      <v-radio label="Male" value="M"></v-radio>
                      <v-radio label="Female" value="F"></v-radio>
                    </v-radio-group>
                    <!-- END -->
                  </v-col>
                </v-row>

                <v-row>
                  <!-- PHOTO -->
                  <v-col cols="12" md="6">
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Photo"
                      v-model="member.userPhoto"
                    ></v-file-input>
                  </v-col>
                  <!-- END -->

                  <v-col cols="12" md="6">
                    <v-file-input
                      accept="pdf"
                      placeholder="Select an document"
                      label="Document"
                      v-model="member.docuemnt"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- SIGNATURE -->
                  <v-col cols="12" md="12">
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
                    </v-card></v-col
                  >
                  <!-- END -->
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="2">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="SaveForm"
                    >
                      Submit
                    </v-btn>
                  </v-col></v-row
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
export default {
  components: {
    VueTelInputVuetify,
  },
  data: () => ({
    options: {
      penColor: "",
    },
    phone: {
      number: "",
      valid: false,
      country: undefined,
    },
    member: {
      gender: "M",
      firstName: "",
      lastName: "",
      dob: null,
      signature: null,
      email: "",
      userPhoto: null,
      phoneNumber: null,
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
    phoneRules: [(v) => !!v || "Phone Number is required"],
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
      this.$refs.signaturePad.clearSignature();
    },
    onInput(formattedNumber, { number, valid, country }) {
      this.member.phoneNnumber = number.international;
      console.log(valid);
      this.phone.valid = valid;
      this.phone.country = country && country.name;
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
