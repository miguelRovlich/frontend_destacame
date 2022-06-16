<template>
  <v-layout column justify-center align-center class="mt-4 pt-2">
    <VueCompareImage
      class="hidden-md-and-down"
      hover
      :style="{ minWidth: '800px', maxWidth: '1200px', minHeight: '800px', maxHeight: '1500px' }"
      :sliderLineWidth="sliderLine"
      :handleSize="hSize"
      :leftImage="leftImage"
      :rightImage="rightImage"
      :sliderPositionPercentage="sliderPosition"
    />
    <VueCompareImage
      class="hidden-lg-and-up"
      hover
      :style="{ maxWidth: '400px' }"
      :sliderLineWidth="sliderLine"
      :handleSize="hSize"
      :leftImage="leftImage2"
      :rightImage="rightImage2"
      :sliderPositionPercentage="sliderPosition"
    />

    <br>

    <vue-typer class="headline" :repeat="0" text="Bus Tur, primera en retrasos" />
    <vue-typer
      :text="text1"
      :repeat="Infinity"
      :shuffle="false"
      initial-action="erasing"
      :pre-type-delay="70"
      :type-delay="70"
      :pre-erase-delay="1980"
      :erase-delay="100"
      erase-style="select-back"
      :erase-on-complete="false"
      caret-animation="smooth"
    />
    <br>
    <v-flex xs12 sm6 md4 lg4 xl4>
      <v-card flat color="transparent" max-width="520">
        <v-card-title primary-title>
          <div>
            <!-- espacio -->
            <br>
            <div>
              <h3>Hola! Encantado de conocerte.</h3>
              <p>
                Somos una empresa que se encarga de transportar pasajeros de una ciudad a otra hace mas de
                <span
                  class="green--text font-weight-bold"
                >70 años </span>
              </p>
              <p>
                Si buscas llegar tarde, que cancelen el bus en el que vas sin previo aviso y que no te compensen en lo absoluto entonces deberias viajar con nosotros.
              </p>
            </div>
          </div>
        </v-card-title>

        <v-card-actions class="hidden-sm-and-down justify-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            fab
            dark
            outlined
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-actions class="hidden-md-and-up justify-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            small
            fab
            dark
            outlined
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { VueTyper } from "vue-typer";
import VueCompareImage from "vue-compare-image";

export default {
  components: {
    "vue-typer": VueTyper,
    VueCompareImage
  },
  data() {
    return {
      icons: [
        { href: "https://github.com/miguelRovlich", icon: "fab fa-github" },
        {
          href: "https://www.linkedin.com/in/bustur",
          icon: "fab fa-linkedin-in"
        },
        {
          href: "https://www.facebook.com/bustur",
          icon: "fab fa-facebook-f"
        },
        { href: "https://www.instagram.com/bustur", icon: "fab fa-instagram" }
      ],
      text1: ["Perdidas de equipaje","Buses cancelados sin previo aviso","Retrasos injustificados","Buses sin cargador USB"],
      leftImage: require("../assets/descarga (1).jpg"),
      rightImage: require("../assets/descarga (2).jpg"),
      leftImage2: require("../assets/descarga (1).jpg"),
      rightImage2: require("../assets/descarga (2).jpg"),
      sliderLine: 1,
      hSize: 12,
      sliderPosition: 2.5
    };
  }
};
</script>
<!--<style>-->
<!--.vue-typer {-->
  <!--font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;-->
<!--}-->
<!--.vue-typer .custom.char.typed {-->
  <!--color: green;-->
<!--}-->
<!--.vue-typer .custom.char.selected {-->
  <!--color: #e91e63;-->
<!--}-->

<!--.vue-typer .custom.caret.typing {-->
  <!--background-color: green;-->
<!--}-->
<!--.vue-typer .custom.caret.selecting {-->
  <!--display: inline-block;-->
  <!--background-color: #e91e63;-->
<!--}-->
<!--</style>-->
<style lang="scss">
.vue-typer {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  .custom.char.typed {
    color: green;
  }
  .custom.char.selected {
    color: #e91e63;
  }
  .custom.caret.typing {
    background-color: green;
  }
  .custom.caret.selecting {
    display: inline-block;
    background-color: #e91e63;
  }
}
</style>

