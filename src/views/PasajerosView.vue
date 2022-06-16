<template>
  <v-data-table
    :headers="headers"
    :items="pasajeros"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>CRUD Pasajeros</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              color="primary"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar pasajero
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.apellido"
                      label="Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                    
                        v-model="editedItem.bus"
                        :items="buses"
                        label="Bus"
                        outlined
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                        v-model="editedItem.asiento"
                        :items="asientos"
                        label="Asiento"
                        outlined
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="save"
              >
                guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estas seguro de borrar?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">Borrar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        
        color="blue darken-1"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
      color="red darken-1"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Recargar
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido', value: 'apellido' },
        { text: 'Bus', value: 'bus' },
        { text: 'Asiento', value: 'asiento' },
        { text: 'Opciones', value: 'actions', sortable: false },
      ],
      pasajeros: [],
      buses: [1],
      horarios: [],
      asientos: [1,2,3,4,5,6,7,8,9,10],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        apellido: '',
        bus: 0,
        asiento: 0,
      },
      defaultItem: {
        nombre: '',
        apellido: '',
        bus: 0,
        asiento: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Pasajero' : 'Editar Pasajero'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.getPasajeros()
    },
    beforeMount() {
      console.log('beforeMounted');
      this.getPasajeros();
    },

    methods: {
      

    getBusOptions() {
      axios.get('/api/buses')
      .then(response => {
        // crear 2 listas, una con los id de los buses y otra con los nombres de los buses
        this.buses = response.data
        this.buses.forEach(bus => {
          this.buses.push(bus.id)
        })

      })
      .catch(error => {
        console.log(error)
      });
    },
    getPasajeros() {
      axios.get('http://localhost:8000/api/pasajeros/').then(response => {
        this.pasajeros = response.data;
      });
      console.log(this.pasajeros);
    },

      editItem (item) {
        this.editedIndex = this.pasajeros.indexOf(item)
        console.log(this.editedIndex);
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem.id);
          this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.pasajeros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedIndex);
        console.log(item);
        
      },

      deleteItemConfirm () {
        this.pasajeros.splice(this.editedIndex, 1)
        let index = this.editedIndex + 1 
        axios.delete(`http://localhost:8000/api/pasajeros/${index}`).then(response => {
          this.getPasajeros()
          console.log(response);
        }).catch(error => {
          console.log(error)
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.pasajeros[this.editedIndex], this.editedItem)
          axios.put(`http://localhost:8000/api/pasajeros/${this.editedItem.id}`, {  
            nombre: this.editedItem.nombre,
            apellido: this.editedItem.apellido,
            bus: this.editedItem.bus,
            asiento: this.editedItem.asiento,
          }).then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.post('http://localhost:8000/api/pasajeros/', {  
            nombre: this.editedItem.nombre,
            apellido: this.editedItem.apellido,
            bus: this.editedItem.bus,
            asiento: this.editedItem.asiento,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.close()
          this.pasajeros.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
<style lang="">
    
</style>