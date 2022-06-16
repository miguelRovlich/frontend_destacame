<template>
  <v-data-table
    :headers="headers"
    :items="buses"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        color="white"
      >
        <v-btn
          icon
          color="primary"
          @click="filtrar"
          class="mr-4"
        >filtrar</v-btn>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-select
          :items="trayectos"
          v-model="selectedTrayecto"
          item-text="nombre"
          item-value="id"
          label="Trayecto"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
          :items="capacidad"
          v-model="selectedCapacidad"
          label="Capacidad %"
        ></v-select>
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
              Agregar Bus
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
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.chofer"
                      label="Chofer"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.trayecto"
                      label="Trayecto"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                        v-model="editedItem.horario_salida"
                        :items="horarios"
                        label="Hora Salida"
                        outlined
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  
                    <v-select
                        v-model="editedItem.horario_llegada"
                        :items="horarios"
                        label="Hora Llegada"
                        outlined
                    ></v-select>
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
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estas seguro de borrar?</v-card-title>
            <v-icon color="red darken-1" large max-width="500px">
                mdi-delete
            </v-icon>
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
        { text: 'Chofer', value: 'chofer' },
        { text: 'Trayecto', value: 'trayecto' },
        { text: 'Horario salida', value: 'horario_salida' },
        { text: 'horario llegada', value: 'horario_llegada' },
        { text: 'Promedio de pasajeros', value: 'promedio_pasajeros' },
        { text: 'Opciones', value: 'actions', sortable: false },
      ],
      horarios: [
        "07:00:00",
        "07:30:00",
        "08:00:00",
        "08:30:00",
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00",
        "20:00:00",
        "20:30:00",
        "21:00:00",
        "21:30:00",
        "22:00:00",
        "22:30:00",
        "23:00:00",
        "23:30:00",
        ],
        buses: [],
      trayectos: [],
      capacidad: [10,20,30,40,50,60,70,80,90,100],
      editedIndex: -1,
      selectedTrayecto: {id: 0, nombre: 'Seleccione un trayecto'},
      selectedCapacidad: 0,
      editedItem: {
        chofer: '',
        trayecto: '',
        horario_llegada: '',
        horario_salida: '',
      },
      defaultItem: {
        chofer: '',
        trayecto: '',
        horario_llegada: '',
        horario_salida: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Bus' : 'Editar Bus'
      },
    },
    mounted() {
      console.log('mounted')
      axios.get('http://localhost:8000/api/buses/promedios').then(response => {
        let promedios = response.data.buses
        promedios.forEach(promedio => {
          this.trayectos.push({
            id: promedio.id,
            nombre: promedio.trayecto,
          })
        })
      console.log(this.trayectosId)
      console.log(this.trayectos)
      })
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      selectedTrayecto (val) {
        this.editedItem.trayecto = this.trayectos[val].nombre
      },
    },
    created () {
      this.getBuses()
    },
    beforeMount() {
      console.log('beforeMounted');
      this.getBuses();
    },
    methods: {
    getBuses() {
      axios.get('http://localhost:8000/api/buses/promedios').then(response => {
        this.buses = response.data.buses;
      })
      console.log(this.buses)
    },
    editItem (item) {
        this.editedIndex = this.buses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.buses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      filtrar(){
        console.log(this.selectedCapacidad)
        console.log(this.selectedTrayecto)
        axios.get(`http://localhost:8000/api/trayectos/${this.selectedTrayecto}/capacidad/${this.selectedCapacidad}`).then(response => {
          this.buses = response.data.buses;
        }).catch(error => {
          console.log(error)
        })
      },
      deleteItemConfirm () {
        this.buses.splice(this.editedIndex, 1)
        let index = this.editedIndex + 1 
        axios.delete(`http://localhost:8000/api/buses/${index}`).then(response => {
          this.getBuses()
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
          Object.assign(this.buses[this.editedIndex], this.editedItem)
          console.log(this.editedItem)
          axios.put(`http://localhost:8000/api/buses/${this.editedItem.id}`,  {  
            id: this.editedItem.id,
            chofer: this.editedItem.chofer,
            trayecto: this.editedItem.trayecto,
            horario_llegada: this.editedItem.horario_llegada,
            horario_salida: this.editedItem.horario_salida,
          }).then(response => {
            console.log(response.data);
            this.getBuses()
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.post('http://localhost:8000/api/buses/', {  
            chofer: this.editedItem.chofer,
            trayecto: this.editedItem.trayecto,
            horario_llegada: this.editedItem.horario_llegada,
            horario_salida: this.editedItem.horario_salida,
          })
          .then( (response)=> {
            console.log(response)
          })
          .catch((error)=> {
            console.log(error)
          })
          this.close()
          this.buses.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
<style lang="">
    
</style>  