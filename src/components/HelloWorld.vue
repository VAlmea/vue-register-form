<template>
  <v-parallax height="100%"  :src="wallpaper">
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card elevation="2">
            <v-card-title>Register Form</v-card-title>
            <v-card-text
              ><v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
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
                        v-model="date"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      :active-picker.sync="activePicker"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="saveDate"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-radio-group label="Gender" v-model="gender">
                  <v-radio label="Male" value="M"></v-radio>
                  <v-radio label="Female" value="F"></v-radio>
                </v-radio-group>
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
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

                <v-checkbox
                  v-model="checkbox"
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>

                <v-btn color="warning" @click="resetValidation">
                  Reset Validation
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
    wallpaper:"",
    gender: "M",
    valid: true,
    name: "",
    activePicker: "YEAR",
    signature: null,
    date: null,
    menu: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  created(){
    var number = Math.floor((Math.random() * 11) + 1);
    this.wallpaper = "../assests/wallpappers/"+number+".jpg";
  },
  methods: {
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.signature = data;
      console.log(isEmpty);
      console.log(data);
    },
  },
};
</script>
<style></style>
