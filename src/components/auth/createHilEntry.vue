<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <label for="hils"> Hil number</label>
  
       
        <select name="hils" id="hils" style="width: 400px;  margin-top:10px">
          <option v-for="hilId in hils" :key="hilId" :value="hilId">
            {{ hilId }}
          </option>
        </select>

        <div class="input">
          <label for="hilNumber">Hil Number</label>
          <input type="hilNumber" id="hilNumber" v-model="hilNumber" required />
        </div>
        <div class="input">
          <label for="machinename">Machinename</label>
          <input
            type="machinename"
            id="machinename"
            v-model="machinename"
            required
          />
        </div>
        <div class="input">
          <label for="osversion">OSversion</label>
          <input type="osversion" id="osversion" v-model="osversion" required />
        </div>
        <div class="input">
          <label for="projectname">Projectname</label>
          <input
            type="projectname"
            id="projectname"
            v-model="projectname"
            required
          />
        </div>
        <div class="input">
          <label for="selectedServers">SelectedServers</label>
          <input
            type="selectedServers"
            id="selectedServers"
            v-model="selectedServers"
            required
          />
        </div>
        <div class="input">
          <label for="labcarType">labcarType</label>
          <input
            type="labcarType"
            id="labcarType"
            v-model="labcarType"
            required
          />
        </div>
        <div class="input">
          <label for="autorun">Autorun</label>
          <input
            type="autorun"
            id="autorun"
            v-model="autorun"
            required
            oninvalid="setCustomValidity()"
          />
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
export default {
  data() {
    return {
      machinename: "",
      osversion: "",
      projectname: "",
      selectedServers: "",
      labcarType: "",
      autorun: "",
      hilNumber: "",
      hils: [],
    };
  },
  mounted() {
    console.log("--------getHills");
    axios
      .get("/hils")
      .then((res) => {
        console.log(res);
        this.hils = res.data.map((item) => {
          return item.id;
        });
        console.log(this.hils);
      })
      .catch((error) => console.log(error));
  },

  methods: {
    onSubmit() {
      const formData = {
        hilNumber: this.hilNumber,
        machinename: this.machinename,
        osversion: this.osversion,
        projectname: this.projectname,
        selectedServers: this.selectedServers,
        labcarType: this.labcarType,
        autorun: this.autorun,
      };
      console.log(formData);
      this.$store.dispatch("createHilEntry", {
        hilNumber: formData.hilNumber,
        machinename: formData.machinename,
        osversion: formData.osversion,
        projectname: formData.projectname,
        selectedServers: formData.selectedServers,
        labcarType: formData.labcarType,
        autorun: formData.autorun,
      });
    },
  },
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>