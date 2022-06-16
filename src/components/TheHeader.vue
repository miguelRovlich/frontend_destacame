<template>
    <div>
    <v-navigation-drawer absolute temporary app width="150" height="340">
      <v-list class="pt-4">
        <v-list-tile active-class="green--text" to="/">
          <v-list-tile-content>
            <v-list-tile-title>PASAJEROS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/buses">
          <v-list-tile-content>
            <v-list-tile-title>BUSES</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/trayectos">
          <v-list-tile-content>
            <v-list-tile-title>TRAYECTOS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" to="/choferes">
          <v-list-tile-content>
            <v-list-tile-title>CHOFERES</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
        <v-toolbar flat dense color="transparent">
            <v-toolbar-title>
            <span class="font-weight-light">Bus</span>
            <span class="green--text">Tur App</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn text to="/" active-class="green--text headline">Inicio</v-btn>
            <v-btn text to="/pasajeros" active-class="green--text headline">Pasajeros</v-btn>
            <v-btn text to="/buses" active-class="green--text headline">Buses</v-btn>
            <v-btn text to="/trayectos" active-class="green--text headline">Trayectos</v-btn>
            <v-btn text to="/choferes" active-class="green--text headline">Choferes</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>