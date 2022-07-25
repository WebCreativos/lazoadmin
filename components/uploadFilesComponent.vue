<template>
  <v-card>
    <v-card-title class="font-weight-light">
      Subir archivos
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="d-flex justify-center" v-if="!readonly">
        <v-sheet color="indigo lighten-4" width="100%" height="150"
          class="rounded d-flex justify-center align-center dotted-border p-relative" @click="selectPhoto">
          <v-icon size="80" v-show="!showPreview">mdi-file-plus-outline</v-icon>
        </v-sheet>
        <input type="file" multiple style="display:none;" ref="uploadFile" @change="onFileChange" />
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col class="col-md-3 col-12 mt-3" v-for="(file,index) in filesList" :key="`f${index}`">
          <v-card outlined class="rounded-lg">
            <v-card-title>
              <span v-if="file.name">{{file.name}}</span>
              <v-spacer></v-spacer>
              <v-btn fab v-show="!readonly" x-small color="red" @click="deleteImg(file)">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              <v-icon size="80">{{setIconFile(file)}}</v-icon>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="height:55" v-show="file.url">
              <v-btn block depressed :href="file.url" target="_blank" class="rounded-lg" color="success darken-1">
                VER ARCHIVO&nbsp;
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'DragAndDropPhotoCard',
    props: {
      value: Array,
      readonly: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        showPreview: false
      }
    },
    mounted() {},
    methods: {
      selectPhoto(event) {
        this.$refs.uploadFile.click()
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.$emit('input', [...this.value, ...files])
      },
      deleteImg(file) {
        var temporalValue = this.value
        this.$emit('input', temporalValue.filter(f => f !== file))

      },
      setIconFile(file) {

        const checkImageOfPdf = function (file) {
          console.log(file)
          if (file.includes('image')) {
            return 'mdi-image'
          } else {
            return 'mdi-file'
          }
        }
        if (file.mime) {
          return checkImageOfPdf(file.mime)
        } else {
          return checkImageOfPdf(file.type)

        }
      }

    },
    computed: {
      filesList() {
        if (this.value != undefined) {
          return this.value.filter((file) => Object.keys(file).length != 0 || file instanceof File)

        } else {
          return []
        }
      }
    }
  }

</script>

<style scoped>
  .dotted-border {
    border: 1px solid;
    border-style: dotted;
  }

</style>
